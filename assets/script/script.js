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

// set timer start time
var startTime = 75;

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
    //set buttonId counter
    var buttonId = 0;
    var divId = 0;

    //to add question and choices to main element
    for (var i = 0; i < questions.length; i++) {
        var newMain = $('main').addClass('question');

        //create question for user
        var questionContainer = $('<div>').addClass('questions').attr({
            id: 'div' + divId
        });
        $(newMain).append(questionContainer);

        divId++;

        var quizQuestion = $('<h1>')
            .addClass('title')
            .text(questions[i]['q']);

        $(questionContainer).append(quizQuestion);

        //create user choices to select
        for (var y = 0; y < questions[i]['choices'].length; y++) {
            var questionChoices = $('<button>')
                .addClass('button button-secondary')
                .text(questions[i]['choices'][y])
                .attr({
                    type: 'button',
                    id: buttonId
                })
                .on('click', function () {
                    //validate user selection

                    var userSelection = ($(this)
                        .text()
                        .trim());

                    validator(userSelection, currentQuestion);
                    // on click fade current question out and increase index of object array by 1
                    $($questions.get(currentQuestion)).fadeOut(1500, function () {
                        currentQuestion = currentQuestion + 1;
                        //check to see if all questions were asked
                        if (currentQuestion == totalQuestions) {
                            alert('test is done!');
                        }
                        //if not, fade in the next question
                        else {
                            $($questions.get(currentQuestion)).fadeIn();
                        }
                    });
                })
            $(questionContainer).append(questionChoices);

            buttonId++;

        }
    }

    // let function know when to break
    var totalQuestions = questions.length;

    //set index to new object array
    var currentQuestion = 0;

    //create new object array for dom generated questions
    $questions = $('.questions');

    //hide all the questions generated
    $questions.hide();

    //show first question
    $($questions.get(currentQuestion)).fadeIn();
}

// set to 75 and start the timer once the start button is clicked
function startTimer(startTime) {

    //set timer to 75 seconds

    $('.time-remaining').text(startTime);

    //count down by 1 second
    setInterval(timer, 1000);

}

// add timer function to start timer function
function timer() {
    startTime--;
    $('.time-remaining').text(startTime);
}


function validator(userSelection, currentQuestion) {
    //pull correct choice from questions array
    var correctChoice = questions[currentQuestion]['a'];
    //if userselection does not equal the 'choice' value of currentQuestion
    if (userSelection !== correctChoice) {
        // create a message under buttons to say wrong
        var adjustedTime = parseInt($('.time-remaining').text()) - 10;
        startTime = adjustedTime;
        // add a <p> displaying the alert in the current question div
        var validateChoice = $('<p>')
            .addClass('validate-choice')
            .text("Wrong!")

        $('#div' + currentQuestion).append(validateChoice)
    }

    // else create a message under buttons to say correct
    else {
        var validateChoice = $('<p>')
            .addClass('validate-choice')
            .text("Correct!")

        $('#div' + currentQuestion).append(validateChoice)
    }
}
$('#start-quiz').on('click', function () {
    clearPage();
    askQuestions();
    startTimer(startTime);
})




