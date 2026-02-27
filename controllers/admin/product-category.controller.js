const ProductCategory = require('../../models/product-category.model')
const systemConfig = require('../../config/system')
const createTreeHelper = require('../../helpers/createTree')

module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    };



    const records = await ProductCategory.find(find)

    const newRecord = createTreeHelper.tree(records)


    res.render("admin/pages/products-category/index", {
        pageTitle: "Danh mục sản phẩm",
        records: newRecord
    })

}

module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    };

    const records = await ProductCategory.find(find)
    const newRecord = createTreeHelper.tree(records)

    res.render("admin/pages/products-category/create", {
        pageTitle: "Tạo danh mục sản phẩm",
        records: newRecord
    })

}

module.exports.createPost = async (req, res) => {
    // const permissions = res.locals.role.permissions;

    // if (permissions.includes("products-category_create")) {
    //     console.log("Có quyền")
    // } else {
    //     res.send("403");
    //     return;
    // }

    if (req.body.position == "") {
        const count = await ProductCategory.count();
        req.body.position = count + 1;
    }
    else {
        req.body.position = parseInt(req.body.position);
    }

    const records = new ProductCategory(req.body);
    await records.save();

    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
}

module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await ProductCategory.findOne({
            _id: id,
            deleted: false
        })

        const records = await ProductCategory.find({
            deleted: false
        })

        const newRecord = createTreeHelper.tree(records)

        res.render("admin/pages/products-category/edit", {
            pageTitle: "Chỉnh sửa danh mục sản phẩm",
            data: data,
            records: newRecord
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products-category`)
    }

}

module.exports.editPatch = async (req, res) => {
    const id = req.params.id;

    req.body.position = parseInt(req.body.position);

    await ProductCategory.updateOne({ _id: id }, req.body)

    res.redirect("back");
}

// module.exports.changeStatus = async (req, res) => {
//     const status = req.params.status;
//     const id = req.params.id;

//     const newStatus = status === "active" ? "inactive" : "active";

//     await ProductCategory.updateOne(
//         { _id: id },
//         { status: newStatus }
//     );

//     req.flash("success", "Cập nhật trạng thái thành công");

//     res.redirect("back");
// };