import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { connectToDb } from "./db.js";
import Inventory from "./Models/Inventory.js";
import { genToken, resClientData, verifyToken} from "./utils/index.js";
import Users from "./Models/Users.js";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);
mongoose
  .connect("mongodb://127.0.0.1:27017/test_web69")
  .then((rs) => {
    console.log("Kết nối mongo thành công");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res, next) => {
  res.send({ message: "test_mindX69" });
});

// #region get product have low quantity
app.get("/inventory/low-quantity", async (req, res, next) => {
  {
    try {
      const getInventory = await Inventory.find({});
      const ProductsLowQuantity = getInventory.filter(
        (item) => item.instock < 100
      );
      resClientData(res, 201, ProductsLowQuantity);
    } catch (error) {
      if (error.code === 11000) {
        resClientData(res, 403, null, "hàng đã đã tồn tại");
      } else {
        resClientData(res, 403, null, error.message);
      }
    }
  }
});
// #end region get product have low quantity

// #region get product
app.get("/inventory", async (req, res, next) => {
  {
    try {
      const getInventory = await Inventory.find({});
      resClientData(res, 201, getInventory);
    } catch (error) {
      if (error.code === 11000) {
        resClientData(res, 403, null, "hàng đã đã tồn tại");
      } else {
        resClientData(res, 403, null, error.message);
      }
    }
  }
});
// #end region get product

// #region create
app.post("/inventory/create", async (req, res, next) => {
  {
    try {
      const { sku, description, instock } = req.body;
      const createdInventory = await Inventory.create({
        sku,
        description,
        instock,
      });
      resClientData(res, 201, createdInventory);
    } catch (error) {
      if (error.code === 11000) {
        resClientData(res, 403, null, "hàng đã đã tồn tại");
      } else {
        resClientData(res, 403, null, error.message);
      }
    }
  }
});

app.post("/orders/create", async (req, res, next) => {
  {
    try {
      const { item, almonds, quantity } = req.body;
      const createOder = await Inventory.create({
        item,
        almonds,
        quantity,
      });
      resClientData(res, 201, createOder);
    } catch (error) {
      if (error.code === 11000) {
        resClientData(res, 403, null, "vật phẩm đã tồn tại");
      } else {
        resClientData(res, 403, null, error.message);
      }
    }
  }
});

// #End region create

// #region Login
app.post("/users/signup", async (req, res, next) => {
  {
    try {
      const { userName, password } = req.body;
      const newUser = {
        userName,
        password,
      };
      const createdUser = await Users.create(newUser);
      resClientData(res, 201, createdUser, "Đăng ký thành công!");
    } catch (error) {
      resClientData(res, 403, null, error.message);
    }
  }
});

app.post("/users/signin", async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const user = await Users.findOne(
      {
        userName,
        password,
      },
      {
        password: 0,
      }
    );
    if (!user) throw new Error("Sai tài khoản hoặc mật khẩu!");
    const token = genToken({
      userId: user._id,
      role: user.role,
    });
    resClientData(
      res,
      201,
      {
        accessToken: token,
      },
      "Đăng nhập thành công!"
    );
  } catch (error) {
    resClientData(res, 403, null, error.message);
  }
});
// #end Login

// # admin role to watch all users
app.get(
  "/alluser",
  (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const verify = verifyToken(token);
      req.user = {
          ...verify,
          token
      };
      next();
  } catch (error) {
      resClientData(res, 403, error.message);
  }
  },
  async (req, res, next) => {
    try {
      const { userId, token } = req.user;
      const allUsers = await Users.find({})
      const user = await Users.findById(userId, {
        password: 0
      })
      if (user.role === 'ADMIN') {
        res.send({
          allUsers,
          accessToken: token,
        });
      } else {
        res.status(403).send({
          message: "Từ chối quyền truy cập",
        });
      }
      
    } catch (error) {
      resClientData(res, 403, null, error.message);
    }
  }
);
// #end region role

app.listen(3003, () => {
  console.log("App is running at 3003");
  connectToDb();
});
