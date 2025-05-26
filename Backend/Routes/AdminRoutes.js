const express = require("express");
import {
  AddPlan,
  GetPlan,
  UpdatePlans,
  DeletePlan,
} from "../Controller/PlanController";
import {
  CreateCoupen,
  GetCoupen,
  DeleteCoupen,
  ToggleCoupen,
} from "../Controller/CoupenController";
import { VerifyAdmintoken } from "../Middlewares/VerifyAdminToken";

const router = express.Router();

// using the middleware
router.use(VerifyAdmintoken);

//Plan routes

router.post("api/plans", AddPlan);
router.get("api/getplans", GetPlan);
router.put("api/updateplans/:id", UpdatePlans);
router.delete("api/deleteplans/:id", DeletePlan);

//Coupen plans

router.post("api/coupens", CreateCoupen);
router.get("api/getcoupens", GetCoupen);
router.put("api/deletecoupen/:id", DeleteCoupen);
router.patch("api/togglecoupens/:id", ToggleCoupen);

export default router;
