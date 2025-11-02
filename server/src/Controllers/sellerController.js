import Seller from "../Models/seller.model.js";

/**

* @desc Apply as a seller
* @route POST /seller/apply
* @access User
  */
export const applyAsSeller = async (req, res) => {
  try {
    const { role, userId } = req;
    const { shopName, contactEmail, pan, phone, address } = req.body;

    if (role !== "user") {
      return res
        .status(403)
        .json({ message: "Only users can apply as sellers", success: false });
    }

    // Check if user already applied
    const existingSeller = await Seller.findOne({ sellerId: userId });
    if (existingSeller) {
      return res.status(400).json({
        message: "You have already applied as a seller",
        success: false,
      });
    }

    // Create seller data explicitly
    const sellerData = {
      sellerId: userId,
      shopName,
      contactEmail,
      document: { pan },
      phone,
      address,
    };

    const seller = await Seller.create(sellerData);

    return res.status(201).json({
      message: "Seller application submitted successfully",
      success: true,
      seller,
    });
  } catch (error) {
    console.error("Error applying as seller:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

/**

* @desc Get logged-in user's seller info
* @route GET /seller/me
* @access User/Admin
  */
export const getMySellerInfo = async (req, res) => {
  try {
    const { userId } = req;

    const seller = await Seller.findOne({ sellerId: userId });
    if (!seller) {
      return res
        .status(404)
        .json({ message: "Seller info not found", success: false });
    }

    return res.status(200).json({
      message: "Seller info fetched successfully",
      success: true,
      seller,
    });
  } catch (error) {
    console.error("Error fetching seller info:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

/**

* @desc Update logged-in user's seller info
* @route PATCH /seller/me
* @access User
  */
export const updateMySellerInfo = async (req, res) => {
  try {
    const { role, userId } = req;
    const { shopName, contactEmail, pan, phone, address } = req.body;

    if (role !== "user") {
      return res.status(403).json({
        message: "Only users can update their seller info",
        success: false,
      });
    }

    // Build update object dynamically
    const updateData = {};
    if (shopName) updateData.shopName = shopName;
    if (contactEmail) updateData.contactEmail = contactEmail;
    if (pan) updateData.document = { pan };
    if (phone) updateData.phone = phone;
    if (address) updateData.address = address;

    const seller = await Seller.findOneAndUpdate(
      { sellerId: userId },
      updateData,
      { new: true }
    );

    if (!seller) {
      return res
        .status(404)
        .json({ message: "Seller info not found", success: false });
    }

    return res.status(200).json({
      message: "Seller info updated successfully",
      success: true,
      seller,
    });
  } catch (error) {
    console.error("Error updating seller info:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

/**

* @desc Get all sellers
* @route GET /seller
* @access Admin
  */
export const getAllSellers = async (req, res) => {
  try {
    const { role } = req;

    if (role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admins can view all sellers", success: false });
    }

    const sellers = await Seller.find().populate("sellerId");

    return res.status(200).json({
      message: "Sellers fetched successfully",
      success: true,
      sellers,
    });
  } catch (error) {
    console.error("Error fetching sellers:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

/**

* @desc Verify a seller
* @route PATCH /seller/verify/:sellerId
* @access Admin
  */
export const verifySeller = async (req, res) => {
  try {
    const { role } = req;
    const { sellerId } = req.params;

    if (role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admins can verify sellers", success: false });
    }

    const seller = await Seller.findByIdAndUpdate(
      sellerId,
      { isVerified: true },
      { new: true }
    );

    if (!seller) {
      return res
        .status(404)
        .json({ message: "Seller not found", success: false });
    }

    return res.status(200).json({
      message: "Seller verified successfully",
      success: true,
      seller,
    });
  } catch (error) {
    console.error("Error verifying seller:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

/**

* @desc Get seller by ID
* @route GET /seller/:sellerId
* @access User/Admin
  */
export const getSellerById = async (req, res) => {
  try {
    const { sellerId } = req.params;

    const seller = await Seller.findById(sellerId).populate("sellerId");
    if (!seller) {
      return res
        .status(404)
        .json({ message: "Seller not found", success: false });
    }

    return res.status(200).json({
      message: "Seller fetched successfully",
      success: true,
      seller,
    });
  } catch (error) {
    console.error("Error fetching seller by ID:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};
