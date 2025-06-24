import User from "../models/User";
import jwt from "jsonwebtoken";

class SessionsController {
    async create(req, rs) {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email },
        });

        if (!User) {
            return res.status(401).json({ error: "User not found" });
        }

        if (!(await user.checkPassword(password))) {
            return res.status(401).json({ error: "password not match." });
        }

        const { id, name } = user;
        return res.json({
            user: {
                id,
                name,
                email,
            },
            token: jwt.sign({ id }, "8aefc877c3272f429bd0a42c20f1ab6f", {
                expiresIn: "7d",
            }),
        });
    }
}

export default new SessionsController();
