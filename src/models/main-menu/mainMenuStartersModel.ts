import mongoose from "mongoose";

const mainMenuStartersSchema = new mongoose.Schema({
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

interface IStarters extends mongoose.Document {
  name: string;
  dietary: string[];
  details: string;
}

const MainMenuStartersDetails = mongoose.model<IStarters>(
  "mainMenuStarter",
  mainMenuStartersSchema
);

export default MainMenuStartersDetails;
