const mongoose = require('mongoose');
const Product=require('./models/product')
mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
.then(()=>{
console.log("Mongo connection open!!!");
})
.catch((err)=>{
    console.log("Mongo Connection error!!!",err);
})
// const p= new Product({
//     name:"grapeFruit",
//     price:2.44,
//     category:'fruits'
// })
// p.save().then(p=>{
//     console.log(p)
// })
// .catch(e=>{
//     console.log(e)
// })
const seedProducts=[
    {name:'Egg Plant',
        price:1.5,
        category:'vegetable'
    },
    {name:'Melon',
        price:9.5,
        category:'fruit'
    },
    {name:'Mango',
        price:92.5,
        category:'fruit'
    },
    {name:'Chocolate-Milk',
        price:23.5,
        category:'dairy'
    },
    {name:'Celery',
        price:21,
        category:'vegetable'
    }
    
]
Product.insertMany(seedProducts)
.then(res=>{
    console.log(res)
})
.catch(err=>{
    console.log(err)
})