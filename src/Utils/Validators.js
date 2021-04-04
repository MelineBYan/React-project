export const maxLength = (length) => (value) =>
  value.length > length ? `Max length is ${length}` : undefined;
export const minLength = (length) => (value) =>
  value.length < length ? `Min length is ${length}` : undefined;
export const isRequired = (value) =>
  !value.length ? "This field is required" : undefined;
export const validateEmail = (email) => {
  const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexp.test(String(email).toLowerCase()) ? undefined : "Invalid email";
};
