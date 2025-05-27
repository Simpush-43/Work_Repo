import mongoose from "mongoose";

const UserPurchaseScehma = new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
  plaId:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
  paymentId:{type:String,required:true},
  orderId:{type:Stirng,required:true},
  validity:{type:Date,required:true},
  boughtAt:{type:Date,required:true},
  couponUsed:{type:Stirng}
},{timestamps:true})

export default mongoose.model('UserPurchase',UserPurchaseScehma)