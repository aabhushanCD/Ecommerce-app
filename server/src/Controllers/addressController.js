import Address from "../Models/address.model.js";
import User from "../Models/user.model.js";

export const getAddress = async (req, res) => {
  try {
    const userId = req.userId;

    const addresses = await Address.find({ userId });

    if (!addresses) {
      return res.status(404).json({
        message: "address not found",
      });
    }

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
    const address = Address.findOneAndUpdate(
      {
        _id: addressId,
        userId: userId,
      },
      req.body,
      { new: true, runValidators: true },
    );
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }
    res.status(200).json({
      success: true,
      address,
      message: "Address updated successfully",
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

    const user = await Address.findOneAndDelete({ _id: addressId, userId });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Unable to delete pleace check your status" });
    }
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

    const { fullName, type, country, city, state, street, area } = req.body;
    if (!fullName || !type || !country || !city || !state || !street) {
      return res.status(400).json({ message: "Please provide all Fields " });
    }
    const address = await Address.create({
      userId,
      fullName,
      type,
      country,
      city,
      state,
      street,
      area,
    });

    res.status(200).json({
      success: true,
      address,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to add address",
    });
  }
};
