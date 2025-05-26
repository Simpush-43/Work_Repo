import Coupen_Schema from "../Models/Coupen_Schema";

//create coupen
export const CreateCoupen = async (req, res) => {
  try {
    const coupen = await Coupen_Schema.create(req.body);
    res
      .status(201)
      .json({ message: "Coupen created successfully", Coupen: coupen });
  } catch (err) {
    res.status(400);
    throw new Error(err.response?.data?.message || "Failed to create coupens");
  }
};

//get coupen

export const GetCoupen = async (req, res) => {
  try {
    const now = new Date();
    const { status } = req.query;
    let filter = {};
    if (status === "active") {
      filter = { ExpiryDate: { $gte: now }, isActive: true };
    } else if (status === "expired") {
      filter = { ExpiryDate: { $gte: now } };
    }
    const coupens = await Coupen_Schema.find(filter);
    res
      .status(201)
      .json({ message: "Coupen got successfully", GetCoupen: coupens });
  } catch (err) {
    res.status(400);
    throw new Error(err.response?.data?.message || "Failed to get coupens");
  }
};

// delete coupen
export const DeleteCoupen = async (req, res) => {
  try {
    await Coupen_Schema.findByIdAndDelete(req.params.id);
    res.status(201).json({ message: "Coupen got deleted successfully" });
  } catch (err) {
    res.status(400);
    throw new Error(
      err.response?.data?.message || "Failed to delete the coupens"
    );
  }
};

// toggle coupens
export const ToggleCoupen = async (req, res) => {
  try {
    const coupen = await Coupen_Schema.findById(req.params.id);
    coupen.isActive = !coupen.isActive;
    await coupen.save();
    res
      .status(201)
      .json({
        message: "Coupen got toggled successfully",
        toggledcoupen: coupen,
      });
  } catch (err) {}
};
