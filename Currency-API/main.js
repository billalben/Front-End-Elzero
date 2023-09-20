fetch(
  "https://api.currencyfreaks.com/v2.0/rates/latest?apikey=1efa1fa59025435797f220143c6a85d7"
)
  .then((result) => {
    // console.log(result);
    let myData = result.json();

    return myData;
  })
  .then((currency) => {
    let amount = document.querySelector(".amount");
    let algPrice = document.querySelector(".alg span");
    let egpPrice = document.querySelector(".egp span");
    let sarPrice = document.querySelector(".sar span");

    algPrice.innerHTML = Math.round(200 * currency.rates["DZD"]);
    egpPrice.innerHTML = Math.round(amount.innerHTML * currency.rates["EGP"]);
    sarPrice.innerHTML = Math.round(amount.innerHTML * currency.rates["SAR"]);

    console.log(currency.rates["DZD"]);
    console.log(currency.rates.DZD);
    console.log(currency.rates["EGP"]);
    console.log(currency.rates["SAR"]);
  });
