const express = require('express')
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product')
const methodOverride = require('method-override')

mongoose.connect('mongodb://localhost:27017/farmstand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO ERROR!!!!")
        console.log(err)
    })


app.set('views',path.join(__dirname,'views') )
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


const categories = ['fruit','vegetable','dairy','waifu']



app.get('/products', async (req, res) => {
    const {category} = req.query;
    if (category) {
        const products = await Product.find({ category })
        res.render('products/index', { products,category });
    } else {
        const products = await Product.find({})
        res.render('products/index', { products, category: 'All' });
    }



}
)
app.get('/products/new', (req, res) => {
    res.render('products/new',{categories})
}
)

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
    
}
)

app.get('/products/:id', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    console.log(product);
    res.render('products/show', { product });
}


)

app.get('/products/:id/edit', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product,categories });
}
)

app.put('/products/:id', async (req, res) => {
    const {id} = req.params;
    const product = await Product
    .findById
    (id);
    const {name, price, category} = req.body;
    product.name = name;
    product.price = price;
    product.category = category;
    await product.save();
    res.redirect(`/products/${product._id}`);
}
)

app.delete('/products/:id', async (req, res) => {
    const {id} = req.params;
    const deletedProduct = await
    Product
    .findByIdAndDelete(id);
    res.redirect('/products');
}
)








// app.get('/cats', (req, res) => {
//     const cats = ['Blue', 'Rocket', 'Monty', 'Stephanie', 'Winston']
//     res.render('cats', { cats });
// }
// )

// app.get('/dogs', (req, res) => {
//     res.send("WOOF?")
// }
// )


app.listen(3000, () => {
    console.log('Listening on port 3000')
}
)


// app.get('/r/:subreddit', (req, res) => {
//     const { subreddit } = req.params;
//     res.render('subreddit', { subreddit });
// }
// )
