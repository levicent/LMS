"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkRole = (roles) => {
    return (req, res, next) => {
        var _a;
        const userRole = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role.toLowerCase(); // Convert to lowercase if needed
        if (!userRole ||
            !roles.map((role) => role.toLowerCase()).includes(userRole)) {
            return res
                .status(403)
                .json({ message: "You are not authorized to access this resource" });
        }
        next();
    };
};
exports.default = checkRole;
