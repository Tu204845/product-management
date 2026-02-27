const systemConfig = require('../../config/system')


module.exports.loginPost = (req, res, next) => {
    if (!req.body.email) {
        req.flash("error", "Vui lòng nhập email");
        return res.redirect(`${systemConfig.prefixAdmin}/auth/login`);

    }
    if (!req.body.password) {
        req.flash("error", "Vui lòng nhập email");
        return res.redirect(`${systemConfig.prefixAdmin}/auth/login`);

    }



    next();
}



