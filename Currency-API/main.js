const API_KEY = "1efa1fa59025435797f220143c6a85d7";
const API_URL = `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${API_KEY}`;

const amount = document.querySelector(".amount");
const algPrice = document.querySelector(".alg span");
const egpPrice = document.querySelector(".egp span");
const sarPrice = document.querySelector(".sar span");

const fetchCurrencyData = async (URL, callback) => {
  const response = await fetch(URL);

  if (response.ok) {
    const data = await response.json();
    callback(data);
  }
};

// Fetch currency data and update prices
fetchCurrencyData(API_URL, (data) => {
  algPrice.textContent = Math.round(amount.textContent * data.rates["DZD"]);
  egpPrice.textContent = Math.round(amount.textContent * data.rates["EGP"]);
  sarPrice.textContent = Math.round(amount.textContent * data.rates["SAR"]);
});
