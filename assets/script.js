// function to start the quiz and hide instructions

startQuiz = function() {
  if (document.getElementById("beginPage").style.display == "none") {
    var content = document.getElementsByClassName("beginPage");
    for (var i = 0; i < content.length; i++) content[i].style.display = "none";
    document.getElementById("beginPage").style.display = "block";
  } else {
    document.getElementById("beginPage").style.display = "none";
  }
};

// function to show questions

showQuestions = function() {
  if (document.getElementById("quizContainer").style.display == "none") {
    var content = document.getElementsByClassName("quizContainer");
    for (var i = 0; i < content.length; i++) content[i].style.display = "none";
    document.getElementById("quizContainer").style.display = "block";
  } else {
    document.getElementById("quizContainer").style.display = "contents";
  }
};


// functions for questions
window.onload = function quiz() {
  startButton.addEventListener("click", function beginQuiz() {
    const myQuestions = [
      {
        question: "Commonly used data types DO NOT include:",
        answers: { a: "strings", b: "booleans", c: "alerts", d: "numbers" },
        correctAnswer: "c"
      },
      {
        question:
          "The condition in an if / else statement is enclosed within ____.",
        answers: {
          a: "quotes",
          b: "curly brackets",
          c: "parentheses",
          d: "square brackets"
        },
        correctAnswer: "c"
      },
      {
        question: "HTML is what type of language?",
        answers: {
          a: "Scripting Language",
          b: "Markup Language",
          c: "Programming Language",
          d: "Network Protocol"
        },
        correctAnswer: "b"
      },
      {
        question:
          "To reference a style sheet across multiple HTML pages, how would you define your CSS?",
        answers: {
          a: "Inline Style",
          b: "Internal Style Sheet",
          c: "External Style Sheet",
          d: "CSS is meant for only one page"
        },
        correctAnswer: "c"
      },
      {
        question: "What does CSS stand for?",
        answers: {
          a: "Computing Style Sheet",
          b: "Creative Style Sheet",
          c: "Cascading Style Sheet",
          d: "Creative Style System"
        },
        correctAnswer: "c"
      }
    ];

    function buildQuiz() {
      // we'll need a place to store the HTML output
      const output = [];

      // for each question...
      myQuestions.forEach((currentQuestion, questionNumber) => {
        // we'll want to store the list of answer choices
        const answers = [];

        // and for each available answer...
        for (letter in currentQuestion.answers) {
          // ...add a button
          answers.push(
            `<label>
             <input type="button" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
           </label>`
          );
        }

        // add this question and its answers to the output
        output.push(`
        <div class="quiz">
           <div class="questionsContainer"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>
      `);
      });

      // finally combine our output list into one string of HTML and put it on the page
      questionsContainer.innerHTML = output.join("");
    }

    function showResults() {
      // gather answer containers from our quiz
      const answerContainers = questionsContainer.querySelectorAll(".answers");

      // keep track of user's answers
      let numCorrect = 0;

      // for each question...
      myQuestions.forEach((currentQuestion, questionNumber) => {
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {})
          .value;

        // if answer is correct
        if (userAnswer === currentQuestion.correctAnswer) {
          // add to the number of correct answers
          numCorrect++;

          // color the answers green
          answerContainers[questionNumber].style.color = "lightgreen";
        } else {
          // if answer is wrong or blank
          // color the answers red
          answerContainers[questionNumber].style.color = "red";
        }
      });

      // show number of correct answers out of total
      resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }

      const previousButton = document.getElementById("previous");
      const nextButton = document.getElementById("next");
      const slides = document.querySelectorAll(".slide");
      let currentSlide = 0;

    function showSlide(n) {
      slides[currentSlide].classList.remove("active-slide");
      slides[n].classList.add("active-slide");
      currentSlide = n;

      if (currentSlide === 0) {
        previousButton.style.display = "none";
      } else {
        previousButton.style.display = "inline-block";
      }

      if (currentSlide === slides.length - 1) {
        nextButton.style.display = "none";
        submitButton.style.display = "inline-block";
      } else {
        nextButton.style.display = "inline-block";
        submitButton.style.display = "none";
      }
    }

    function showNextSlide() {
      showSlide(currentSlide + 1);
    }

    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }

    const questionsContainer = document.getElementById("quizContainer");
    const resultsContainer = document.getElementById("results");
    const submitButton = document.getElementById("submit");

    // display quiz right away
    buildQuiz();

    showSlide(0);

    // on submit, show results
    submitButton.addEventListener("click", showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  });
  startButton.addEventListener("click", startQuiz);
  startButton.addEventListener("click", showQuestions);
};
