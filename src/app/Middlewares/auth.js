import jwt from "jsonwebtoken";
import { promisify } from "util";
import authConfig from "../../config/auth";

export default async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ erro: "Token is not provided." });
    }

    //Bearer eyJhbGci0iJIuzI1NiIsInR5cCI6IKpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTc2NTI1Nz
    const [, token] = authHeader.split(" ");

    //TRY CATH - É o "if" dos erros
    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);
        req.userId = decoded.id;

        return next();
    } catch (error) {
        return res.status(401).json({ erro: "Token invalid." });
    }
};
