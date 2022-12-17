const { Router } = require("express");

const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  isValidRole,
  emailExist,
  userByIdExist,
} = require("../helpers/db-validators");

const {
  usersGet,
  usersPut,
  usersPost,
  usersPatch,
  usersDelete,
} = require("../controllers/users");

const router = Router();

router.get("/", usersGet);

//POST
//check("role", "Is not a valid role").isIn(["ADMIN_ROLE", "USER_ROLE"]),

router.post(
  "/",
  [
    check("name", "The name is required").not().isEmpty(),
    check(
      "password",
      "The password is required and most be at least 6 characters"
    ).isLength({ min: 6 }),
    check("email", "Is not a valid e-mail").isEmail(),
    check("email").custom(emailExist),
    check("role").custom(isValidRole),
    validarCampos,
  ],
  usersPost
);

//PUT

router.put(
  "/:id",
  [
    check("id", "Is not a valid id").isMongoId(),
    check("id").custom(userByIdExist),
    check("role").custom(isValidRole),
    validarCampos,
  ],
  usersPut
);

//PATCH

router.patch("/", usersPatch);

//DELETE

router.delete("/:id",[
  check("id", "Is not a valid id").isMongoId(),
  check("id").custom(userByIdExist),
  validarCampos,
], usersDelete);

module.exports = router;
