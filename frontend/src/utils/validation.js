export const validateEmail = (email) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
  };
  
  export const validatePassword = (password) => {
	return password && password.length >= 8;
  };
  
  export const validatePhone = (phone) => {
	const phoneRegex = /^$$?([0-9]{3})$$?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
	return phoneRegex.test(phone);
  };
  
  export const validateRequired = (value) => {
	return value && value.toString().trim().length > 0;
  };
  
  export const validatePrice = (price) => {
	const numPrice = parseFloat(price);
	return !isNaN(numPrice) && numPrice > 0;
  };