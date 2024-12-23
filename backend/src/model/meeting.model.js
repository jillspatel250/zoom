import mongoose,{Schema} from "mongoose";

const meetingSchema=new Schema({
    user_id:{type:String},
    meeting_code:{type:String,require:true},
    date:{type:Date,Default:Date.now(),require:true},
});

const Meeting=new mongoose.model("Meeting",meetingSchema);

export {Meeting};