import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    orderItems: [{
        name: {type: String, required: true},
        image: {type: String, required: true},
        qty: {type: Number, required: true},
        price: {type: Number, required: true},
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Product"
        }
    }],
    shippingAddress: {
        recipient: {type: String, required: true},
        phone: {type: String, required: true},
        address: {type: String, required: true},
        city: {type: String, required: true}
    },
    itemPrice: {
        type: Number,
        required: true
    },
    shippingCharge: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    deliveredAt: {
        type: Date
    }, 
    status: {
        type: String,
        default: "pending",
        enum: ["in progress", "on hold", "shipped", "cancelled", "delivered", "pending"]
    }
}, {timestamps: true});

const Order = mongoose.model("Order", orderSchema);

export default Order;