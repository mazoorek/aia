const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const app = express();

const ShopItem = require('./models/shopItem')

mongoose.connect('mongodb://localhost:27017/shoeShop', {useNewUrlParser: true})
    .then(() => console.log('connected to database'))
    .catch(() => console.log('connection failed'));

app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/api/shopping-list', (req, res, next) => {
    ShopItem.find()
        .lean()
        .then(shopItems => {
            const shoppingList = shopItems.map(each => {
                const shopItem = {...each, id: each._id};
                delete shopItem['_id']
                return shopItem;
            })
            return res.status(200).json(shoppingList);
        });
});

app.put('/api/complete-basket', (req, res, next) => {
    const userBasket = req.body;
    ShopItem.find({_id: {$in: userBasket.map(basketItem => basketItem.id)}}).lean().then(shopItems => {
        let canCompleteShopping = true;
        shopItems.forEach(shopItem => {
            let correspondingBasketItem = undefined;
            for(const basketItem of userBasket) {
                if(basketItem.id === String(shopItem._id)) {
                    correspondingBasketItem = basketItem
                }
            }
            if (shopItem.amount < correspondingBasketItem.amount) {
                canCompleteShopping = false;
            } else {
                shopItem.amount = shopItem.amount - correspondingBasketItem.amount
            }
        })
        if (canCompleteShopping) {
            const updateOrDeleteItems = async _ => {
                for (const shopItem of shopItems) {
                    if (shopItem.amount > 0) {
                        await ShopItem.updateOne({_id: shopItem._id}, {$set: {amount: shopItem.amount}});
                    } else {
                        await ShopItem.deleteOne({_id: shopItem._id})
                    }
                }
            }
            updateOrDeleteItems().then(() => {
                return res.status(200).json({message: 'Zakup produktów został zrealizowany'})
            });
        } else {
            return res.status(200).json({message: 'Zabrakło produktów by zrealizować koszyk'});
        }
    })
});

app.listen(3000);
