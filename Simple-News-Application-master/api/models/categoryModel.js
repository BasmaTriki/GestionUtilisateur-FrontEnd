var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var dataTables = require('mongoose-datatables');

var CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
  },
  created_date: {
    type: Date,
    default: Date.now
  },
});

CategorySchema.plugin(dataTables, { totalKey: "recordsTotal", dataKey: "data" });
mongoose.model('Categories', CategorySchema);
module.exports.Schema =function (modelName){
  return {
    model: mongoose.model(modelName)
  };
}
