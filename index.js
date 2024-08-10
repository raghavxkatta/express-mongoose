/* index.js=Main express application */
/* models-product.js= Mongoose schema and model   */
/* seeds.js= database seeding script */
/* views-products-
index.ejs=Template for displaying all products
show.ejs=Template for displaying a single product */

/* Product- Mongoose model representing the products collection in MongoDB= represents the structure of the model and allows the user to interact with the database */
/* products-Variable holding an array of all product documents (e.g., used in the /products route). */
/* product-Variable representing a single product document (e.g., used in the /products/:id route). */

const express = require('express');
const app= express();
const path=  require('path')
const Product=require('./models/product')/*basically Product is productSchema AND WOULD HELP YOU TO DO CRUD DOCUMENTS FROM THE PRODUCT COLLECTION*/
const mongoose = require('mongoose');
const methodOverride= require('method-override')/* Need to require this so that we are able to update items with put or patch request even though we are using forms */
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
app.use(methodOverride('_method'))

const categories=['vegetable','fruit','dairy','baked goods']
app.get('/products',async(req,res)=>{/* remember products is being used for the url */  
    const products= await Product.find({})/* products acts as an array which stores all the products */   /* you could have also used then&catch as this returns a promise */
    console.log(products)
    res.render('products/index.ejs',{products})
})
app.get('/products/new',(req,res)=>{/* since we don't have to do anything asynchronus here that's why we don't add async and await */
res.render('products/new',{categories})/* .get is when the express checks if that particular url has a .get route and then runs it's code. res.render is to create a webpage using a template */
})
// Route to display a single product
app.get('/products/:id',async(req,res)=>{/* we could have taken name as part of the url but because some names can be same and that can be problematic, we don't take it*/
const {id}= req.params/* req.params is used when you want to extract something from the url basically {destructuring the ID from the request parameter} */
const foundProduct = await Product.findById(id)
console.log(foundProduct)
res.render('products/show', {product:foundProduct})/* you need to pass the array that you will use in the particular file */

}) 
// Route to display the form for editing an existing product
app.post('/products',async(req,res)=>{/* well in this case we don't have access to req.body, I mean we do but it's just undefined, there's nothing there it needs to be parsed */
const newProduct = new Product(req.body)/* the data that we submit in the "new " route, when we click submit it is going to create a new product using that data */
await newProduct.save()
console.log(newProduct) 
    res.redirect(`/products/${newProduct._id}`)/* this will redirect to the page which will have the data of the new product we just entered */
})
// Route to update an existing product
app.get('/products/:id/edit',async(req,res)=>{
    const {id}=req.params
    const product=await Product.findById(id)
res.render('products/edit',{product,categories})
})
app.put('/products/:id/edit',async(req,res)=>{/* PUT AND PATCH REQUESTS ARE USED TO UPDATE EXISTING DATA */
    const{id}=req.params/* THE PROBLEM IS THAT WE CAN'T ACTUALLY MAKE A PUT OR A PATCH REQUEST FROM A FORM, THE REASON WHY WE USED methodOverride */
    const product=await Product.findByIdAndUpdate(id,req.body,{runValidators: true,new:true})/* runValidators because mongoose methods forgoes the validators */
     // Alternate way to do the above: 
   
    res.redirect(`/products/${product._id}`)/* we could have just referenced id but that would have broke the code because there is a await in the former line and therefore we have added product._id so that it awaits until product is found and then redirects */
})

app.listen(3000,()  =>{
    console.log("APP IS LISTENING ON PORT 3000!")
})
