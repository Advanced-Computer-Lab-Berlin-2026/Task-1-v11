const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a product name"]
  },
  price: {
    type: Number,
    required: [true, "Please provide a product price"]
  },
  description: {
    type: String,
    required: false
  }
},
{
    timestamps: true
}


);

module.exports = mongoose.model('Product', productSchema);