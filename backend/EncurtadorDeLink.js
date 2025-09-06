import mongoose from "mongoose";

const EncurtadorSchema = new mongoose.Schema({
    linkLongo:String,
    pequenoId:String
});

export default mongoose.model('EncurtadorDeLink' , EncurtadorSchema);