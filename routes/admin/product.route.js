// Import express và multer để xử lý upload file
const express = require('express');
const multer = require('multer');
// khởi tạo router
const router = express.Router();
// cấu hình multer để lựa chọn nơi lưu trữ file
const storageMulter = require('../../helpers/storageMulter');
// khởi tạo biến upload để sử dụng multer với cách cấu hình ở trên
const upload = multer({ storage: storageMulter() });

const controller = require('../../controllers/admin/product.controller')
const validate = require('../../validates/admin/product.validate')
router.get("/", controller.index)

router.patch("/change-status/:status/:id", controller.changeStatus)

router.patch("/change-multi", controller.changeMulti)

router.delete("/delete/:id", controller.deleteItem)

router.get("/create", controller.create)

router.post("/create", upload.single("thumbnail"), validate.createPost, controller.createPost)

router.get("/edit/:id", controller.edit)

router.patch("/edit/:id", upload.single("thumbnail"), validate.editPatch, controller.editPatch)

router.get("/detail/:id", controller.detail)

module.exports = router;