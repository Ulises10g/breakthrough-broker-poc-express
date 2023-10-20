// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const TemplateSchema = new Schema({
  id: Schema.Types.ObjectId,
  index: Number,
  guid: String,
  isActive: Boolean,
  picture: String,
  width: Number,
  height: Number,
  position: Number,
  scale: Number,
  userId: Number,
  bgColor: Number,
  childsCount: Number,
  templateBaseId: Number,
  name: String,
  gender: String,
  company: String,
  email: String,
  title: String,
  address: String,
  about: String,
  registeredBy: Date,
  tags: String,
  updatedAt: { type: Date, default: Date.now() },
  createdAt: { type: Date, default: Date.now() }
});
const TemplateModel = mongoose.model("template", TemplateSchema);
module.exports = {
  TemplateSchema,
  TemplateModel
}
