const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
    },
    Plantype: {
      type: String,
      enum: ["counselling", "tool"],
      required: true,
    },
    Price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("UserPlanSchema", PlanSchema);
