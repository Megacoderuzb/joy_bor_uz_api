const express = require("express");
const {
  all_users,
  add_users,
  update_user,
  register_user,
  login_user,
  update_all_users,
  find_my,
  findby_id,
  delete_user_me,
  delete_users_id,
} = require("./_controller");
const { isloggedIn, hasRole } = require("../../shared/auth/index");
const { RegisterUsers } = require("./register-users");
const { CONFIRM } = require("./confirm");
const { LOGIN } = require("./login-users");
const { ChangeNumber } = require("./change-number");

const router = express.Router();

let AllUsersM = [isloggedIn, hasRole(["admin", "super_admin"])];
let UpdateUserM = [isloggedIn, hasRole(["user"])];
let AddUserM = [isloggedIn, hasRole(["admin", "super_admin"])];
let UpdateAllUsersM = [isloggedIn, hasRole(["admin", "super_admin"])];
let FindMyM = [isloggedIn, hasRole(["user"])];
let FindByIdM = [isloggedIn, hasRole(["admin", "super_admin"])];
let DeleteUsersMeM = [isloggedIn, hasRole(["user"])];
let DeleteUsersIdM = [isloggedIn, hasRole(["admin", "super_admin"])];

router.get("/users", AllUsersM, all_users);
router.get("/users/me", FindMyM, find_my);
router.get("/users/:id", FindByIdM, findby_id);
router.post("/users", AddUserM, add_users);
router.put("/users/me", UpdateUserM, update_user);
router.put("/users/:id", UpdateAllUsersM, update_all_users);
router.post("/users/register", RegisterUsers);
router.post("/users/confirm", CONFIRM);
router.post("/users/login", LOGIN);
router.post("/users/changenumber", ChangeNumber);
router.delete("/users/me", DeleteUsersMeM, delete_user_me);
router.delete("/users/:id", DeleteUsersIdM, delete_users_id);

module.exports = router;
