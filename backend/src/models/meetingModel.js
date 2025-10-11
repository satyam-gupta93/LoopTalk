import mongoose, { Schema } from "mongoose";


const mettingSchema = new Schema({
    user_id : {type:String},
    meetingCode : {type:String,require:true},
    date:{type:date,default:date.now(),require:true}
})

const Metting = mongoose.model("Meeting",mettingSchema);

export {Metting}