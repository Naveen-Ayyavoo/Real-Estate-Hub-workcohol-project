export const formatPrice = (price) => {
	return new Intl.NumberFormat('en-US', {
	  style: 'currency',
	  currency: 'USD',
	  minimumFractionDigits: 0,
	  maximumFractionDigits: 0,
	}).format(price);
  };
  
  export const formatDate = (date) => {
	return new Intl.DateTimeFormat('en-US', {
	  year: 'numeric',
	  month: 'short',
	  day: 'numeric',
	}).format(new Date(date));
  };
  
  export const formatPhoneNumber = (phone) => {
	const cleaned = phone.replace(/\D/g, '');
	const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
	if (match) {
	  return `(${match[1]}) ${match[2]}-${match[3]}`;
	}
	return phone;
  };