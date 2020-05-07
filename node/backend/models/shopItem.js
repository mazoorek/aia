const mongoose = require('mongoose');

const shopItemSchema = mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    amount: Number
}, {collection: 'shoppingList'});

module.exports = mongoose.model('ShopItem', shopItemSchema);
