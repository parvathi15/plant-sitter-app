const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const DetailsSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    course: { type: String, required: true },
  },
  {
    timestamps: true //time created
  }
);

const DetailsData = mongoose.model("DetailsData", DetailsSchema);

module.exports = DetailsData; //export DetailsData