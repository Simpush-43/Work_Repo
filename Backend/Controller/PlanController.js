import Plan_Schema from "../Models/Plan_Schema";

//create Plan
export const AddPlan = async (req, res) => {
  try {
    const plan = await Plan_Schema.create(req.body);
    res.status(201).json({ message: "Plan created successfully", Plan: plan });
  } catch (err) {
    res.status(400);
    throw new Error(err.response?.data?.message || "Failed to create plans");
  }
};

// get plans

export const GetPlan = async (req, res) => {
  try {
    const { Plantype } = req.params;
    const filter = Plantype ? { Plantype } : {};
    const plans = await Plan_Schema.find(filter);
    res.status(201).json({ message: "Plan found successfully", Plans: plans });
  } catch (err) {
    res.status(400);
    throw new Error(err.response?.data?.message || "Failed to find plans");
  }
};

//update plans

export const UpdatePlans = async (req, res) => {
  try {
    const UpdatePlan = await Plan_Schema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res
      .status(201)
      .json({ message: "Plan updated successfully", UpdatePlans: UpdatePlan });
  } catch (err) {
    res.status(400);
    throw new Error(err.response?.data?.message || "Failed to Update plans");
  }
};

// delete plan
export const DeletePlan = async (req, res) => {
  try {
    const DeletePlan = await Plan_Schema.findByIdAndDelete(req.params.id);
    res
      .status(201)
      .json({ message: "Plan Deleted successfully", DeletedPlans: DeletePlan });
  } catch (err) {
    res.status(400);
    throw new Error(err.response?.data?.message || "Failed to Delete plans");
  }
};
