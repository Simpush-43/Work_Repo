import crypto, { verify } from "crypto";
import UserPurchase_Scehma from "../Models/UserPurchase_Scehma";
import Plan_Schema from "../Models/Plan_Schema";

export const verifyPayment = async (req, res) => {
  try {
    // frontend data
    const {
      razorpay_order_id,
      razorpay_signature,
      razorpay_payment_id,
      userId,
      planId,
      couponCode,
    } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedsignature = crypto.createHmac("sha256",process.env.RAZORPAY_SECRET).update(body.toString()).digest("hex");

    // verifying the signature
    if( expectedsignature !== razorpay_signature) {
      return res.status(400).json({message:"Invalid signature",success:false})
    }
   // finding the plan
   const plan = await Plan_Schema.findById(planId);
   if(!plan){
    return res.status(400).json({message:"plan not found"})
   }
   // setting the validity of purchase
   const validity = new Date();
   validity.setDate(validity.getDate()+30);

   const purchase = await UserPurchase_Scehma.create({
userId,
planId,
paymentId:razorpay_payment_id,
orderId: razorpay_order_id,
validity,
couponUsed: couponCode ||null,
   })
   res.status(200).json({message:"Payment verified",success:true,purchase})
  } catch (err) {
     console.error(err);
    res.status(500).json({ message: 'Error verifying payment', error: err.message });
  }
};
