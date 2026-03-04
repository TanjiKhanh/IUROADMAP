"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROLE_HIERARCHY = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["MENTOR"] = "MENTOR";
})(UserRole || (exports.UserRole = UserRole = {}));
exports.ROLE_HIERARCHY = {
    [UserRole.ADMIN]: 3,
    [UserRole.MENTOR]: 2,
};
//# sourceMappingURL=roles.enum.js.map