import { useState } from "react";
import {
  addAddress,
  updateAddress,
  deleteAddress,
  getAddress,
} from "./user.service";

export const useAddress = () => {
  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // GET ADDRESS
  const fetchAddress = async (type) => {
    try {
      setLoading(true);
      const res = await getAddress(type);
      setAddress(res.data.address);
    } catch (err) {
      setError(err.message || "Failed to load address");
    } finally {
      setLoading(false);
    }
  };

  // ADD ADDRESS
  const createAddress = async (data) => {
    try {
      setLoading(true);
      const res = await addAddress(data);
      setAddress(res.data.addresses);
    } catch (err) {
      setError(err.message || "Failed to add address");
    } finally {
      setLoading(false);
    }
  };

  // UPDATE ADDRESS
  const editAddress = async (addressId, data) => {
    try {
      setLoading(true);
      const res = await updateAddress(addressId, data);
      setAddress(res.data.addresses);
    } catch (err) {
      setError(err.message || "Failed to update address");
    } finally {
      setLoading(false);
    }
  };

  // DELETE ADDRESS
  const removeAddress = async (addressId) => {
    try {
      setLoading(true);
      const res = await deleteAddress(addressId);
      setAddress(res.data.addresses);
    } catch (err) {
      setError(err.message || "Failed to delete address");
    } finally {
      setLoading(false);
    }
  };

  return {
    address,
    loading,
    error,
    fetchAddress,
    createAddress,
    editAddress,
    removeAddress,
  };
};
