/* index.js=Main express application */
/* models-product.js= Mongoose schema and model   */
/* seeds.js= database seeding script */
/* views-products-
index.ejs=Template for displaying all products
show.ejs=Template for displaying a single product */

const express = require('express');
const app= express();
const path=  require('path')
const Product=require('./models/product')/*basically Product is productSchema AND WOULD HELP YOU TO DO CRUD DOCUMENTS FROM THE PRODUCT COLLECTION*/
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
.then(()=>{
console.log("Mongo connection open!!!");
})
.catch((err)=>{
    console.log("Mongo Connection error!!!",err);
})

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))

app.get('/products',async(req,res)=>{/* remember products is being used for the url */  
    const products= await Product.find({})/* products acts as an array which stores all the products */   /* you could have also used then&catch as this returns a promise */
    console.log(products)
    res.render('products/index.ejs',{products})
})
app.get('/products/new',(req,res)=>{/* since we don't have to do anything asynchronus here that's why we don't add async and await */
res.render('products/new')/* .get is when the express checks if that particular url has a .get route and then runs it's code. res.render is to create a webpage using a template */
})
/* to find a product we have created this, you can find any product using their id */
app.get('/products/:id',async(req,res)=>{/* we could have taken name as part of the url but because some names can be same and that can be problematic, we don't take it*/
const {id}= req.params/* req.params is used when you want to extract something from the url basically {destructuring the ID from the request parameter} */
const foundProduct = await Product.findById(id)
console.log(foundProduct)
res.render('products/show', {product:foundProduct})/* you need to pass the array that you will use in the particular file */

}) 
app.post('/products',async(req,res)=>{/* well in this case we don't have access to req.body, I mean we do but it's just undefined, there's nothing there it needs to be parsed */
const newProduct = new Product(req.body)/* the data that we submit in the "new " route, when we click submit it is going to create a new product using that data */
await newProduct.save()
console.log(newProduct) 
    res.redirect(`/products/${newProduct._id}`)/* this will redirect to the page which will have the data of the new product we just entered */
})
app.listen(3000,()  =>{
    console.log("APP IS LISTENING ON PORT 3000!")
})
