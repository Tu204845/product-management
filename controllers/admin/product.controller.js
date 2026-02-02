const Product = require('../../models/product.model')

const systemConfig = require('../../config/system')

const filterStatusHelper = require("../../helpers/filterStatus")
// [GET] /admin/products

const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination")
module.exports.index = async (req, res) => {
    // console.log(req.query.status);
    const objectSearch = searchHelper(req.query);

    const filterStatus = filterStatusHelper(req.query);
    let find = {
        deleted: false
    };

    if (objectSearch.regex) {
        find.title = objectSearch.regex;
    }


    if (req.query.status) {
        find.status = req.query.status;
    }

    // const objectSearch = searchHelper(req.query);
    const countProducts = await Product.countDocuments(find)
    let objectPagination = await paginationHelper({
        currentPage: 1,
        limitItem: 4
    },
        req.query,
        countProducts
    );


    const products = await Product.find(find)
        .sort({ position: "desc" })
        .limit(objectPagination.limitItem)
        .skip(objectPagination.skip)


    // console.log(products);
    res.render("admin/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    })

}

module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    await Product.updateOne({ _id: id }, { status: status });

    req.flash("success", "Cập nhật trạng thái thành công");

    res.redirect('/admin/products');
}

module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids;

    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: 'active' });
            req.flash("success", `Cập nhật trạng thái thành công ${ids.length} sản phẩm!`);
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { status: 'inactive' });
            req.flash("success", `Cập nhật trạng thái thành công ${ids.length} sản phẩm!`);

            break;
        case "delete-all":
            await Product.updateMany({ _id: { $in: ids } }, {
                deleted: true,
                deletedAt: new Date()
            });
            req.flash("success", `Đã xóa thành công ${ids.length} sản phẩm!`);

            break;
        case "change-postion":
            for (const item of ids) {
                let [id, postion] = item.split("-");
                postion = parseInt(postion);

                await Product.updateOne({ _id: id }, {
                    position: position
                });
            }
            req.flash("success", `Đã đổi vị trí thành công ${ids.length} sản phẩm!`);
            break;
        default:
            break;
            console.log(type, ids);
            res.send('ok');
    };
    res.redirect('/admin/products');
}

module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;

    await Product.updateOne({ _id: id }, {
        deleted: true,
        deletedAt: new Date()
    });
    req.flash("success", `Đã xóa thành công sản phẩm!`);

    res.redirect('/admin/products');
}

module.exports.create = async (req, res) => {

    res.render("admin/pages/products/create", {
        pageTitle: "Tạo mới sản phẩm",
    })

}

module.exports.createPost = async (req, res) => {

    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);

    if (req.body.position == "") {
        const countProducts = await Product.countDocuments({ deleted: false });
        req.body.position = countProducts + 1;
    }
    else {
        req.body.position = parseInt(req.body.position);
    }

    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`

    }

    const product = new Product(req.body);
    await product.save();

    res.redirect(`${systemConfig.prefixAdmin}/products`);
};

module.exports.edit = async (req, res) => {

    try {
        const find = {
            deleted: false,
            _id: req.params.id
        }

        const product = await Product.findOne(find);


        res.render("admin/pages/products/edit.pug", {
            pageTitle: "Chỉnh sửa sản phẩm",
            product: product
        })
    }
    catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
}

module.exports.editPatch = async (req, res) => {
    const id = req.params.id;

    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);

    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`
    }

    try {
        await Product.updateOne({ _id: id }, req.body);
        req.flash("success", "Cập nhật sản phẩm thành công");
    } catch (error) {
        req.flash("error", "Cập nhật sản phẩm thất bại");

    }

    res.redirect(`back`);
}

module.exports.detail = async (req, res) => {

    try {
        const find = {
            deleted: false,
            _id: req.params.id
        }

        const product = await Product.findOne(find);


        res.render("admin/pages/products/detail", {
            pageTitle: product.title,
            product: product
        })
    }
    catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
}