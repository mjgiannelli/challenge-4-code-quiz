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
//TODO: update timer to 75
var startTime = 100000;

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
                    // TODO: update fadeOut time to 1500
                    $($questions.get(currentQuestion)).fadeOut(100, function () {
                        currentQuestion = currentQuestion + 1;
                        //check to see if all questions were asked
                        if (currentQuestion == totalQuestions) {
                            endQuiz();
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
    var runClock = setInterval(timer, 1000);

    // check timer to see when it hits 0
    var checkTime = setInterval(function () {
        var retrieveTime = parseInt($('.time-remaining').text());
        if (retrieveTime <= 0) {
            clearInterval(runClock);
            parseInt($('.time-remaining').text(0))
            clearInterval(checkTime);
            endQuiz();
        }
        else {
            console.log(retrieveTime);
        }
    }, 1000)
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

//create the 'end quiz' page where user can enter their initials
function endQuiz() {
    // clear page
    clearPage();
    // add 'all done' alert
    var newMain = $('main').addClass('main-end');
    var endQuizAlert = $('<h1>')
        .addClass('title')
        .text('All done!');

    $(newMain).append(endQuizAlert);

    // add final score alert
    var finalScoreAlert = $('<p>')
        .addClass('final-score')
        .text('Your final score is ' + $('.time-remaining').text() + '.');

    $(newMain).append(finalScoreAlert);

    // check if final score is 0. If true - try again to make the high score list and allow them to go back to the homepage
    // else - allow user to input initals and save to local storage as a ordered list
    if (parseInt($('.time-remaining').text()) === 0) {
        var noHighScore = $('<p>')
            .addClass('final-score')
            .text('Unfortunately you did not obtain a high score. Try again!');

        $(newMain).append(noHighScore);
        // create <a> to reference homepage
        var homePageLink = $('<a>').attr({
            href: './index.html'
        });

        $(newMain).append(homePageLink);
        // create go back button to homepage button
        var goBackBtn = $('<button>')
            .addClass('button')
            .text('Go back')
            .attr({
                type: 'button'
            });

        $(homePageLink).append(goBackBtn);
    }

    else {
        // create label & input to allow user to enter intials
        var highscoreForm = $('<form>')
            .addClass('highscore-form')
            .attr({
                action: './high-scores.html'
            });

        $(newMain).append(highscoreForm);


        var enterInitials = $('<label>')
            .text('Enter initials: ')
            .addClass('enter-initials')
            .attr({
                for: 'name',
            })

        $(highscoreForm).append(enterInitials);

        var initials = $('<input>')
            .addClass('initials')
            .attr({
                type: 'text',
                placeholder: 'AAA',
                id: 'name',
                name: 'name'
            });
        $(highscoreForm).append(initials);

        var submitHighscore = $('<input>')
            .addClass('button')
            .attr({
                type: 'submit',
                value: 'Submit',
                id: 'submit'
            });
        $(highscoreForm).append(submitHighscore);
    }
}



//when user clicks start quiz button - start timer and show first question
$('#start-quiz').on('click', function () {
    clearPage();
    askQuestions();
    startTimer(startTime);
})




