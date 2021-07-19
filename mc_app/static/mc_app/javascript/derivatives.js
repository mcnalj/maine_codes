$(function(){
  var equation, answerEquation, coefficient, exponent
  setEquation();

  // document.getElementById("answer").onclick = function(e){
  //   document.getElementById("answer").style.placeholder = "".
  // }

  document.getElementById("answer_form").onsubmit = function(e){
    e.preventDefault();
    if (document.getElementById("answerButton").innerText == 'SUBMIT') {
      console.log("In the SUBMIT")
      var message = "";
      var messageColor = "green";
      answer = document.getElementById("answer").value.trim();
      // Removes interior whitespaces by splitting at a space and joining with nothing in-between.
      answer = answer.split(" ").join("");
      console.log(answer);
      // If they type in anything other than numbers, and x and a ^ . . .
      if (answer.match(/[^x0-9^]/)) {
        console.log(answer);
        message = "Please enter in the form 3x^2 using only numbers, x and ^.";
        messageColor = "red";
      // Id they exponent is zero, it's the derivative of a constant.
      } else if (exponent == 0) {
        if (answer == 0) {
            message = "Correct! The derivative of a constant is always 0.";
            messageColor = "green";
        } else {
            message = "Incorrect. The derivative of a constant is always 0.";
            messageColor = "red";
        }
      } else if (exponent == 1) {
        if (answer == coefficient) {
          message = "Yes, that is correct!";
          messageColor = "green";
        } else {
          message = "Sorry, the correct answer is " + coefficient + ".";
          messageColor = "red";
        }
      } else if (exponent == 2) {
        if (answer.search(/[x]/) == -1) {
          message = "You entered an answer with no 'x'. Try again."
          messageColor = "red";
        } else {
          answerArray = answer.split("x");
          console.log(answerArray.length);
          console.log(answerArray)
          if ((answerArray[0] == (coefficient * exponent)) && (answerArray[1] == '^1')) {
            message = "Yes, you are correct (and you do not need to write the '1'))";
            mesageColor = "green";
          } else if ((answerArray[0] == coefficient * exponent) && !answerArray[2]) {
            message = "Yes, you are correct!";
            mesageColor = "green";
          } else {
            message = "Sorry, " + answer + " is not correct. Try again!";
            messageColor = "red";
            document.getElementById('answer').value = " ";
          }
        }
      } else {
        if (answer.search(/[x]/) == -1) {
          message = "You entered an answer with no 'x'. Try again."
          messageColor = "red";
        } else {
          answerArray = answer.split("x");
          if ((answerArray[0] == (coefficient * exponent)) && (answerArray[1].substring(1) == (exponent - 1))){
            message = "Yes, exactly!";
            messageColor = "green";
          } else {
            message = "Sorry, " + answer + " is not correct. Try again!";
            messageColor = "red";
            document.getElementById('answer').value = " ";
          }
        }
      }
      document.getElementById("answerMessage").innerHTML = message;
      document.getElementById("answerMessage").style.color = messageColor;
      document.getElementById("answerMessage").style.visibility = "visible";
      if (messageColor == "green") {
        document.getElementById("answerButton").innerText = "NEXT";
        document.getElementById("questionCard").classList.remove("border-dark");
        document.getElementById("questionCard").classList.add("border-success");
        document.getElementById("answer").classList.add("bg-success");
      } else {
        // document.getElementById("questionCard").classList.remove("border-dark");
        // document.getElementById("questionCard").classList.add("border-danger");
        // document.getElementById("answer").classList.add("bg-danger");
      }
    } else {
      equation = "";
      answerEquation = "";
      message = "Correct!"
      document.getElementById("questionCard").classList.remove("border-success");
      document.getElementById("questionCard").classList.add("border-dark");
      document.getElementById("answer").classList.remove("bg-success");
      document.getElementById("answerMessage").style.visibility = "hidden";
      document.getElementById("answerMessage").innerHTML = message;
      document.getElementById("answer").value = "";
      document.getElementById("answerButton").innerText = "SUBMIT";
      setEquation();
    }
    // Trying to display their answer in latex but it doesn't work.
    // answerEquation = '\\(' + answer + '\\)';
    // console.log(answerEquation);
    // document.getElementById("answer").innerHTML = answerEquation;
  }

  function setEquation(){
    coefficient = getRandomIntInclusive(1, 9);
    exponent = getRandomIntInclusive(0, 9);
    if (exponent == 0) {
      equation = '\\(f(x) = ' + coefficient + '\\)';
    } else if (exponent == 1) {
      if (coefficient == 1) {
        equation = '\\(f(x) = x\\)';
      } else {
        equation = '\\(f(x) = ' + coefficient + 'x\\)';
      }
    } else {
      if (coefficient == 1) {
        equation = '\\(f(x) = x^' + exponent + '\\)'
      } else {
        equation = '\\(f(x) = ' + coefficient + 'x^' + exponent + '\\)';
      }
    }
    document.getElementById("mathEquation").innerHTML = equation;
    // MathJax.Hub.Queue(function() {
    //   var math = MathJax.Hub.getAllJax("mathEquation")[0];
    // });
    // MathJax.Hub.Queue(["Text", math, equation]);
    MathJax.typeset();
  }

  function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
})
