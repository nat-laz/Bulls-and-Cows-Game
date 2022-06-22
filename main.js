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

console.log(`Welcome to Bulls and Cows Game ! \n`);
let providedName = prompt(` Please enter your name: `);

let resultOfTheGames = [];

//------------------------------ MAIN FUNCTION --------------------------\\
const game = () => {
  let bull = 0;
  let cow = 0;
  let attempts = 0;
  const computerNumberArray = secretNumber();
  console.log(computerNumberArray);

  const playerName = providedName.length ? providedName : `Stranger`;
  let level = "";

  while (level.toLowerCase() !== "a" && level.toLowerCase() !== "b") {
    level = prompt(
      `Choose difficulty level: [a] easy - Unlimited number of attempts / [b] difficult - The player gets 7 chances to correctly guess the entire number: `
    );
  }

  let playerNumberArray = arrayFromNumber(prompt(`Enter your number: `));

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
      attempts += 1;

      if (level.toLowerCase() === "b" && attempts === 7) {
        console.log(`\n...GAME OVER...`);
        let anotherRound = prompt(`Would you like to play again? [y]/[n] `);
        if (anotherRound.toLowerCase() === "y") {
          return game();
        } else {
          console.log(`\n Table of Results: \n `);
          if (resultOfTheGames.length === 0) {
            console.log(`You lose this game!`);
          } else {
            return resultOfTheGames.forEach((item, index) =>
              console.log(`You lose in your ${index + 1} game`)
            );
          }
        }
      }

      console.log(
        `\n ${playerNumberArray.join(
          ""
        )} ---  Hint: ${bull} bull(s) and ${cow} cow(s), round: ${attempts}`
      );
      playerNumberArray = arrayFromNumber(prompt(`Enter your number: `));
    } else {
      playerNumberArray = arrayFromNumber(prompt(`Enter your number: `));
    }
  }
  attempts += 1;

  console.log(
    ` \n 🎉🎉🎉 Congrats, ${playerName} 🎉🎉🎉\n You WON in: ${attempts} round(s) \n`
  );

  resultOfTheGames.push(attempts);

  let anotherRound = prompt(`Would you like to play again? [y]/[n] `);
  if (anotherRound.toLowerCase() === "y") {
    return game();
  } else {
    console.log(`\n Table of Results: \n `);
    return resultOfTheGames.forEach((item, index) =>
      console.log(`You won ${index + 1} game in ${item} round(s)`)
    );
  }
};

game();
