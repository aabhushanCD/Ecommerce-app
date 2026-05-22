export function normalizeError(err) {
  if (typeof err === "object" && err !== null) {
    // Axios / fetch response errors
    if (err.response) {
      const res = err.response;
      const data = res.data ?? {};
      return {
        message: data.message || "Request failed",
        code: data.code ?? undefined,
        status: res.status ?? undefined,
      };
    }

    // Plain Error or anything with a message
    if (err.message) {
      return { message: err.message };
    }
  }

  return { message: "An unknown error occurred" };
}
