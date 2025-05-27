import Razorpay from "../utils/Razorpayutil";
import Plan_Schema from '../Models/Plan_Schema';
import Coupen_Schema from "../Models/Coupen_Schema";

export const createOrder = async(req,res)=>{
 try {
   const {PlanId,couponCode} = req.body;
   const plan = await Plan_Schema.findById(PlanId);
   if(!plan) return res.status(404).json({message:"Plan not found"})
    let price = plan.Price ; //convert in paisa

   // coupon code logic
  if(couponCode){
   const coupon = await Coupen_Schema.findOne({code:couponCode});
   const now = new Date;
    if(!coupon) return res.status(400).json({message:"Coupon not found"})
    if(!coupon.isActive) return res.status(400).json({message:"coupon is not active"});
    if(!coupon.ExpiryDate < now) return res.status(400).json({message:"Coupon has expired"})

    // check if coupon code applies to given plan
    if(!coupon.ApplicableType.includes(plan.Plantype)){
      return res.status(400).json({message:'Coupon is not valid for this plan'})
    }

    // apply discount
    const discount = (price* coupon.DiscountPercent)/100;
    price -= discount;
  }

  // create razorpay order 
  const order = await Razorpay.orders.create({
    amount :Math.round(price*100), // covert into paisa
    currency: "INR",
    receipt: `receipt_order_${PlanId}_${Date.now()}`
  });
  res.status(200).json({
    success:true,
    message:"Order created",
    orderID :order.id,
    currency: order.currency,
    amount: order.amount,
    planName: plan.name,
  })
 } catch (err) {
  console.error(err);
  res.status(500).json({message:'Something went wrong',error:err.message})
 }
}
