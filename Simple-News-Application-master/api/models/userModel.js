var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var dataTables = require('mongoose-datatables');

var UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['contributor', 'approver', 'administrator'],
    default: ['contributor']
  },
  phone_number: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{10,11}/.test(v);
      },
      message: '{VALUE} is not a valid phone number!'
    },
  },
  email: {
    type: String,
    validate: {
      validator: function(v){
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
      },
      message: '{VALUE} is not a valid email!'
    }
  },
  created_date: {
    type: Date,
    default: Date.now
  },
});

UserSchema.plugin(dataTables, { totalKey: "recordsTotal", dataKey: "data" });
mongoose.model('Users', UserSchema);
module.exports.Schema =function (modelName){
  return {
    model: mongoose.model(modelName)
  };
}
