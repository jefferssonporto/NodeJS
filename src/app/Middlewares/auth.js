import { next } from "sucrase/dist/types/parser/tokenizer";

export default (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader === "1234") {
        return next();
    }

    return res
        .status(401)
        .json({ error: "Use not allowed to access this API." });
};
