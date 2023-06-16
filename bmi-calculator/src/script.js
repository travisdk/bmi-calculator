let isMetricSelected = true;

let weight = 0; // in kg's and cm's
let height = 0;
const metricRadio = document.querySelector("#metric-radio");
const imperialRadio = document.querySelector("#imperial-radio");
const metricElement = document.querySelector("#metric");
const imperialElement = document.querySelector("#imperial");
const heightMetricInput = document.querySelector("#height-input-metric");
const weightMetricInput = document.querySelector("#weight-input-metric");
const heightImperialFeetInput = document.querySelector(
  "#height-input-imperial-feet"
);
const heightImperialInchesInput = document.querySelector(
  "#height-input-imperial-inches"
);
const weightImperialStonesInput = document.querySelector(
  "#weight-input-imperial-stones"
);
const weightImperialLbsInput = document.querySelector(
  "#weight-input-imperial-lbs"
);
const allInputs = document.querySelectorAll(".input-numeric");
const bmiValue = document.querySelector("#bmi-value");
const bmiResult = document.querySelector("#bmi-result");

const app = async () => {
  registerListeners();
  setHeightInputs();
  setWeightInputs();
};
const getCategory = (bmi) => {
  let categoryText = "";

  if (bmi < 18.5) {
    categoryText = "underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
    categoryText = "healthy weight";
  } else if (bmi >= 25 && bmi <= 29.9) {
    categoryText = "overweight";
  } else if (bmi > 29.9) {
    categoryText = "obese";
  }
  return categoryText;
};
const twoDecimals = (val) => (Math.round(val * 100) / 100).toFixed(2);
const noDecimals = (val) => (Math.round(val * 100) / 100).toFixed(0);

const calcBMIAndOutput = () => {
  // prevent division by zero - ideally this needs indications/warnings, not just return.
  if (height <= 0) {
    return false;
  }
  const bmi = (weight / height / height) * 10000;
  const bmiRounded = twoDecimals(bmi);
  const categoryText = getCategory(bmi);
  let idealMin = twoDecimals((18.5 * height * height) / 10000);
  let idealMax = twoDecimals((24.9 * height * height) / 10000);
  let idealOut;
  if (isMetricSelected) {
    idealOut = `${idealMin}kgs - ${idealMax}kgs`;
  } else {
    const wholeStoneMin = noDecimals(Math.floor(idealMin / 6.35029318));
    const lbsMin = noDecimals((idealMin / 6.35029318 - wholeStoneMin) * 14);
    const wholeStoneMax = noDecimals(Math.floor(idealMax / 6.35029318));
    const lbsMax = noDecimals((idealMax / 6.35029318 - wholeStoneMax) * 14);
    idealOut = `${wholeStoneMin}st${lbsMin}lbs - ${wholeStoneMax}st${lbsMax}lbs`;
  }

  bmiValue.innerText = bmiRounded;
  bmiResult.innerHTML = `Your BMI suggests you’re weight is ${categoryText}. Your ideal weight is between <b>${idealOut}</b>.`;
};
const calcHeight = (feet, inch) => twoDecimals(feet * 30.48 + inch * 2.54);
const calcWeight = (stones, lbs) =>
  twoDecimals(stones * 6.35029318 + lbs * 0.45359237);

const registerListeners = () => {
  allInputs.forEach((input) => {
    input.addEventListener("click", (e) => {
      input.select();
    });
  });

  metricRadio.addEventListener("change", (e) => {
    isMetricSelected = true;
    changeUnit();
  });

  imperialRadio.addEventListener("change", (e) => {
    isMetricSelected = false;
    changeUnit();
  });

  heightMetricInput.addEventListener("change", (e) => {
    height = twoDecimals(e.target.value);
    setHeightInputs();
  });

  weightMetricInput.addEventListener("change", (e) => {
    weight = twoDecimals(e.target.value);
    setWeightInputs();
  });

  heightImperialFeetInput.addEventListener("change", (e) => {
    const feetValue = e.target.value;
    const inchesValue = heightImperialInchesInput.value;
    height = calcHeight(feetValue, inchesValue);
    setHeightInputs();
  });

  heightImperialInchesInput.addEventListener("change", (e) => {
    const inchesValue = e.target.value;
    const feetValue = heightImperialFeetInput.value;
    height = calcHeight(feetValue, inchesValue);
    setHeightInputs();
  });

  weightImperialStonesInput.addEventListener("change", (e) => {
    const stonesValue = e.target.value;
    const lbsValue = weightImperialLbsInput.value;
    weight = calcWeight(stonesValue, lbsValue);
    setWeightInputs();
  });
  weightImperialLbsInput.addEventListener("change", (e) => {
    const lbsValue = e.target.value;
    const stonesValue = weightImperialStonesInput.value;
    weight = calcWeight(stonesValue, lbsValue);
    setWeightInputs();
  });
};

const changeUnit = () => {
  if (isMetricSelected) {
    metricElement.style.display = "initial";
    imperialElement.style.display = "none";
  } else {
    metricElement.style.display = "none";
    imperialElement.style.display = "initial";
  }
  calcBMIAndOutput(); // common text fields for both so have to be recalculated
};
function updateFilled() {
  // probably a more effective way to do this..
  for (let input of allInputs) {
    input.value > 0
      ? input.classList.add("filled")
      : input.classList.remove("filled");
  }
}
const setHeightInputs = () => {
  // updating the inputboxes values to reflect the height value
  heightMetricInput.value = twoDecimals(height);
  const wholeFeet = Math.floor(height / 30.48);
  const inches = (height / 30.48 - wholeFeet) * 12;
  heightImperialFeetInput.value = twoDecimals(wholeFeet);
  heightImperialInchesInput.value = twoDecimals(inches);
  calcBMIAndOutput();
  updateFilled();
};
const setWeightInputs = () => {
  // updating the inputboxes values to reflect the weight value
  weightMetricInput.value = twoDecimals(weight);
  const wholeStone = Math.floor(weight / 6.35029318);
  const lbs = (weight / 6.35029318 - wholeStone) * 14;
  weightImperialStonesInput.value = twoDecimals(wholeStone);
  weightImperialLbsInput.value = twoDecimals(lbs);
  calcBMIAndOutput();
  updateFilled();
};

document.addEventListener("DOMContentLoaded", app);
