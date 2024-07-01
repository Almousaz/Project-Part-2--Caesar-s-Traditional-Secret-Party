const alphabet = "abcdefghijklmnopqrstuvwxyz";

// Encrypt Functions

// Encrypt a single letter with the Caesar Cipher
function encryptLetter(letter, shiftValue) {
  // Check if the character is uppercase
  let isUpperCase;
  if (letter === letter.toUpperCase()) {
    isUpperCase = true;
  } else {
    isUpperCase = false;
  }

  // console.log(isUpperCase)

  // Convert character to lowercase
  const lowerLetter = letter.toLowerCase();

  // Find the index of the character in the alphabet
  const index = alphabet.indexOf(lowerLetter);

  // console.log(index);

  // If the character is not in the alphabet, keep it  not changed
  if (index === -1) {
    return letter;
  }

  //  Add the shift value to this index
  // Use the modulus operator to ensure wrapping around the alphabet if necessary
  const shiftedIndex = (index + shiftValue) % alphabet.length;

  // Get the new character from the alphabet
  const newChar = alphabet[shiftedIndex];

  // return the original case (uppercase or lowercase)

  if (isUpperCase) {
    return newChar.toUpperCase();
  } else {
    return newChar;
  }
}

console.log(encryptLetter("l", 42));
console.log(encryptLetter("B", 2));

// Encrypt a word and insert random letters after every two characters
function encryptMessage(message, shiftValue) {
  let encryptedMessage = "";

  for (let i = 0; i < message.length; i++) {
    encryptedMessage += encryptLetter(message[i], shiftValue);
  }

  return insertRandomLetters(encryptedMessage);
}

console.log(encryptMessage("Brutus", 3));

// Insert random letters after every two characters

function insertRandomLetters(encryptedMessage) {
  let finalMessage = "";

  for (let i = 0; i < encryptedMessage.length; i++) {
    // Add the current character
    finalMessage += encryptedMessage[i];

    // Check if we are at every second character and not the last character

    if ((i + 1) % 2 === 0 && i !== encryptedMessage.length - 1) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      // Insert a random letter
      finalMessage += alphabet[randomIndex];
    }
  }

  return finalMessage;
}

const sentence = "Hello Brutus, meet me at the high gardens.";
const shiftValue = 42;

const encryptedMessage = encryptMessage(sentence, shiftValue);
console.log(encryptedMessage);

//  Decrypt Functions

function decryptLetter(char, shiftValue) {
  // Check if the character is uppercase
  let isUpperCase;
  if (char === char.toUpperCase()) {
    isUpperCase = true;
  } else {
    isUpperCase = false;
  }

  // Convert the character to lowercase
  const lowerChar = char.toLowerCase();

  // Find the index of the character in the alphabet
  const index = alphabet.indexOf(lowerChar);

  // If the character is not in the alphabet, return it unchanged
  if (index === -1) {
    return char;
  } else {
    // Calculate the shifted index by subtracting the shift value
    let shiftedIndex = (index - shiftValue) % alphabet.length;

    // setting for negative index by adding the length of the alphabet
    if (shiftedIndex < 0) {
      shiftedIndex += alphabet.length;
    }

    // Get the decrypted character from the alphabet
    const newChar = alphabet[shiftedIndex];

    // return the original case (uppercase or lowercase)
    if (isUpperCase) {
      return newChar.toUpperCase();
    } else {
      return newChar;
    }
  }
}

console.log(decryptLetter("X", 42));
console.log(decryptLetter("A", 42));

// Remove random letters from the encrypted word

function removeRandomLetters(encryptedMessageWithRandom) {
  let cleanedMessage = "";
  let counter = 0;

  for (let i = 0; i < encryptedMessageWithRandom.length; i++) {
    if (counter === 2) {
      counter = 0; // Skip the random letter
    } else {
      cleanedMessage += encryptedMessageWithRandom[i];
      counter++;
    }
  }

  return cleanedMessage;
}
// console.log(removeRandomLetters("Xujbbpe nRhbkjykia, rculujj cqu wqjp jzxul xdywnx mwqxhtiudli." , 42))

// // Decrypt a word by removing random letters and decrypting each letter

function decryptSentence(sentence, shiftValue) {
  const cleanedSentence = removeRandomLetters(sentence);
  // console.log(cleanedSentence);
  let decryptedsentence = "";

  for (let i = 0; i < cleanedSentence.length; i++) {
    decryptedsentence += decryptLetter(cleanedSentence[i], shiftValue);
  }

  return decryptedsentence;
}
// console.log(decryptSentence("Xujbbpe nRhbkjykia, rculujj cqu wqjp jzxul xdywnx mwqxhtiudli." , 42))
// console.log(decryptSentence("Iueuan jrxuq cjythdykwxaj mixkqtaeml ebv wHenckvbkei rqdmt fHukckvi.r Jbxuihus, tmxayiwfuxh sjxau amenhtv 'zQkhhuubyjkit' yjew jhxux mxydatij. zJxmu hvymhihj ajel kldlsuyjb dyju yid uekdh qIbkqsxa xsxqqdvduzb wuqzhdoi qjxwu waueo xjem jfxuy dpuntj dgkvuiwj." , 42))
