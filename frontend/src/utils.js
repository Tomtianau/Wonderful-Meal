export const fetchError = (error) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};
