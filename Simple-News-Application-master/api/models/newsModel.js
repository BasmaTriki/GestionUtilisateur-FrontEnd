var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var dataTables = require('mongoose-datatables');

var NewsSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Categories'
  },
  view_count: {
    type: Number,
    default: 0
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  created_date: {
    type: Date,
    default: Date.now
  },
});

NewsSchema.plugin(dataTables, { totalKey: "recordsTotal", dataKey: "data" });
mongoose.model('News', NewsSchema);
module.exports.Schema =function (modelName){
  return {
    model: mongoose.model(modelName)
  };
}
