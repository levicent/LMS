import { Request, Response, NextFunction } from "express";

const checkRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role.toLowerCase(); // Convert to lowercase if needed

    if (
      !userRole ||
      !roles.map((role) => role.toLowerCase()).includes(userRole)
    ) {
      return res
        .status(403)
        .json({ message: "You are not authorized to access this resource" });
    }
    next();
  };
};

export default checkRole;
