import { useState } from "react";

export const useForm = (initialValues) => {
  const [formData, setFormData] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setFormData(initialValues);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (callback) => async (e) => {
    e.preventDefault();
    setLoading(true);
    await callback(formData);
    setLoading(false);
  };

  return {
    formData,
    resetForm,
    handleSubmit,
    loading,
    setLoading,
    handleInputChange,
  };
};
