// START PSEUDO CODE

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

// END PSEUDO CODE
btns = document.getElementsByClassName("button button-secondary");
// create array object that holds questions and answers
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
        a: '4. console.log'
    },
    {
        q: 'Arrays in JavaScript can be used to store ________.',
        choices: ['1. numbers and strings', '2. other arrays', '3. booleans', '4. all of the above'],
        a: '4. all of the above'
    },
    {
        q: 'String values must be enclosed within ________ when being assigned to variables.',
        choices: ['1. commas', '2. curly brackets', '3. quotes', '4. parenthesis'],
        a: '3. quotes'
    }
]

// function to clear the contents of main once the start button is clicked
function clearPage() {
    $('main').empty();
}

// function to start timer and iterate/validate through questions
function askQuestions() {
    //to add question and choices to main element
    for (var i = 0; i < questions.length; i++) {
        var newMain = $('main').addClass('question');

        //create question for user
        var questionContainer = $('<div>').addClass('questions');
        $(newMain).append(questionContainer);

        var firstQuizQuestion = $('<h1>')
            .addClass('title')
            .text(questions[i]['q']);

        $(questionContainer).append(firstQuizQuestion);

        //create user choices to select
        for (var y = 0; y < questions[i]['choices'].length; y++) {
            var firstQuestionChoices = $('<button>')
                .addClass('button button-secondary')
                .text(questions[i]['choices'][y])
                .attr({
                    type: 'button',
                })
                .on('click', function () {
                    $($questions.get(currentQuestion)).fadeOut(function () {
                        currentQuestion = currentQuestion + 1;
                        if (currentQuestion == totalQuestions) {
                            alert('test is done!');
                        }
                        else {
                            $($questions.get(currentQuestion)).fadeIn();
                        }
                    })
                })
            $(questionContainer).append(firstQuestionChoices);
        }
    }

    var totalQuestions = questions.length;

    var currentQuestion = 0;

    $questions = $('.questions');
    console.log($questions);

    $questions.hide();

    $($questions.get(currentQuestion)).fadeIn();


}



// function askRemainingQuestions() {

//     // to be able to target clicks on the answer choice the user selects
//     clearPage();

//     var newMain = $('main').addClass('question');
//     var i = 1;
//     //create question for user
//     var nextQuizQuestion = $('<h1>')
//         .addClass('title')
//         .text(questions[i]['q']);

//     $(newMain).append(nextQuizQuestion);


//     //create user choices to select
//     for (var y = 0; y < questions[i]['choices'].length; y++) {
//         var nextQuestionChoices = $('<button>')
//             .addClass('button button-secondary')
//             .text(questions[i]['choices'][y])
//             .attr({
//                 type: 'button',
//             })
//             .on('click', function () {
//                 askRemainingQuestions2();
//             })
//         $(newMain).append(nextQuestionChoices);
//     }
//     return i++;


// }

// function askRemainingQuestions2() {

//     // to be able to target clicks on the answer choice the user selects
//     clearPage();

//     var newMain = $('main').addClass('question');
//     var i = 2;
//     //create question for user
//     var nextQuizQuestion = $('<h1>')
//         .addClass('title')
//         .text(questions[i]['q']);

//     $(newMain).append(nextQuizQuestion);


//     //create user choices to select
//     for (var y = 0; y < questions[i]['choices'].length; y++) {
//         var nextQuestionChoices = $('<button>')
//             .addClass('button button-secondary')
//             .text(questions[i]['choices'][y])
//             .attr({
//                 type: 'button',
//             })
//         $(newMain).append(nextQuestionChoices);
//     }
//     return i++;


// }


// set to 75 and start the timer once the start button is clicked
function startTimer() {

    //set timer to 75 seconds
    var startTime = 75;
    var setTime = $('.time-remaining').text(startTime);

    //count down by 1 second
    setInterval(function () {
        startTime--;
        var setTime = $('.time-remaining').text(startTime);
    }, 1000);

}

$('#start-quiz').on('click', function () {
    clearPage();
    askQuestions();
    startTimer();
})




