import User from "../Models/user.model.js";

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

    const { type, country, city, state, street, area } = req.body;
    if (!type || !country || !city || !state || !street) {
      return res.status(400).json({ message: "Please provide all Fields " });
    }
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { address: { type, country, city, state, street, area } } },
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
