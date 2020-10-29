// ⭐️ Example Challenge START ⭐️

/**
 * ### Challenge `processFirstItem`
 * 
 * @instructions
 * Implement a higher-order function called `processFirstItem`.
 * It takes two arguments:
 * @param stringList an array of strings.
 * @param callback function that takes a string as its argument.
 * @returns the result of invoking `callback` with the FIRST element in `stringList`.
 * 
 * Example of usage of this higher-order function:
 * Invoking `processFirstItem` passing `['foo', 'bar']` and `(str) => str + str`,
 * should return 'foofoo'.
*/
function processFirstItem(stringList, callback) {
  return callback(stringList[0])
}

// ⭐️ Example Challenge END ⭐️


///// M V P ///////

/* Task 1: `counterMaker`
 * Study the code for counter1 and counter2. Answer the questions below.
 * 
 * 1. What is the difference between counter1 and counter2? 
 * - counter1 is a variable declared outside of the function's scope, which holds the value of the function counterMaker(). 
 * - counter2 is the name of the function.
 * 
 * 2. Which of the two uses a closure? How can you tell?
 * - counter2 uses a closure because inside the function counter2(),  
 * - there is a variable 'count' which has not been declared/defined, such that 'count' must reach outside of the counter2() function to operate. 
 * - This fact, and the existing function itself, demonstrate a closure.
 * 
 * 3. In what scenario would the counter1 code be preferable? In what scenario would counter2 be better? counter1 would be preferable 
 *
*/

// counter1 code
function counterMaker() {
  let count = 0;
  return function counter() {
    count++;
  }
}

const counter1 = counterMaker();

// counter2 code
let count = 0;

function counter2() {
  return count++;
}


/* Task 2: inning() 

Write a function called `inning` that generates a random number of points that a team scored in an inning. This should be a whole number between 0 and 2. */
// let numberOfPoints = 0;
function singleInning(){
    let numberOfPoints = Math.floor(Math.random() * 3);
    return numberOfPoints;
}
console.log(singleInning());

/* Task 3: finalScore()

Write a higher order function called `finalScore` that accepts the callback function `inning` (from above) and a number of innings and and returns the final score of the game in the form of an object.

For example, 

finalScore(inning, 9) might return: 
{
  "Home": 11,
  "Away": 5,
}

*/ 

const finalScore = function(inningFunction, numberOfInnings){
  let endOfGameObject={ homeScore: 0, awayScore: 0 };

  for(let i = 0; i < numberOfInnings; i++) {
    endOfGameObject.homeScore += inningFunction();
    endOfGameObject.awayScore += inningFunction();
  }

  return endOfGameObject;
}
console.log('finalScore: ', finalScore(singleInning, 9));

/* Task 4: 

Create a function called `scoreboard` that accepts the following parameters: 

(1) Callback function `getInningScore`
(2) Callback function `inning`
(2) A number of innings

and returns the score at each point in the game, like so:

1st inning: awayTeam - homeTeam
2nd inning: awayTeam - homeTeam
3rd inning: awayTeam - homeTeam
4th inning: awayTeam - homeTeam
5th inning: awayTeam - homeTeam
6th inning: awayTeam - homeTeam
7th inning: awayTeam - homeTeam
8th inning: awayTeam - homeTeam
9th inning: awayTeam - homeTeam

Final Score: awayTeam - homeTeam */

function scoreboard(getInningScoreFn, inningFn, numberOfInnings) {
  const inningScores = [];

  const finalScore = {
    homeTeam: 0,
    awayTeam: 0,
  }

  for(let i = 0; i < numberOfInnings; i++) {
    const inningNumber = i + 1;
    finalScore.homeTeam += getInningScoreFn();
    finalScore.awayTeam += getInningScoreFn();

    inningScores[inningNumber] = { awayTeam: finalScore.awayTeam, homeTeam: finalScore.homeTeam };
    console.log(`${inningNumber} inning: ${finalScore.awayTeam} - ${finalScore.homeTeam}`);
    if(inningFn) {
      inningFn({ awayTeam: finalScore.awayTeam, homeTeam: finalScore.homeTeam });
    }
  }

  console.log(`Final Score: ${finalScore.awayTeam} - ${finalScore.homeTeam}`);

  return finalScore;
}

scoreboard(singleInning, () => {}, 20)

/// ALTERNATIVE SCOREBOARD

function scoreboard2(getInningScoreFn, inningFn, numberOfInnings) {
  const inningScores = [];

  const finalScore = {
    homeTeam: 0,
    awayTeam: 0,
  }

  for(let i = 0; i < numberOfInnings; i++) {
    const inningNumber = i + 1;
    finalScore.homeTeam += getInningScoreFn();
    finalScore.awayTeam += getInningScoreFn();

    inningScores[inningNumber] = { awayTeam: finalScore.awayTeam, homeTeam: finalScore.homeTeam };
    // console.log(`${inningNumber} inning: ${finalScore.awayTeam} - ${finalScore.homeTeam}`);
    if(inningFn) {
      const isLastInning = inningNumber == numberOfInnings;
      inningFn({ awayTeam: finalScore.awayTeam, homeTeam: finalScore.homeTeam }, isLastInning);
    }
  }
}

function inningFunction(inning) {
  const { homeTeam, awayTeam } = inning;


}

scoreboard2(singleInning, () => {}, 20)