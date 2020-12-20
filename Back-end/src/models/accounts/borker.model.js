const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brokerSchema = new Schema({
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true, trim: true },
  phone: { type: String, trim: true, required: true },
  fb: { type: String, trim: true },
});

const BrokerModel = mongoose.model('broker', brokerSchema, 'brokers');

module.exports = BrokerModel;
