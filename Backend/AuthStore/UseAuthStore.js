import { create } from "zustand";

import axios from "axios";

const useAuthStore = create((get, set) => ({
  // Coupon and plan apis

  //1 AddPlan Api
  AddPlan: async (planData) => {
    try {
      const res = await axios.post("api/plans",planData);
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Something went wrong");
    }
  },
  //2 Get Plan
  GetPlan: async () => {
    try {
      const res = axios.get("api/getplans");
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Something went wrong");
    }
  },

  //3 UpdatePlan Api
  UpdatePlan: async (id,planData) => {
    try {
      const res = await axios.put(`api/updateplans/${id}`,planData);
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Something went wrong");
    }
  },

  //4 DeletePlan
  DeletePlan: async (id) => {
    try {
      const res = await axios.delete(`api/deleteplans/${id}`);
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Something went wrong");
    }
  },

  // Coupon scehma

  //1 Create Coupon
  CreateCoupen: async (CouponData) => {
    try {
      const res = await axios.post("api/coupens",CouponData);
      return res.data;
    } catch (err) {
      throw new Error(err.response.data.message || "Something went wrong");
    }
  },

  //2 GetCoupen
  GetCoupen: async () => {
    try {
      const res = await axios.get("api/getcoupens");
      return res.data;
    } catch (err) {
      throw new Error(err.response.data.message || "Something went wrong");
    }
  },

  //3 Deletecoupen
  DeleteCoupen: async (id) => {
    try {
      const res = await axios.put(`api/deletecoupen/${id}`);
      return res.data;
    } catch (err) {
      throw new Error(err.response.data.message || "Something went wrong");
    }
  },

  //4 toggle Coupon
  toggleCoupen: async (id) => {
    try {
      const res = await axios.patch(`api/togglecoupens/${id}`);
      return res.data;
    } catch (err) {
      throw new Error(err.response.data.message || "Something went wrong");
    }
  },
}));
export default useAuthStore;
