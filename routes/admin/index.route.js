// nhúng các router ở đây vào 1 file duy nhất để dễ dàng quản lý
const systemConfig = require("../../config/system")
const dashboardRoutes = require('./dashboard.route')
const productRoutes = require('./product.route')

module.exports = (app) => {
    // lấy đường dẫn admin từ file config
    const PATH_ADMIN = systemConfig.prefixAdmin;
    // admin/dashboard
    app.use(PATH_ADMIN + "/dashboard", dashboardRoutes)
    // admin/products
    app.use(PATH_ADMIN + "/products", productRoutes)
}
