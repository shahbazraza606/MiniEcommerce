const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    paymentmethodId: {
        type: String,
      
    },
   amount : {
      type: Number,
        required: true,
   },
    currency : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    }
});

module.exports = mongoose.model('Payment', paymentSchema);
    