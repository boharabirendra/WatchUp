import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

export const registerUserBodyParser = upload.fields([
  { name: "profile", maxCount: 1 },
  { name: "email", maxCount: 1 },
  { name: "fullName", maxCount: 1 },
  { name: "password", maxCount: 1 },
]);

export const loginUserBodyParser = upload.fields([
  {name: "email", maxCount: 1},
  {name: "password", maxCount: 1}
])

export const updateUserBodyParser = upload.fields([
  {name: "email", maxCount: 1},
  {name: "fullName", maxCount: 1}
])

export const changePasswordBodyParser = upload.fields([
  {name: "id", maxCount: 1},
  {name: "oldPassword", maxCount: 1},
  {name: "newPassword", maxCount: 1}
])

