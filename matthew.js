const tablecontainer = document.getElementById("table-container");
const exampletable = document.getElementById("example-table-container");
const nextBtn = document.getElementById("next-btn");
const contingencyParent = document.getElementById("contingency");
const secondTable = document.getElementById("secondtable");
const calculation = document.getElementById("calculation");
const regular = document.querySelector(".regular");
const pcontainer = document.querySelector(".paragraph-container");
window.addEventListener("load", () => {
  exampletable.style.opacity = "1";
  pcontainer.style.opacity = "1";
});
exampletable.addEventListener("transitionend", function () {});
let truePositives = 0;
let trueNegatives = 0;
let falsePositives = 0;
let falseNegatives = 0;

const clickevent = () => {
  createTable();

  exampletable.removeEventListener("click", clickevent);
  secondTable.classList.add("opacity");

  secondTable.addEventListener("click", secondClickEvent);

  secondTable.scrollIntoView();
};
const secondClickEvent = () => {
  createContingencyTable();

  secondTable.removeEventListener("click", secondClickEvent);
  contingencyParent.classList.add("opacity");
  contingencyParent.scrollIntoView();
  contingencyParent.addEventListener("click", calculationEvent);
};
const calculationEvent = () => {
  const calculatedValue = document.createElement("div");
  const firstStepCalculation =
    truePositives * trueNegatives - falsePositives * falseNegatives;
  const secondStepCalculation =
    (truePositives + falsePositives) *
    (truePositives + falseNegatives) *
    (trueNegatives + falsePositives) *
    (trueNegatives + falseNegatives);
  calculatedValue.innerHTML =
    "<h2 class='calculation-formula'> <div class='steps'>FORMULA</div><u>MCC = (TP * TN - FP * FN) / sqrt((TP + FP) * (TP + FN) * (TN + FP) * (TN + FN))</u> </h2>" +
    `<div><div class='TPTN'>TP = ${truePositives} </div> <div class='TPTN'>TN = ${trueNegatives}<div/><div class='TPTN'>FP = ${falsePositives} </div> <div class='TPTN'>FN = ${falseNegatives}</div></div> ` +
    `<div> <span class='steps'><br>FIRST STEP  </span> <br><br>(TP * TN - FP * FN) = ${firstStepCalculation}</div>` +
    `<div> <span class='steps'><br>SECOND STEP  <br><br> </span> (TP + FP) * (TP + FN) * (TN + FP) * (TN + FN)  = ${secondStepCalculation} <br>÷<br> </div>` +
    `<div> √¯((TP + FP) * (TP + FN) * (TN + FP) * (TN + FN)) = ${Math.sqrt(
      secondStepCalculation
    )}</div>` +
    `<div><div>${firstStepCalculation} / ${Math.sqrt(
      secondStepCalculation
    )} = ${calculateMCC()}</div></div>` +
    "<h3 class='calculated-value'>" +
    "MCC = " +
    calculateMCC() +
    "</h3>";
  calculation.appendChild(calculatedValue);
  const information = document.createElement("div");
  information.classList.add("TPTN");
  if (calculateMCC() < 0.5) {
    information.innerHTML =
      "LOWER RESULTS CLOSE TO THE 0 MEANS YOUR PREDICTIONS ARE NOT CLOSE TO ACTUAL VALUE";
  } else {
    information.innerHTML =
      "HIGHER RESULTS THAT ARE CLOSE TO 1 MEANS YOU ARE PREDICTIONS ARE CLOSE TO ACTUAL VALUE";
  }
  calculation.appendChild(information);

  contingencyParent.removeEventListener("click", calculationEvent);
  calculation.style.opacity = 1;
  calculation.scrollIntoView();
};
const calculateMCC = () => {
  const MCC =
    (truePositives * trueNegatives - falsePositives * falseNegatives) /
    Math.sqrt(
      (truePositives + falsePositives) *
        (truePositives + falseNegatives) *
        (trueNegatives + falsePositives) *
        (trueNegatives + falseNegatives)
    );
  return MCC;
};
exampletable.addEventListener("click", clickevent);

function createTable() {
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  const tr = document.createElement("tr");

  const th1 = document.createElement("th");
  th1.textContent = "Image";
  tr.appendChild(th1);

  const th2 = document.createElement("th");
  th2.textContent = "Classifier";
  tr.appendChild(th2);

  const th3 = document.createElement("th");
  th3.textContent = "Predicted classifier";
  tr.appendChild(th3);

  thead.appendChild(tr);
  table.appendChild(thead);

  data.forEach(([image, classifier, predictedClassifier]) => {
    const tr = document.createElement("tr");

    const td1 = document.createElement("td");
    td1.textContent = image;
    tr.appendChild(td1);

    const td2 = document.createElement("td");
    td2.textContent = classifier;
    tr.appendChild(td2);

    const td3 = document.createElement("td");
    td3.textContent = predictedClassifier;
    tr.appendChild(td3);

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  secondTable.appendChild(table);
}
function createContingencyTable() {
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  const tr = document.createElement("tr");

  const th1 = document.createElement("th");
  th1.textContent = "BRAIN TUMOR";
  tr.appendChild(th1);

  const th2 = document.createElement("th");
  th2.textContent = "Class (true)";
  tr.appendChild(th2);

  const th3 = document.createElement("th");
  th3.textContent = "Class (false)";
  tr.appendChild(th3);

  thead.appendChild(tr);
  table.appendChild(thead);

  data.forEach(([, classifier, predictedClassifier]) => {
    if (classifier === true && predictedClassifier === true) {
      truePositives++;
    } else if (classifier === true && predictedClassifier === false) {
      falseNegatives++;
    } else if (classifier === false && predictedClassifier === true) {
      falsePositives++;
    } else {
      trueNegatives++;
    }
  });

  const tr1 = document.createElement("tr");

  const td1_1 = document.createElement("td");
  td1_1.textContent = "Predicted (TRUE)";
  tr1.appendChild(td1_1);

  const td1_2 = document.createElement("td");
  td1_2.textContent = truePositives;
  tr1.appendChild(td1_2);

  const td1_3 = document.createElement("td");
  td1_3.textContent = falsePositives;
  tr1.appendChild(td1_3);

  tbody.appendChild(tr1);

  const tr2 = document.createElement("tr");

  const td2_1 = document.createElement("td");
  td2_1.textContent = "Predicted (FALSE)";
  tr2.appendChild(td2_1);

  const td2_2 = document.createElement("td");
  td2_2.textContent = falseNegatives;
  tr2.appendChild(td2_2);

  const td2_3 = document.createElement("td");
  td2_3.textContent = trueNegatives;
  tr2.appendChild(td2_3);

  tbody.appendChild(tr2);

  table.appendChild(tbody);
  table.classList.add("newItem");

  contingencyParent.appendChild(table);
}
