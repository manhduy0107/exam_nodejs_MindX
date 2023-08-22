import { resClientData, verifyToken } from "../utils";

const middlewares = {
  verifyToken: (req, res, next) => {
    try {
        const token = req.headers=authorization.split(" ")[1];
        const verify = verifyToken(token);
        req.user = {
            verify,
            ...token
        };
        next();
    } catch (error) {
      resClientData(res, 403, null);
    }
  },
};
export default middlewares
