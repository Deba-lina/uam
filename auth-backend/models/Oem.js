import mongoose from "mongoose";

const oemSchema = new mongoose.Schema(
  {
    oemName: {
      type: String,
      required: true
    },

    make: {
      type: String,
      required: true
    },

    capacity: {
      type: String,
      required: true
    },

    installationDate: {
      type: Date
    },

    site: {
      type: String
    },

    state: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "Oem",
  oemSchema
);