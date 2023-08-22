import jwt from 'jsonwebtoken';

const resClientData = (res, status, data, message) => {
  res.status(status).send({
      data: data ? data : null,
      message: data ? (
          message ? (message) : 'Thành công!'
      ) : (
          message ? message : 'Thất bại!'
      ),
      success: data ? true : false
  });
}

const KEY = "1239jjasd%23@";
const genToken = (data) => {
  const token = jwt.sign(data, KEY, {
    expiresIn: 2500,
  });
  return token;
};

const verifyToken = (token) => {
  const decoded = jwt.verify(token, KEY);
  return decoded;
};
export { resClientData, genToken, verifyToken };
