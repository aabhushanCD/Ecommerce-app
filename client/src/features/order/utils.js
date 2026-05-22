export const formatOrderId = (id) => `#${id.slice(-6)}`;

export const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

export const getInitial = (name) => name?.[0]?.toUpperCase() ?? "?";

export const getBadgeVariant = (status) => {
  if (status === "delivered") return "success";
  if (status === "cancelled") return "destructive";
  return "outline";
};
