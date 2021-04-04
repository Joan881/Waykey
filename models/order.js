import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var order = new Schema({
  type: {
    type: String,
    default: 'Bike General Service',
    required: true
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
    required: true
  },
  vehicle: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: 1999
  },
  area: {
    type: String,
    required: true
  },
  customerName: {
    type: String
  },
  customerImage: {
    type: String
  }
});

mongoose.models = {};

var Order = mongoose.model('Order', order);

export default Order;