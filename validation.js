const checkForDuplicatesNum = (numbers) => {
    const copyNumb = [...numbers];
  
    let booleanArray = numbers.map((el) => {
      copyNumb.shift();
      return copyNumb.includes(el);
    });
    return booleanArray.includes(true);
  };
  
  const validatePlayerInput = (input) => {
    if (input.length !== 4 || checkForDuplicatesNum(input)) {
      console.log(`Invalid entry or duplicated number, please try again.`);
      return false;
    } else {
      return true;
    }
  };
  
  module.exports = validatePlayerInput;
  