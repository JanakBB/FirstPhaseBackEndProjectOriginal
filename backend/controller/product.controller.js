import asyncHandler from "../middleware/asynchandler.middleware.js";
import Product from "../models/product.model.js";
import ApiError from "../utils/apiError.js";

// @desc get all products
// @route /api/v1/products
// @access public
const getProducts = asyncHandler(async(req, res) => {
    let products = await Product.find({});
    res.send(products);
});

// @desc get product by id
// @route /api/v1/product/:id
// @access public
const getProductById = asyncHandler(async(req, res) => {
    let id = req.params.id;
    let product = await Product.findById(id);
    if(!product) {
        throw new ApiError(404, "Product not found!");
    }
    res.send(product);
});

// @desc add new product
// @route /api/v1/products
// @access public
const addProduct = asyncHandler(async(req, res) => {
    let product = await Product.create({...req.body, user: req.user._id});
    res.send({message: "Product added successfully!", product});
});

// @desc update product
// @route /api/v1/products/:id
// @access private/admin
const updateProduct = asyncHandler(async(req, res) => {
    let id = req.params.id;
    let product = await Product.findById(id);
    if(!product) throw new ApiError(404, "Product not found!");
    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.image = req.body.image || product.image;
    product.brand = req.body.brand || product.brand;
    product.category = req.body.category || product.category;
    product.price = req.body.price || product.price;
    product.countInStock = req.body.countInStock || product.countInStock;

    let updatedProduct = await product.save();
    res.send({
        message: "Product updated successfully!",
        product: updatedProduct
    })
});

// @desc delete product
// @route /api/v1/products/:id
// @access private/admin
const deleteProduct = asyncHandler(async(req, res) => {
    let id = req.params.id;
    let product = await Product.findById(id);
    if(!product) throw new ApiError(404, "Product not found!");
    await Product.findByIdAndDelete(id);
    res.send({message: "Product deleted successfully!"});
});

const addUserReview = asyncHandler(async(req, res) => {
    let id = req.params.id;
    let {rating, comment} = req.body;
    let product = await Product.findById(id);
    if(!product) throw new ApiError(404, "Product not found!");

    const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());
    if(alreadyReviewed) throw new ApiError(400, "Already reviewed!")

    product.reviews.push({
        name: req.user.name,
        user: req.user.id,
        rating,
        comment
    });

    product.numReviews = product.reviews.length;
    let totalRating = product.reviews.reduce((acc, r) => acc + r.rating, 0);
    product.rating = totalRating / product.numReviews;
    await product.save();
    res.send({message: "Review added to product"});
})

export {getProducts, getProductById, addProduct, updateProduct, deleteProduct, addUserReview} ;


