import mongoose from "mongoose";
import uuid from "uuid";
const Url = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v1
  },
  pathname: {
    type: String,
    required: true
  },
  param1: {
    type: String,
    default: null
  },
  param2: {
    type: String,
    default: null
  },
  param3: {
    type: String,
    default: null
  },
  param4: {
    type: String,
    default: null
  }
});

export default Url;