import User from "../Models/user.model.js";

export const setAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const { country, state, city, area, street } = req.body;

    if (!country || !city || !street || !state) {
      return res
        .status(400)
        .json({ message: "Please Provide all required field" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const address = {
      country,
      street,
      city,
      state,
      area,
    };

    user.addresses.push(address);

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Address added successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const { type } = req.query;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const addresses = type
      ? user.addresses.filter((addr) => addr.type === type)
      : user.addresses;

    res.status(200).json({
      success: true,
      addresses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch address",
    });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const { addressId } = req.params;

    const user = await User.findOneAndUpdate(
      { _id: userId, "addresses._id": addressId },
      {
        $set: {
          "addresses.$": {
            ...req.body,
            _id: addressId,
          },
        },
      },
      { new: true },
    );

    res.status(200).json({
      success: true,
      addresses: user.addresses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update address",
    });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const { addressId } = req.params;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { addresses: { _id: addressId } },
      },
      { new: true },
    );

    res.status(200).json({
      success: true,
      addresses: user.addresses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete address",
    });
  }
};

export const addAddress = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { addresses: req.body } },
      { new: true },
    );

    res.status(200).json({
      success: true,
      addresses: user.addresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add address",
    });
  }
};
