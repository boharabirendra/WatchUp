import { Router } from "express";
import * as UserController from "../controllers/users.controller";
import { changePasswordBodyParser, loginUserBodyParser, registerUserBodyParser, updateUserBodyParser, upload } from "../middlewares/multer.middleware";
import { validateReqBody } from "../middlewares/validator.middleware";
import { changePasswordBodySchema, loginBodySchema, registerUserBodySchema, updateBodySchema } from "../schema/user.schema";
import { authenticate } from "../middlewares/auth.middleware";
const router = Router();

router
  .route("/register")
  .post(
    registerUserBodyParser,
    validateReqBody(registerUserBodySchema),
    UserController.registerUser
  );

router.route("/login").post(
    loginUserBodyParser,
    validateReqBody(loginBodySchema),
    UserController.loginUser
)

router.route("/update-user").put(
    authenticate,
    updateUserBodyParser,
    validateReqBody(updateBodySchema),
    UserController.updateUser
)

router.route("/change-password").put(
    authenticate,
    changePasswordBodyParser,
    validateReqBody(changePasswordBodySchema),
    UserController.changePassword
)

router.route("/update-profile").put(
    authenticate,
    upload.single("profile"),
    UserController.updateUserProfile
)

export default router;
