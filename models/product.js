const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowerCase: true,/* in case the person types Fruits because enum mein small f hai  */
        enum: ['fruit', 'vegetable', 'dairy']
    }
});
const Product = mongoose.model('Product', productSchema)
module.exports = Product  