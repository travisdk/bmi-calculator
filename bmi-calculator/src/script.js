let isMetricSelected = true;
let isImperialSelected = false;
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

const app = async () => {
  registerListeners();
  setHeightInputs();
  setWeightInputs();
};

const registerListeners = () => {
  const allInputs = document.querySelectorAll('input[type="number"]');
  allInputs.forEach((input) =>
    input.addEventListener("focus", (e) => {
      input.select();
    })
  );
  metricRadio.addEventListener("change", (e) => {
    isMetricSelected = true;
    isImperialSelected = false;
    changeUnit();
  });

  imperialRadio.addEventListener("change", (e) => {
    isMetricSelected = false;
    isImperialSelected = true;
    changeUnit();
  });
  heightMetricInput.addEventListener("change", (e) => {
    height = e.target.value;
    setHeightInputs();
  });

  weightMetricInput.addEventListener("change", (e) => {
    weight = e.target.value;
    setWeightInputs();
  });

  const calcHeight = (feet, inch) => feet * 30.48 + inch * 2.54;

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

  const calcWeight = (stones, lbs) => stones * 6.35029318 + lbs * 0.45359237;

  weightImperialStonesInput.addEventListener("change", (e) => {
    const stonesValue = e.target.value;
    const lbsValue = weightImperialLbsInput.value;
    weight = calcWeight(stonesValue, lbsValue);
    setWeightInputs();
  });
  weightImperialLbsInput.addEventListener("change", (e) => {
    const stonesValue = weightImperialStonesInput.value;
    const lbsValue = e.target.value;
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
};
const setHeightInputs = () => {
  // updating the inputboxes values to reflect the height value
  heightMetricInput.value = height;
  const wholeFeet = Math.floor(height / 30.48);
  const inches = (height / 30.48 - wholeFeet) * 12;
  heightImperialFeetInput.value = wholeFeet;
  heightImperialInchesInput.value = inches;
};
const setWeightInputs = () => {
  // updating the inputboxes values to reflect the weight value
  weightMetricInput.value = weight;
  const wholeStone = Math.floor(weight / 6.35029318);
  const lbs = (weight / 6.35029318 - wholeStone) * 14;
  weightImperialStonesInput.value = wholeStone;
  weightImperialLbsInput.value = lbs;
};
document.addEventListener("DOMContentLoaded", app);
