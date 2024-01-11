const express = require("express");
const {
  all_category,
  add_category,
  edit_category,
  delete_category,
  findbyid_category,
} = require("./_contorller");
let { hasRole, isloggedIn } = require("../../shared/auth");
let isMongoId = require("../../shared/validator/isMongoId");

let router = express.Router();

let AllCategryM = [isloggedIn, hasRole(["user", "admin", "super_admin"])];
let CreateCategoryM = [isloggedIn, hasRole(["admin", "super_admin"])];
let EditCategoryM = [isloggedIn, isMongoId, hasRole(["admin", "super_admin"])];
let DeleteCategoryM = [
  isloggedIn,
  isMongoId,
  hasRole(["admin", "super_admin"]),
];
let FIndByIdCategoryM = [
  isMongoId,
  isloggedIn,
  hasRole(["admin", "user", "super_admin"]),
];

router.get("/category", AllCategryM, all_category);
router.get("/category/:id", FIndByIdCategoryM, findbyid_category);
router.post("/category", CreateCategoryM, add_category);
router.put("/category/:id", EditCategoryM, edit_category);
router.delete("/category/:id", DeleteCategoryM, delete_category);

module.exports = router;
