const mongoose = require('mongoose')

const ordersSchema = mongoose.Schema({
    userName: String,
    userEmail: String,
    userId: String,
    status: String,
    products: Array,
    totalAmount: Number,
    totalQty:Number,
    shipping:Number,
    mode: String,
    time: { type: Date, default:Date.now },
});

const Orders= mongoose.model('Orders', ordersSchema);

module.exports= Orders;