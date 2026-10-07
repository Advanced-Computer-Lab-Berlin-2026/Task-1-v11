const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const productRoutes = require('./routes/product.route.js');
const eventRoutes = require('./routes/event.route.js');
const dotenv = require('dotenv');

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//routes
app.use('/api/products', productRoutes)
app.use('/api/events', eventRoutes)



app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})

app.get('/', (req, res) => {
  res.send('Hello from node tut')
})




// app.get('/api/products', async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   }
//   catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// })



// app.get('/api/products/:id', async (req, res) => {
//   try {
//     const {id} = req.params;
//     const product = await Product.findById(id);
//     if (!product) {
//       return res.status(404).json({ error: 'Product not found' });
//     }
//     res.json(product);
//   }
//   catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }

// })


// app.post('/api/products',async (req, res) => {
//   try {
//     const product = await Product.create(req.body);
//     res.status(201).json(product);
//   }
//   catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   } 
// })



// update

// app.put('/api/products/:id', async (req, res) => {
//   try {
//     const {id} = req.params;
//     const product = await Product.findByIdAndUpdate(id, req.body)
//     if (!product) {
//       return res.status(404).json({ error: 'Product not found' });
//     }

//     res.json(product);
//   }
// catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }})



  //delete

  // app.delete('/api/products/:id', async (req, res) => {
  //   try {
  //     const {id} = req.params;
  //     const product = await Product.findByIdAndDelete(id);
  //     if (!product) {
  //       return res.status(404).json({ error: 'Product not found' });
  //     }
  //     res.json({ message: 'Product deleted successfully' });
  //   }
  //   catch (error) {
  //     res.status(500).json({ error: 'Internal server error' });
  //   }
  // })
 


mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('Connected to MongoDB')
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err)
})


