const inputBill = document.querySelector(".input-bill");
const inputCustom = document.querySelector(".input-custom");
const inputPeople = document.querySelector(".input-people");
const btn5 = document.querySelector(".btn-5");
const btn10 = document.querySelector(".btn-10");
const btn15 = document.querySelector(".btn-15");
const btn25 = document.querySelector(".btn-25");
const btn50 = document.querySelector(".btn-50");
const showTip = document.querySelector(".show-tip");
const showTotal = document.querySelector(".show-total");
const btnReset = document.querySelector(".btn-reset");
const showWarning = document.querySelector("label span");

let percent = 0;
const btnsPercent = [btn5, btn10, btn15, btn25, btn50, inputCustom];

function resetBtn() {
  inputBill.value = "";
  inputCustom.value = "";
  inputPeople.value = "";

  btnsPercent.forEach((btn) => {
    btn.classList.remove("click");
  });

  showTip.textContent = "$0.00";
  showTotal.textContent = "$0.00";
}

inputBill.addEventListener("change", function () {
  billAmount = Number(inputBill.value);
  numPeople = Number(inputPeople.value);

  if (billAmount !== 0) {
    btnReset.removeAttribute("disabled");
  }

  if (numPeople === 0) {
    showWarning.classList.add("empty");
    inputPeople.classList.add("empty");
  }
});

inputPeople.addEventListener("change", function () {
  numPeople = Number(inputPeople.value);
  if (numPeople !== 0) {
    showWarning.classList.remove("empty");
    inputPeople.classList.remove("empty");
  } else if (numPeople === 0) {
    showWarning.classList.add("empty");
    inputPeople.classList.add("empty");
  }
});

btnsPercent.forEach((btn) => {
  btn.addEventListener("pointerdown", function () {
    btn.classList.add("click");
    btnsPercent.forEach(function (btnInner) {
      if (btnInner !== btn) {
        btnInner.classList.remove("click");
      }
    });
    if (btn.id !== "custom") {
      percent = Number(btn.innerHTML);
    }
  });
});

btnReset.addEventListener("click", resetBtn);

document.querySelectorAll(".input").forEach((input) => {
  input.addEventListener("change", function () {
    billAmount = Number(inputBill.value);
    customPercent = Number(inputCustom.value);
    numPeople = Number(inputPeople.value);

    if (customPercent > 100) {
      alert("Percentage cannot be greater than 100!");
    }

    if (percent === 0) {
      percent = customPercent;
    }

    if ((billAmount !== 0) & (percent !== 0) & (numPeople !== 0)) {
      const totalTip = billAmount * (percent / 100);
      const tipPerson = totalTip / numPeople;
      const totalPerson = billAmount / numPeople + tipPerson;

      showTip.textContent = "$" + tipPerson.toFixed(2);
      showTotal.textContent = "$" + totalPerson.toFixed(2);
    }
  });
});
