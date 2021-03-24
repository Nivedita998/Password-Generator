const chracterAmountrange = document.getElementById("characterAmountRange");
const chracterAmountnumber = document.getElementById("characterAmountNumber");
const form = document.getElementById("passwordGenerator");
const passwordDisplay = document.getElementById("passworddisplay");

const IncludeUppercase = document.getElementById("IncludeUpperCase");
const IncludeSymbols = document.getElementById("IncludeSymbols");
const IncludeNumbers = document.getElementById("IncludeNumbers");

// finding ascii codes using arrayLowtoHigh function and checking ascii table to check what characters are in between
const UPPER_CASE_CODES = arrayLowToHigh(65, 90);
const LOWER_CASE_CODES = arrayLowToHigh(97, 122);
const NUMBER_CODES = arrayLowToHigh(48, 57);
const SYMBOL_CODES = arrayLowToHigh(32, 47)
  .concat(arrayLowToHigh(58, 64))
  .concat(arrayLowToHigh(91, 96))
  .concat(arrayLowToHigh(123, 126));

//to generate a password and preventDefalut is used to prevents in submiting form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const characterAmount = chracterAmountnumber.value;
  const includeUpperCase = IncludeUppercase.checked;
  const includeNumbers = IncludeNumbers.checked;
  const includeSymbols = IncludeSymbols.checked;

  const password = generatePassword(
    characterAmount,
    includeUpperCase,
    includeNumbers,
    includeSymbols
  );
  passwordDisplay.innerText = password;
});

//function to generate password from acsii value after converting it into character
function generatePassword(
  characterAmount,
  includeUpperCase,
  includeNumbers,
  includeSymbols
) {
  //for defalut lowercase
  let charCodes = LOWER_CASE_CODES;

  //conacting whn the boxes are checked
  if (includeUpperCase) charCodes = charCodes.concat(UPPER_CASE_CODES);
  if (includeNumbers) charCodes = charCodes.concat(NUMBER_CODES);
  if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CODES);

  //array to store the password characters
  const passwordCharacters = [];

  for (let i = 0; i < characterAmount; i++) {
    //IT IS TAKING RANDOM CHARACTERS BETWEEN 1 AND CHARCODES LENGTH.
    const characterCode =
      charCodes[Math.floor(Math.random() * charCodes.length)];

    //STRING.FROMCHARCODE METHOD IS USED TO CONVERT ASCI VALUE INTO CHARACTER WHICH IS DEFINED IN ASCII TABLE
    //and pushed it into passwordCharacters array
    passwordCharacters.push(String.fromCharCode(characterCode));
  }
  //.join is used to convert whole thing into string
  return passwordCharacters.join("");
}

// function to count asci characters low is first value and high is second
// for exampmple A = 65 ascii value , Z = 90 ascii value
//so to print values between A to Z  we made this function arrayLowToHigh(65,90)
function arrayLowToHigh(low, high) {
  const array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}

//syncying the range with number
chracterAmountnumber.addEventListener("input", syncCharacterAmount);
chracterAmountrange.addEventListener("input", syncCharacterAmount);

function syncCharacterAmount(e) {
  const value = e.target.value;
  chracterAmountnumber.value = value;
  chracterAmountrange.value = value;
}
