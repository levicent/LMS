import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";

interface JwtPayloadWithId extends JwtPayload {
  id: string;
  role: string;
}

const authMiddleware = (req: Request, res: Response, next: any) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as JwtPayloadWithId;
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
export default authMiddleware;
