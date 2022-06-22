const prompt = require("prompt-sync")({ sigint: true });
const validatePlayerInput = require("./validation.js");

//------------------------------ Computer Generated Number --------------------------\\
const secretNumber = () => {
  let digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let seceretCode = [];

  for (let i = 0; i < 4; i++) {
    let randomNumber = digits.splice(Math.ceil(Math.random() * 9) - i, 1);
    seceretCode.push(randomNumber);
  }
  return seceretCode.flat();
};

//-------------------- Convert number entered by Player in Array --------------------\\
const arrayFromNumber = (num) => {
  return String(num)
    .split("")
    .map((num) => {
      return Number(num);
    });
};

//------------------------------ Compare this 2 arrays --------------------------\\
const compareTwoArray = (a, b) => {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
};

//------------------------------ MAIN FUNCTION --------------------------\\
const game = () => {
  let bull = 0;
  let cow = 0;
  const computerNumberArray = secretNumber();
  // console.log(computerNumberArray);
  let playerNumberArray = arrayFromNumber(+prompt(`Enter your number: `));

  while (!compareTwoArray(computerNumberArray, playerNumberArray)) {
    const isValid = validatePlayerInput(playerNumberArray);
    if (isValid) {
      cow = 0;
      bull = 0;
      computerNumberArray.some((item) => {
        if (playerNumberArray.includes(item)) cow += 1;
      });
      for (i = 0; i < 4; i++) {
        if (computerNumberArray[i] === playerNumberArray[i]) {
          bull += 1;
          cow -= 1;
        }
      }
      console.log(
        `\n ${playerNumberArray.join(
          ""
        )} ---  Hint: ${bull} bull(s) and ${cow} cow(s)`
      );
      playerNumberArray = arrayFromNumber(+prompt(`Enter your number: `));
    } else {
      playerNumberArray = arrayFromNumber(+prompt(`Enter your number: `));
    }
  }
  console.log("You WIN!!!");
};

game();
