javascript quiz app.rtf

let questionCounter = 0;
let score = 0;
let questionsArray = [
  {
    question: "1. Who was the first American woman in space?",
     A: “Sally Ride”,
    B: "Christa McAuliffe",
    C: "Valentina Tereshkova",
    correctAnswer: “a”
  },
  {
     question: "2. True or false: 5 kilometer == 5000 meters?",
    A: "True",
    B: "False",
    correctAnswer: “a”,
  
  },
  {
     question: "3. (5 + 3)/2 * 10 = ?",
    A: “2”8,
    B: “4”0,
    C: “42”,
    correctAnswer: “b”
    
  },
  {
    question: "4. Given the array [8, 'Orbit', 'Trajectory', 45], what entry is at index 2?",
    A: "Orbit",
    B: "Trajectory",
    C: “45”,
    correctAnswer: “b”
  },
  {
    question: "5. What is the minimum crew size for the ISS?",
    A: “5”,
    B: “6”,
    C: " 3”,
    correctAnswer: “c”
  },
  ];

let questionsCount = questionsArray.length;

function handleStartClick(){
	$('.js-start-button').on('click',function(event){console.log("handleStartClick() ran");
	$('.progress-section').show();
	$('.start-section').hide();
	$('.end-section').hide();
	$('.quiz-box').fadeIn("slow");
	renderQuizBox(); 

	});
}

// This function displays the quiz box with the question, options, 
// score and question count

function renderQuizBox(){
  renderQuestionCount();
  renderQuestion();
  renderScore();
}

function renderScore(){
  $(".progress-section .score-card").text(`${score}/${questionsCount}`);
}

function renderQuestionCount(){
  $(".progress-section .question-count").text(`Question ${questionCounter+1} of ${questionsCount}`);
}

// This function renders a new question
function renderQuestion(){
  $(".questions-form p").text(questionsArray[questionCounter].question);
  $(".questions-form #option-one").val(questionsArray[questionCounter].optionone);
  $(".questions-form #option-two").val(questionsArray[questionCounter].optiontwo);
  $(".questions-form #option-three").val(questionsArray[questionCounter].optionthree);
  $(".questions-form #option-four").val(questionsArray[questionCounter].optionfour);
   
  $(".questions-form #option-one").next().text(questionsArray[questionCounter].optionone);
  $(".questions-form #option-two").next().text(questionsArray[questionCounter].optiontwo);
  $(".questions-form #option-three").next().text(questionsArray[questionCounter].optionthree);
  $(".questions-form #option-four").next().text(questionsArray[questionCounter].optionfour);
}

function handleSubmitAnswer(){
  $('.js-submit-button').on('click',function(event){
    console.log("handleSubmitAnswer() ran");
    let selectedOption = $('input[type=radio]:checked').val();
    if(selectedOption === undefined) {
       displayPopup(false, selectedOption);
    }
    else{
     //reset radio button
      $('input[type=radio]:checked').attr('checked',false);
      checkAnswer(selectedOption);
    }
 });
}


// This function checks whether the answer selected by the
// user is correct or not
function checkAnswer(selected){
  let rightAnswer = questionsArray[questionCounter].correctAnswer;
  
  if(selected === rightAnswer){
    score++;
    console.log(true, rightAnswer);
  } 
  else{
   console.log(false, rightAnswer);
  }
}

//This function gives feedback to the user whether 
//the option selected in correct or wrong. 
//It also alerts the user if no option is selected
function displayPopup(statusFlag, answer){
  $('.feedback-section').show();
  if(statusFlag){
    $(".popup-box img").attr("src",'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/SMirC-thumbsup.svg/2000px-SMirC-thumbsup.svg.png');
    $(".popup-box #popup-text").text("Hell yeah, brother!!");
    $(".popup-box").show();
  }
  else{
      if(answer === undefined) {
         questionCounter--;
         $(".popup-box img").attr("src",warningIcon);
         $(".popup-box #popup-text").text('Please select an option');
       }
      else{
         $(".popup-box img").attr("src",'https://www.emojirequest.com/images/ThumbsDownEmoji.jpg');
        $(".popup-box #popup-text").text(`You are dumb!!`);
      }
    }
     $(".popup-box").show();
}

//This function will proceed to the next question or display the final score
//based on the question count.

function handlePopupClose(){
  $('.js-close-button').on('click', function(event){
    console.log("handlePopupClose() ran");
    $('.popup-box').hide();
    $('.feedback-section').hide();
    $('.quiz-box').hide().fadeIn();
    questionCounter++;
    if(questionCounter < questionsArray.length) {
       $('.quiz-box').fadeIn();
       renderQuizBox();
    }
    else{
      $('.quiz-box').hide();
      displayFinalScore();
    }
  });
}

//This function displays the final score once the quiz is completed
function displayFinalScore(){
   $('.end-section').fadeIn(1000);
   $('.end-section h4').text(`Your Score is: ${score}/${questionsCount}`);
   $('.correct .count' ).text(score);
   $('.wrong .count').text(questionsCount - score);
   resetQuiz();
}

//This function resets the questions and score
function resetQuiz(){
  questionCounter = 0;
  score = 0;
}

//This function will start over the quiz
function handleStartOver(){
  $('.js-startover-button').on('click',function(event){
    console.log("handleStartOver() ran");
    $('.end-section').hide();
    $('.quiz-box').fadeIn();
    renderQuizBox();
  });
}

function init(){
  $('.end-section').hide();
  $('.progress-section').hide();
  $('.quiz-box').hide();
  $('.feedback-section').hide();
  handleStartClick();
  handleSubmitAnswer();
  handlePopupClose();
  handleStartOver()
}
$(init());