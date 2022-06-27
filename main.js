const prompt = require("prompt-sync")({ sigint: true });
const validatePlayerInput = require("./validation.js");
const chalk = require("chalk");
const greeting = chalk.bold.blue;
const nameQuestion = chalk.cyan;
const name = chalk.red;
const hint = chalk.yellow;
const win = chalk.bold.green;
const lose = chalk.bold.red;
const result = chalk.blackBright;
const again = chalk.magentaBright;

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

console.log(greeting(`Welcome to Bulls and Cows Game ! \n`));
let providedName = prompt(nameQuestion(` Please enter your name: `));
let resultOfTheGames = [];

//--------------------------------- MAIN FUNCTION ------------------------------\\
const game = () => {
  let bull = 0;
  let cow = 0;
  let attempts = 0;
  const computerNumberArray = secretNumber();

  const playerName = name(providedName.length ? providedName : `Stranger`);
  let level = prompt(
    result("Choose difficulty level: \n") +
      hint(" [a] easy - Unlimited number of attempts \n ") +
      lose(
        "[b] difficult - The player gets 7 chances to correctly guess the entire number \n "
      )
  );

  while (level.toLowerCase() !== "a" && level.toLowerCase() !== "b") {
    level = prompt(
      result("Choose difficulty level: \n") +
        hint(" [a] easy - Unlimited number of attempts \n ") +
        lose(
          "[b] hard - The player gets 7 chances to correctly guess the entire number \n "
        )
    );
  }

  let playerNumberArray = arrayFromNumber(
    prompt(nameQuestion(`Enter your number:  `))
  );

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
      console.log(
        hint(
          `\n ${playerNumberArray.join(
            ""
          )} ---  Hint: ${bull} bull(s) and ${cow} cow(s), round: ${attempts} \n `
        )
      );

      if (level.toLowerCase() === "b" && attempts === 3) {
        console.log(lose(`\n...GAME OVER...\n`));
        resultOfTheGames.push({
          round: resultOfTheGames.length + 1,
          status: "Lose",
          attempts,
        });

        let anotherRound = prompt(
          again(`Would you like to play again? [y]/[n]   `)
        );
        if (anotherRound.toLowerCase() === "y") {
          return game();
        } else {
          console.log(result(`\n ----------- Game results ---------- \n`));
          return console.table(resultOfTheGames);
        }
      }
      playerNumberArray = arrayFromNumber(
        prompt(nameQuestion(`Enter your number:  `))
      );
    } else {
      playerNumberArray = arrayFromNumber(
        prompt(nameQuestion(`Enter your number:  `))
      );
    }
  }

  attempts += 1;
  console.log(
    win(
      ` \n >>> Congrats, ${playerName} <<< \n You WON in: ${attempts} round(s) \n`
    )
  );

  resultOfTheGames.push({
    round: resultOfTheGames.length + 1,
    status: "Won",
    attempts,
  });

  let anotherRound = prompt(
    again(`Would you like to play again? [y]/[n]     `)
  );
  if (anotherRound.toLowerCase() === "y") {
    return game();
  } else {
    console.log(result(`\n ----------- Game results ---------- \n `));
    console.table(resultOfTheGames);
  }
};

game();
