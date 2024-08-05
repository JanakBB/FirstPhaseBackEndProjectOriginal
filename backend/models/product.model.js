import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    name: String,
    comment: String,
    rating: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
})

const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    image: String,
    description: String,
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    countInStock: {
        type: Number,
        required: true
    },
    rating: Number,
    numReviews: Number,
    reviews: [reviewSchema]
},
{timestamps: true}
);

const Product = mongoose.model("Product", productSchema);

export default Product;
