const passwordBox = document.getElementById("password");
const length = 12;

const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const number = "1234567890";
const specialCharacters = `"!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~"`;
const chars = upperCase + lowerCase + number + specialCharacters;

function createPassword() {
  let password = "";
  password += upperCase[Math.floor(Math.random() * upperCase.length)];
  password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
  password += number[Math.floor(Math.random() * number.length)];
  password +=
    specialCharacters[Math.floor(Math.random() * specialCharacters.length)];

  while (length >= password.length) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  passwordBox.value = password;
}
