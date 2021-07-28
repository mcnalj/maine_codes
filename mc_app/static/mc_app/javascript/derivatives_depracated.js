$(function(){
  var equation, answerEquation, coefficient, exponent, numerator, denominator, formattedCoefficient, acceptableAnswer, acceptableAnswerReduced, answeredCorrectly, negativeCoefficient, negativeExponent, fractionalExponent, fractionalCoefficients;
  // This is for plain Derivatives.
  //setEquation();
  // This is for derivatives with fractional COEFFICIENTS
  //setEquationWithFractionalCoefficients();
  //setEquationWithNegativeCoefficients();
//  setEquationWithNegativeExponents();
   [equation, exponentNumerator, exponentDenominator, coefficientNumerator, coefficientDenominator] = setMasterEquation();
   console.log(equation);
  document.getElementById("mathEquation").onsubmit = function(e){
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



  document.getElementById("answer_form").onsubmit = function(e){
    e.preventDefault();
    answeredCorrectly = false;
    if (document.getElementById("answerButton").innerText == 'SUBMIT') {
//      acceptableAnswer, acceptableAnswerReduced = convertCorrectAnswerToMathJax(numerator, denominator, exponent);
      acceptableAnswer, acceptableAnswerReduced = getAnswerMaster(exponentNumerator, exponentDenominator, coefficientNumerator, coefficientDenominator);
      var message = "";
      var messageColor = "green";
      answer = document.getElementById("answer").value.trim();
      // Removes interior whitespaces by splitting at a space and joining with nothing in-between.
      answer = answer.split(" ").join("");
      // If they type in anything other than numbers, and x and a ^ . . .
      if (answer.match(/[^x0-9^/]/)) {
        message = "Please enter in the form 1/3x^2 using only numbers, /, x and ^.";
        messageColor = "red";
      } else {
        answeredCorrectly = checkAnswerDerivativeWithFractionalCoefficients(acceptableAnswer, acceptableAnswerReduced, answer);
        if (answeredCorrectly) {
          correctAnswerUIChanges();
        } else {
          wrongAnswerUIChanges();
        }
      }
    } else { // This is a NEXT, not a SUBMIT
      equation = "";
      answerEquation = "";
      initializeUIForNextQuestion();
      setEquationWithFractionalCoefficients();
    }
  }


  function convertCorrectAnswerToMathJax(numerator, denominator, exponent){
    acceptableAnswer = '';
    acceptableAnswerReduced = '';
    answerNumerator = parseInt(numerator * exponent);
    reducedNumerator = numerator;
    reducedDenominator = denominator;
    fractionalCoefficient = convertFractionToUserAnswerFormat(answerNumerator, denominator);
    reducedNumerator, reducedDenominator = reduceFractionTwoDigits(answerNumerator, denominator);
    reducedFractionalCoefficient = convertFractionToUserAnswerFormat(reducedNumerator, reducedDenominator);
    if (exponent == 0) {
      acceptableAnswer = '0';
      acceptableAnswerReduced = '0';
    } else if (exponent == 1) {
      acceptableAnswer = fractionalCoefficient;
      acceptableAnswerReduced = reducedFractionalCoefficient;
    } else if (exponent == 2) {
      acceptableAnswer = fractionalCoefficient + 'x';
      acceptableAnswerReduced = reducedFractionalCoefficient + 'x';
    } else {
      acceptableAnswer = fractionalCoefficient + 'x^' + (exponent - 1).toString();
      acceptableAnswerReduced = reducedFractionalCoefficient + 'x^' + (exponent - 1).toString();
    }
    return acceptableAnswer, acceptableAnswerReduced;
  }

  function checkAnswerDerivativeWithFractionalCoefficients(acceptableAnswer, acceptableAnswerReduced, answer){
    answeredCorrectly = false;
    if (answer == acceptableAnswer || answer == acceptableAnswerReduced) {
      answeredCorrectly = true;
    }
    return answeredCorrectly;
  }

  function reduceFractionTwoDigits(answerNumerator, denominator) {
    reducedNumerator = answerNumerator;
    reducedDenominator = denominator;
    for (var i = 10; i>1; i--) {
      if (reducedNumerator % i == 0 && reducedDenominator % i == 0) {
        reducedNumerator = parseInt(reducedNumerator/i);
        reducedDenominator = parseInt(reducedDenominator/i);
      }
    }
    return reducedNumerator, reducedDenominator
  }

  function convertFractionToUserAnswerFormat(numerator, denominator) {
    var userEnteredFraction = '';
    if (denominator == 1) {
      userEnteredFraction = numerator.toString();
    } else {
      userEnteredFraction = numerator.toString() + '/' +  denominator.toString();
    }
    return userEnteredFraction;
  }


  function convertFractionToJaxCoefficient(numerator, denominator) {
    var jaxCofficient = '';
    if (denominator == 1) {
      jaxCoefficient = numerator.toString();
    } else {
      jaxCoefficient = '\\frac{' + numerator + '}{' + denominator + '}';
    }
    return jaxCoefficient;
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
    MathJax.typeset();
  }




  function initializeUIForNextQuestion() {
    message = "Correct!" // This will not be visisble, but keeps the space.
    document.getElementById("questionCard").classList.remove("border-success");
    document.getElementById("questionCard").classList.add("border-dark");
    document.getElementById("answer").classList.remove("bg-success");
    document.getElementById("answerMessage").style.visibility = "hidden";
    document.getElementById("answerMessage").innerHTML = message;
    document.getElementById("answer").value = "";
    document.getElementById('answer').focus();
    document.getElementById("answerButton").innerText = "SUBMIT";
  }

  function correctAnswerUIChanges(){
    message = "Yes, exactly!";
    messageColor = "green";
    document.getElementById("answerMessage").innerHTML = message;
    document.getElementById("answerMessage").style.color = messageColor;
    document.getElementById("answerMessage").style.visibility = "visible";
    document.getElementById("answerButton").innerText = "NEXT";
    document.getElementById("questionCard").classList.remove("border-dark");
    document.getElementById("questionCard").classList.remove("border-danger");
    document.getElementById("answer").classList.remove("bg-danger");
    document.getElementById("questionCard").classList.add("border-success");
    document.getElementById("answer").classList.add("bg-success");
  }

  function wrongAnswerUIChanges(){
    message = "Sorry, " + answer + " is not correct. Try again!";
    messageColor = "red";
    document.getElementById("answerMessage").innerHTML = message;
    document.getElementById("answerMessage").style.color = messageColor;
    document.getElementById("answerMessage").style.visibility = "visible";
    document.getElementById("questionCard").classList.remove("border-dark");
    document.getElementById("questionCard").classList.add("border-danger");
    document.getElementById("answer").classList.add("bg-danger");
    document.getElementById('answer').value = " ";
    document.getElementById('answer').focus();
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
    MathJax.typeset();
  }

  function setEquationWithFractionalCoefficients(){
    coefficient = '';
    formattedCoefficient = '';
    numerator = getRandomIntInclusive(1, 9);
    denominator = getRandomIntInclusive(1, 9);
    if (numerator % 2 == 0 && denominator % 2 == 0){
      numerator = parseInt(numerator/2);
      denominator = parseInt(denominator/2);
    } else {
      if (numerator % 3 == 0 && denominator % 3 == 0) {
        numerator = parseInt(numerator/3);
        denominator = parseInt(denominator/3);
      }
    }
    exponent = getRandomIntInclusive(0, 9);
    if (numerator == denominator) {
      formattedCoefficient = "";
      coefficient = '1';
    } else if (denominator == 1) {
      formattedCoefficient = numerator;
      coefficient = numerator.toString();
    } else {
      formattedCoefficient = '\\frac{' + numerator + '}{' + denominator + '}';
    }
    if (exponent == 0) {
      equation = '\\(f(x) = ' + formattedCoefficient + '\\)';
    } else if (exponent == 1) {
      equation = '\\(f(x) = ' + formattedCoefficient + 'x\\)';
    } else {
      equation = '\\(f(x) = ' + formattedCoefficient + 'x^' + exponent + '\\)';
    }
    document.getElementById("mathEquation").innerHTML = equation;
    MathJax.typeset();
  }

  function setEquationWithNegativeCoefficientsDepracated() {
    coefficient = getRandomIntInclusive(1, 9);
    exponent = getRandomIntInclusive(0, 9);
    negativeCoefficient = getRandomIntInclusive(0,1);
    console.log(coefficient)
    console.log(exponent)
    console.log(negativeCoefficient)
    if (negativeCoefficient == 1) {
      coefficient = parseInt(coefficient * -1)
    }
    if (exponent == 0) {
      console.log("exponent 0");
      equation = '\\(f(x) = ' + coefficient.toString() + '\\)';
    } else if (exponent == 1) {
      if (coefficient == 1) {
        equation = '\\(f(x) = x\\)';
      } else if (coefficient == -1) {
        equation = '\\(f(x) = -x\\)';
      } else {
        equation = '\\(f(x) = ' + coefficient.toString() + 'x\\)';
      }
    } else {
      if (coefficient == 1) {
        equation = '\\(f(x) = x^' + exponent + '\\)'
      } else if (coefficient == -1) {
        equation = '\\(f(x) = -x^' + exponent + '\\)'
      } else {
        console.log("got to coefficient and exponent")
        equation = '\\(f(x) = ' + coefficient + 'x^' + exponent + '\\)';
      }
    }
    document.getElementById("mathEquation").innerHTML = equation;
    MathJax.typeset();
  }

  function setEquationWithNegativeCoefficients() {
    prefix = '\\(f(x) = ';
    suffix = '\\)';
    expression = '';
    coefficient = getRandomIntInclusive(1, 9);
    exponent = getRandomIntInclusive(0, 9);
    if (exponent == 0) {
      expression = coefficient.toString()
    } else if (exponent == 1) {
      if (coefficient == 1) {
        expression = 'x';
      } else {
        expression = coefficient.toString() + 'x';
      }
    } else {
      if (coefficient == 1) {
        expression = 'x^' + exponent.toString();
      } else {
        expression = coefficient.toString() + 'x^' + exponent.toString();
      }
    }
    negativeCoefficient = getRandomIntInclusive(0,1);
    if (negativeCoefficient == 1) {
      expression = '-' + expression;
    }
    equation = prefix + expression + suffix;
    document.getElementById("mathEquation").innerHTML = equation;
    MathJax.typeset();
  }

  function setEquationWithNegativeExponents() {
    negativeExponent = 0;
    prefix = '\\(f(x) = ';
    suffix = '\\)';
    expression = '';
    coefficient = getRandomIntInclusive(1, 9);
    console.log(coefficient);
    exponent = getRandomIntInclusive(0, 9);
    console.log(exponent);
    xTerm = 'x';
    if (exponent == 0) {
      expression = coefficient.toString()
    } else if (exponent == 1) {
      if (coefficient == 1) {
        xTerm = 'x';
      } else {
        expression = coefficient.toString();
        xTerm = 'x';
      }
    } else {
      if (coefficient == 1) {
        xTerm = 'x^' + exponent.toString();
      } else {
        expression = coefficient.toString()
        xTerm = 'x^' + exponent.toString();
      }
    }
    if (exponent > 0) {
//        negativeExponent = getRandomIntInclusive(0,1);
          negativeExponent = 1;
    }
    if (negativeExponent == 1) {
      if (coefficient == 1){
          expression = '\\frac{1}{' + xTerm + '}';
      } else {
          expression = '\\frac{' + expression + '}{' + xTerm + '}';
      }
    } else {
      if (exponent > 0) {
        expression = expression + xTerm;
      }
    }
    console.log(coefficient);
    console.log(xTerm);
    console.log(expression);
    equation = prefix + expression + suffix;
    document.getElementById("mathEquation").innerHTML = equation;
    console.log(equation);
    MathJax.typeset();
  }



  function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


  function convertCorrectAnswerToMathJaxNegativeExponentNoFraction(coefficient, exponent, negativeExponent){
    acceptableAnswer = '';
    answerCoefficient = '';
    if (exponent == 0) {
      acceptableAnswer = '0';
    } else if (exponent > 0) {
      answerCoefficient = parseInt(coefficient * -1);
      answerExponent = parseInt(exponent + 1);
      acceptableAnswer = '\\frac{' + answerCoefficient.toString() + '}{x^' + exponent.toString()+ '}';
    }
    return acceptableAnswer;
  }

  function setMasterEquation() {
    var negativeCoefficient, fractionalCoefficient, negativeExponent, fractionalExponent, exponentNumerator, exponentDenominator, coefficientNumerator, coefficientDenominator, equationJax;
    var coefficientJax = '';
    var xTermJax = '';
    [negativeCoefficient, fractionalCoefficient, negativeExponent, fractionalExponent] = setEquationParameters();
    console.log(negativeCoefficient);
    [exponentNumerator, exponentDenominator] = getNumeratorAndDenominator();
    if (fractionalExponent) {
      if (exponentDenominator == 2) {
        if (exponentNumerator == 1) {
          xTermJax = '\\sqrt{x}';
        } else {
          xTermJax = '\\sqrt{x^' + exponentNumerator.toString() + '}';
        }
      } else {
        if (exponentNumerator == 1) {
          xTermJax = '\\sqrt[' + exponentDenominator.toString() + ']{x}';
        } else {
          xTermJax = '\\sqrt[' + exponentDenominator.toString() + ']{x^' + exponentNumerator.toString() + '}';
        }
      }
    }
    else {
      if (exponentNumerator == 1) {
          xTermJax = 'x';
      } else {
          xTermJax = 'x^' + exponentNumerator.toString();
      }
    }
    [coefficientNumerator, coefficientDenominator] = getNumeratorAndDenominator();
    if (negativeExponent) {
      if (fractionalCoefficient) {
        equationJax = '\\frac{' + coefficientNumerator.toString() + '}{' + coefficientDenominator.toString() + xTermJax + '}';
      } else {
        equationJax = '\\frac{' + coefficientNumerator.toString() + '}{' + xTermJax + '}';
      }
    } else {
      if (fractionalCoefficient){
        coefficientJax = fractionToJax(coefficientNumerator, coefficientDenominator);
        equationJax = coefficientJax + xTermJax;
      } else {
        if (coefficientNumerator == 1) {
          equationJax = xTermJax;
        } else {
          equationJax = coefficientNumerator.toString() + xTermJax;
        }
      }
    }
    if (negativeCoefficient) {
      equationJax = '\\(f(x) = -' + equationJax + '\\)';
    } else {
      equationJax = '\\(f(x) = ' + equationJax + '\\)';
    }
    document.getElementById("mathEquation").innerHTML = equationJax;
    MathJax.typeset();
    return [equationJax, exponentNumerator, exponentDenominator, coefficientNumerator, coefficientDenominator];
  }

  function getAnswerMaster(exponentNumerator, exponentDenominator, coefficientNumerator, coefficientDenominator) {
    if (!negativeExponent && !fractionalExponent) {
      acceptableAnswer, acceptableAnswerReduced = getAnswerJaxForPositiveIntegerExponents(exponentNumerator, coefficientNumerator, coefficientDenominator);
    } else if (!fractionalExponents){
      acceptableAnswer, acceptableAnswerReduced = getAnswerJaxForNegativeIntegerExponents(exponentNumerator, coefficientNumerator, coefficientDenominator);
    }
    return [acceptableAnswer, acceptableAnswerReduced];
  }


  function getAnswerJaxForPositiveIntegerExponents(exponentNumerator, coefficientNumerator, coefficientDenominator){
    var answerCoefficientNumerator, answerCoefficientNumeratorReduced, answerCoefficientDenominator, answerCoefficientDenominator, answerExponent, answerXTerm, answerCoefficientJax, answerJax, asnswerJaxReduced;
    answerCoefficientNumerator = parseInt(coefficientNumerator * exponentNumerator)
    answerExponent = exponentNumerator - 1;
    answerXTerm = getAnswerXTerm(answerExponent);
    if (fractionalCoefficients) {
      [answerCoefficientNumeratorReduced, answerCoefficientDenominatorReduced] = reduceFraction(answerCoefficientNumerator, answerCoefficientNumerator);
      if (answerCoefficientDenominator == 1) {
        answerJax = answerCoefficientNumerator.toString() + answerXTerm;
        answerJaxReduced = answerCoefficientNumeratorReduced.toString() + answerXTerm;
      } else {
        answerJax = answerCoefficientNumerator.toString() + '/' + answerCoefficientDenominator + answerXTerm;
        answerJaxReduced = answerCoefficientNumeratorReduced.toString() + '/' + answerCoefficientDenominatorReduced.toString() + answerXTerm;
      }
    } else {
      answerJax = answerCoefficientNumerator.toString() + answerXTerm;
      answerJaxReduced = answerCoefficientNumerator.toString() + answerXTerm;
    }
    if (negativeCoefficient){
      answerJax = '-' + answerJax;
      answerJaxReduced = '-' + answerJaxReduced;
    }
    return [answerJax, answerJaxReduced];
  }


  function getAnswerJaxForNegativeIntegerExponents(exponentNumerator, coefficientNumerator, coefficientDenominator){
    var answerCoefficientNumerator, answerCoefficientNumeratorReduced, answerCoefficientDenominator, answerCoefficientDenominator, answerExponent, answerXTerm, answerCoefficientJax, answerJax, asnswerJaxReduced;
    answerExponent = exponentNumerator + 1;
    answerXTerm = getAnswerXTerm(answerExponent);
    if (fractionalCoefficients) {
      [answerCoefficientNumeratorReduced, answerCoefficientDenominatorReduced] = reduceFraction(answerCoefficientNumerator, answerCoefficientNumerator);
      if (answerCoefficientDenominator == 1) {
        answerJax = answerCoefficientNumerator.toString() + '/' + answerXTerm;
        answerJaxReduced = answerCoefficientNumeratorReduced.toString() + '/' + answerXTerm;
      } else {
        answerJax = answerCoefficientNumerator.toString() + '/(' + answerCoefficientDenominator.toString() + answerXTerm  + ')';
        answerJaxReduced = answerCoefficientNumeratorReduced.toString() + '/(' + answerCoefficientDenominatorReduced.toString() + answerXTerm + ')';
      }
    } else {
      answerJax = answerCoefficientNumerator.toString() + '/' + answerXTerm;
      answerJaxReduced = answerCoefficientNumerator.toString() + '/' + answerXTerm;
    }
    if (negativeCoefficient){
      answerJax = '-' + answerJax;
      answerJaxReduced = '-' + answerJaxReduced;
    }
    return [answerJax, answerJaxReduced];
  }

  function getAnswerXTerm(answerExponent){
    if (answerExponent == 0) {
      answerXTerm = '';
    } else if (answerExponent == 1) {
      answerXTerm = 'x';
    } else {
      answerXTerm = 'x^' + answerExponent.toString();
    }
    return answerXTerm;
  }



  function setEquationParameters(){
    var negativeCoefficient = 0;
    var fractionalCoefficient = 1;
    var negativeExponent = 1;
    var fractionalExponent = 0;
    return [negativeCoefficient, fractionalCoefficient, negativeExponent, fractionalExponent];
  }

  function getNumeratorAndDenominator() {
    var numerator = 1;
    var denominator = 1;
    while (numerator == denominator) {
      numerator = getRandomIntInclusive(1, 9);
      denominator = getRandomIntInclusive(2, 9);
    }
    [numerator, denomminator] = reduceFraction(numerator, denominator);
    return [numerator, denominator];
  }

  function reduceFraction(numerator, denominator) {
    reducedNumerator = numerator;
    reducedDenominator = denominator;
    for (var i = 10; i>1; i--) {
      if (reducedNumerator % i == 0 && reducedDenominator % i == 0) {
        reducedNumerator = parseInt(reducedNumerator/i);
        reducedDenominator = parseInt(reducedDenominator/i);
      }
    }
    return [reducedNumerator, reducedDenominator]
  }

  function fractionToJax(numerator, denominator) {
    jaxFraction = '\\frac{' + numerator + '}{' + denominator + '}';
    return jaxFraction;
  }

  // This clears the correct or incorrect styling on the answer input when the user strates typing.
  document.getElementById("answer").oninput = function(){
    message = "Correct!" // This will not be visisble, but keeps the space.
    document.getElementById("questionCard").classList.remove("border-danger");
    document.getElementById("questionCard").classList.add("border-dark");
    document.getElementById("answer").classList.remove("bg-danger");
    document.getElementById("answerMessage").style.visibility = "hidden";
    document.getElementById("answerMessage").innerHTML = message;
  };


}) // end document.ready()
