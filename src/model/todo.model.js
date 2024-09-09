const { Schema, model } = require("mongoose");

const clientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  joiningDate: {
    type: Date,
    required: true,
  },
  feeSubmissionDate: {
    type: Date,
    required: true,
  },
  fee: {
    type: Number,
    required: true,
  },
  validTill: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});

module.exports = {
  Client: model("client", clientSchema),
  clientSchema,
};
