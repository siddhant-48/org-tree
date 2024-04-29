const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
      default: function () {
        return "EMP" + this.get("id");
      },
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    reportings: {
      type: [String],
      default: [],
    },
    reportingCount: {
      type: Number,
      // default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;
