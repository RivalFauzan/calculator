// Mengambil semua elemen yang dibutuhkan
const previousTextElement = document.querySelector(".previous-operand");
const currentTextElement = document.querySelector(".current-operand");
const buttons = document.querySelectorAll(".btn");

let currentOperand = "";
let previousOperand = "";
let operation = undefined;

// Fungsi untuk membersihkan layar (AC)
function clear() {
  currentOperand = "0";
  previousOperand = "";
  operation = undefined;
}

// Fungsi untuk menghapus angka terakhir (DEL)
function deleteNumber() {
  if (currentOperand === "0") return;
  currentOperand = currentOperand.toString().slice(0, -1);
  if (currentOperand === "") currentOperand = "0";
}

// Fungsi untuk menambah angka saat tombol diklik
function appendNumber(number) {
  if (number === "." && currentOperand.includes(".")) return; // Mencegah titik ganda
  if (currentOperand === "0" && number !== ".") {
    currentOperand = number.toString();
  } else {
    currentOperand = currentOperand.toString() + number.toString();
  }
}

// Fungsi saat tombol operator (+, -, ×, ÷) diklik
function chooseOperation(selectedOperation) {
  if (currentOperand === "") return;
  if (previousOperand !== "") {
    compute();
  }
  operation = selectedOperation;
  previousOperand = currentOperand;
  currentOperand = "";
}

// Fungsi untuk menghitung hasil (=)
function compute() {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "−":
      computation = prev - current;
      break;
    case "×":
      computation = prev * current;
      break;
    case "÷":
      if (current === 0) {
        alert("Tidak bisa membagi dengan nol!");
        clear();
        return;
      }
      computation = prev / current;
      break;
    default:
      return;
  }
  currentOperand = computation.toString();
  operation = undefined;
  previousOperand = "";
}

// Fungsi untuk memperbarui tampilan di layar
function updateDisplay() {
  currentTextElement.innerText = currentOperand;
  if (operation != null) {
    previousTextElement.innerText = `${previousOperand} ${operation}`;
  } else {
    previousTextElement.innerText = "";
  }
}

// Event Listener untuk mendeteksi klik tombol
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.innerText;

    if (button.classList.contains("clear")) {
      clear();
    } else if (button.classList.contains("delete")) {
      deleteNumber();
    } else if (button.classList.contains("operator")) {
      chooseOperation(value);
    } else if (button.classList.contains("equal")) {
      compute();
    } else {
      appendNumber(value);
    }

    updateDisplay();
  });
});

// Jalankan fungsi clear di awal agar layar menampilkan angka 0
clear();
updateDisplay();
