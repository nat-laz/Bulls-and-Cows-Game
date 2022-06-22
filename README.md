# Bulls and Cows

In this project we will build a two player game that is called **Bulls and Cows**.

![cow icon](assets/cow.svg) ![bull icon](assets/bull.svg)

## Rules

One of the players comes up with a secret number, and the other player tries to guess it.

The secret number must consist of 4 digits and each digit must be **unique**.

For example:

- `1112` would **not** be an acceptable secret number
- `1234` on the other hand is an acceptable value for the secret number, since each digit is unique

After each guess, the player will get a hint to help them guess better next time around.

The hint tells the player how many bulls and how many cows there were. What are bulls and cows?

- If there are any matching digits and they are in their right positions, they are counted as *"bulls"*.
- If in different positions, they are counted as *"cows"*.

For example, with a secret number `4271`:

>
    Player's try: 1234

    Hint: 1 bull and 2 cows


How did we arrive at one bull and two cows?
The bull is the number `2` as it is in the right position.

The cows are `4` and `1`, as they exist in the secret number but they are not in the right position.

Do **not** disclose to the user which digit is a cow and which one is bull, just how many there are (if any).

There is no limit on the number of guesses - guessing continues until the player figures out the other player's secret number.

Once the player has guessed the secret number correctly, display a message to congratulate them.

## Getting the input from the terminal 

Our game will be player vs computer. The computer will come up with a secret number and the player will be trying to guess it.

To gather the player's input we will use an npm package called [`prompt-sync`](https://github.com/heapwolf/prompt-sync).

We can use the package like so:

```js
// Import package
const prompt = require('prompt-sync')({ sigint: true });
// Use package
let name = prompt('What is your name? '); // Note there is a space at the end, so the input does not stick to the question
```

Then the variable name will contain the value that the user entered in the terminal.

Make sure to validate the input to a certain extent. For example:

- it must exist (the user can simply hit enter, but we should not accept this as a valid guess)
- it must be 4 digits
- each of the 4 digits must be unique

