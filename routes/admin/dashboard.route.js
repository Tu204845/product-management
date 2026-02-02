// đầu tiên là import express và khởi tạo router
const express = require('express');
const router = express.Router();
// tạo ra 1 biến controller để import địa chỉ controller dashboard
// địa chỉ này được lưu ở router nơi chứa địa chỉ của trang web có nhiệm vụ điều hướng
const controller = require('../../controllers/admin/dashboard.controller')
// truy cập vào trang dashbord thông qua phương thức get

router.get("/", controller.dashboard)
// xuất router này ra ngoài để sử dụng ở các file khác
module.exports = router;