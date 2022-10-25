/* INPUT */
// Bill
const billInput = document.getElementById("total-bill");
billInput.addEventListener("input", handleBillChange);

// Select Tip %
let tipPercentValue = 0;

const tipBtn = document.getElementsByClassName("tip");

const customBill = document.getElementById("custom");
customBill.addEventListener("input", handleTipPercentage);

for (let i = 0; i < tipBtn.length; i++) {
  tipBtn[i].addEventListener("click", handleTipPercentage);
}

function handleTipPercentage(e) {
  e.preventDefault();
  // console.log(e.target.value + " no. button selected");

  // validate tip
  tipPercentValue = e.target.value == "" ? 0 : parseInt(e.target.value);

  // reseting custom value if other tip options are clicked
  if (e.target.id != "custom") customBill.value = "";

  // making buttons act like radio buttons
  for (let i = 0; i < tipBtn.length; i++) {
    e.target.id === tipBtn[i].id
      ? tipBtn[i].classList.add("active")
      : tipBtn[i].classList.remove("active");
  }

  // calculate updated bill
  handleBillChange();
}

// Number of People
const nPeopleInput = document.getElementById("n-people");
nPeopleInput.addEventListener("input", handleBillChange);

// RESET
const resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", handleResetBtn);

function handleResetBtn(e) {
  console.log("!!! reset bill !!!");
}

/* OUTPUT */
const tipAmountPerPerson = document.getElementById("tip-output");
const totalPerPerson = document.getElementById("total-output");

function handleBillChange(e) {
  let tipAmountPerPersonValue = 0.00;
  let totalPerPersonValue = 0.00;

  if (nPeopleInput.value == 0) {
    console.log("number of people can't be zero");
    document.getElementById("n-people").classList.add("notZeroOutline");
    document.getElementById("notZeroText").innerText = "Can't be zero";
  } else {
    document.getElementById("n-people").classList.remove("notZeroOutline");
    document.getElementById("notZeroText").innerText = "";

    tipAmountPerPersonValue = (
      (billInput.value * tipPercentValue) /
      (nPeopleInput.value * 100)
    ).toFixed(2);

    totalPerPersonValue = (
      (billInput.value / nPeopleInput.value) + parseFloat(tipAmountPerPersonValue)
    ).toFixed(2);
  }
  tipAmountPerPerson.innerText = "$" + parseFloat(tipAmountPerPersonValue).toFixed(2);
  totalPerPerson.innerText = "$" + parseFloat(totalPerPersonValue).toFixed(2);
  console.log(
    "bill :" +
      billInput.value +
      "\nPeople: " +
      nPeopleInput.value +
      "\nTip Percentage: " +
      tipPercentValue
  );
}