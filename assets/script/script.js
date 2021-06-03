//create an object array for questions/answers/correct answers
//create a click response when play hits start quiz, the timer starts and decreases by 1 sec
//create html div elements that contain the question and answers to choose
//when user clicks the response, let them know if they got the answer right or wrong
//    -if user selects wrong answer, deduct 10 secs from the timer
//    -after we validate user answer we then flash the next question on the screen
// when all questions are answered or time expires, we end the quiz
// the user then can save their initials and high score which will be displayed on the high score list
//    -do not let user enter highscore if they have 0 or less points
// update the high score list to include the new high score.

var questions = [
    {
        q: 'Commonly used data types DO NOT include:',
        choices: ['1. strings', '2. booleans', '3. alerts', '4. numbers'],
        a: '3. alerts'
    },
    {
        q: 'The condition in an if/else statement is enclosed with ________.',
        choices: ['1. quotes', '2. curly brackets', '3. parenthesis', '4. square brackets'],
        a: '2. curly brackets'
    },
    {
        q: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        choices: ['1. JavaScript', '2. terminal/bash', '3. for loops', '4. console.log'],
        a: '2. curly brackets'
    }
]

