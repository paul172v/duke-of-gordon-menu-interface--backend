import mongoose from "mongoose";

const mainMenuDessertsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Entry must have a name"],
  },
  dietary: {
    type: [String],
    enum: [
      "none",
      "gf",
      "gf available",
      "v",
      "v available",
      "vgo",
      "vgo available",
    ],
    required: [true, "Entry must have dietary information"],
  },
  description: {
    type: String,
    maxlength: 241,
  },
});

interface IDesserts extends mongoose.Document {
  name: string;
  dietary: string[];
  details: string;
}

const MainMenuDessertsDetails = mongoose.model<IDesserts>(
  "mainMenuDessert",
  mainMenuDessertsSchema
);

export default MainMenuDessertsDetails;
