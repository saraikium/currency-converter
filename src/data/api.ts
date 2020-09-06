const BASE_URL = `http://fixer.handlebarlabs.com/latest?base=`;

export const fetchRates = async (baseCurrency: string) => {
  try {
    const response = await fetch(`${BASE_URL}${baseCurrency}`);
    return response.json();
  } catch (error) {
    return error;
  }
};
