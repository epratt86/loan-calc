//form submission
document.getElementById("loan-form").addEventListener("submit", function(e) {
  //hide results
  document.getElementById("results").style.display = "none";
  //show loading gif
  document.getElementById("loading").style.display = "block";
  //let loader spin for 2 seconds before calcResults is ran
  setTimeout(calcResults, 2000);

  e.preventDefault();
});

//calcResults
function calcResults() {
  //start off by grabbing elements from form fields
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  //parseFloat returns number value ending w/ .00
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  //calaculate for monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  //make sure the monthly value is a real number
  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2); //toFixed adds the .00
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

    //show results
    document.getElementById("results").style.display = "block";
    //hide loading gif
    document.getElementById("loading").style.display = "none";
  } else {
    //display a 'flash' message in the DOM
    showError("Please enter a number in all fields");
  }
}

//showError function
function showError(errorMessage) {
  //hide results
  document.getElementById("results").style.display = "none";
  //hide loading gif
  document.getElementById("loading").style.display = "none";
  //create a div to contain the alert
  const errorDiv = document.createElement("div");

  //grab parent element
  const card = document.querySelector(".card");
  //grab the title (alert gets shown right above this)
  const title = document.querySelector(".heading");

  //add the class
  errorDiv.className = "alert alert-danger";

  //create text node & append
  errorDiv.appendChild(document.createTextNode(errorMessage));

  //now put the alert above the title
  card.insertBefore(errorDiv, title);

  //clear the alert after 3 seconds
  setTimeout(clearAlert, 3000);
}

//clear alert
function clearAlert() {
  document.querySelector(".alert").remove();
}
