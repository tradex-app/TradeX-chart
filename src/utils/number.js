// number.js

// Getting a random number between 0 (inclusive) and 1 (exclusive)
export function getRandom() {
  return Math.random();
}

// Getting a random number between two values
// inclusive of the minimum, exclusive of the maximum
export function getRandomInt(min, max) {
  return Math.random() * (max - min) + min;
}

// Getting a random integer between two values
// inclusive of the minimum, exclusive of the maximum
export function getRandomIntBetween(min, max) {
  min = Math.ceil(min) + 1;
  max = Math.floor(max);
  //The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min) + min); 
}

// Getting a random integer between two values, inclusive
// inclusive of the minimum, inclusive of the maximum
export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}




