import mongoose from "mongoose";

const mainMenuSettingsSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: new mongoose.Types.ObjectId(),
    required: [true, "Settings model must have an ID"],
  }, // Explicitly declare the _id field
  menuActive: {
    type: Boolean,
    required: [true, "menuActive must be included"],
    default: true,
  },
  date: {
    type: String,
    required: [true, "Menu must have a date"],
    default: Date.now().toLocaleString(),
  },
  showStarters: {
    type: Boolean,
    required: [true, "showStarters must be included"],
    default: true,
  },
  showIntermediate: {
    type: Boolean,
    required: [true, "showIntermediate must be included"],
    default: true,
  },
  showMains: {
    type: Boolean,
    required: [true, "showMains must be included"],
    default: true,
  },
  showDesserts: {
    type: Boolean,
    required: [true, "showDesserts must be included"],
    default: true,
  },
  showPrices: {
    type: Boolean,
    required: [true, "showPrices must be included"],
  },
  startersPrice: {
    type: Number,
  },
  intermediatePrice: {
    type: Number,
  },
  mainsPrice: {
    type: Number,
  },
  dessertsPrice: {
    type: Number,
  },
});

interface IDetails extends mongoose.Document {
  _id: string;
  menuActive: boolean;
  date: string;
  showStarters: boolean;
  showIntermediate: boolean;
  showMains: boolean;
  showDesserts: boolean;
  showPrices: boolean;
  startersPrice: number;
  intermediatePrice: number;
  mainsPrice: number;
  dessertsPrice: number;
}

const MainMenuSettingsDetails = mongoose.model<IDetails>(
  "mainMenuSetting",
  mainMenuSettingsSchema
);

export default MainMenuSettingsDetails;
