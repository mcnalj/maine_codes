$(function(){
  var equation, answerEquation, coefficient, coefficientNumerator, coefficientDenominator, exponent, exponentNumerator, exponentDenominator, numerator, denominator, formattedCoefficient, acceptableAnswer, acceptableAnswerReduced, answeredCorrectly, negativeCoefficient, fractionalCoefficient, negativeExponent, fractionalExponent;
  console.log(negativeCoefficient);
  [equation, exponentNumerator, exponentDenominator, coefficientNumerator, coefficientDenominator] = setMasterEquation();

  document.getElementById("answer_form").onsubmit = function(e){
    e.preventDefault();
    answeredCorrectly = false;
    if (document.getElementById("answerButton").innerText == 'SUBMIT') {
      [acceptableAnswer, acceptableAnswerReduced] = getAnswerMaster(exponentNumerator, exponentDenominator, coefficientNumerator, coefficientDenominator);
      console.log("Acceptable Answer Reduced");
      console.log(acceptableAnswerReduced)
      console.log("Acceptable Answer");
      console.log(acceptableAnswer)
      var message = "";
      var messageColor = "green";
      answer = document.getElementById("answer").value.trim();
      console.log("answer: " + answer);
      // Removes interior whitespaces by splitting at a space and joining with nothing in-between.
      answer = answer.split(" ").join("");
      // If they type in anything other than numbers, and x and a ^ . . .
      if (answer.match(/[^-x0-9^/()]/)) {
        console.log("in the answer match weirdness")
        message = "Please enter in the form 1/3x^2 using only numbers, /, x and ^.";
        messageColor = "red";
        // Need to make this message appear.
      } else {
        answeredCorrectly = compareAnswerWithEnteredAnswer(acceptableAnswer, acceptableAnswerReduced, answer);
        // "Stopped here on Monday night."
        console.log("answeredCorrectly")
        console.log(answeredCorrectly)
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
      setMasterEquation();
    }
  }

  // function setEquationParameters(){
  //   negativeCoefficient = 1;
  //   fractionalCoefficient = 1;
  //   negativeExponent = 1;
  //   fractionalExponent = 1;
  //   return [negativeCoefficient, fractionalCoefficient, negativeExponent, fractionalExponent];
  // }

  function setMasterEquation() {
    negativeCoefficient = 0;
    fractionalCoefficient = 0;
    negativeExponent = 0;
    fractionalExponent = 0;
    var coefficientJax = '';
    var xTermJax = '';
    var equationJax = '';
    [negativeCoefficient, fractionalCoefficient, negativeExponent, fractionalExponent] = getTypeOfEquation();
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

  function getTypeOfEquation() {
    if (negativeCoefficients == 1) {
      if (Math.random() >= 0.5){
        negativeCoefficient = 1
      }
    }
    if (fractionalCoefficients == 1) {
      if (Math.random() >= 0.5){
        fractionalCoefficient = 1
      }
    }
    if (negativeExponents == 1) {
      if (Math.random() >= 0.5){
        negativeExponent = 1
      }
    }
    if (fractionalExponents == 1) {
      if (Math.random() >= 0.5){
        fractionalExponent = 1
      }
    }
    return [negativeCoefficient, fractionalCoefficient, negativeExponent, fractionalExponent];
  }

  function compareAnswerWithEnteredAnswer(acceptableAnswer, acceptableAnswerReduced, answer){
    answeredCorrectly = false;
    if (answer == acceptableAnswer || answer == acceptableAnswerReduced) {
      answeredCorrectly = true;
    }
    console.log("got here");
    return answeredCorrectly;
  }

  function getAnswerMaster(exponentNumerator, exponentDenominator, coefficientNumerator, coefficientDenominator) {
    if (!negativeExponent && !fractionalExponent) {
      [acceptableAnswer, acceptableAnswerReduced] = getAnswerJaxForPositiveIntegerExponents(exponentNumerator, coefficientNumerator, coefficientDenominator);
    } else if (!fractionalExponent){
      [acceptableAnswer, acceptableAnswerReduced] = getAnswerJaxForNegativeIntegerExponents(exponentNumerator, coefficientNumerator, coefficientDenominator);
    } else {
      [acceptableAnswer, acceptableAnswerReduced] = getAnswerJaxForAllFractionalExponents(exponentNumerator, exponentDenominator, coefficientNumerator, coefficientDenominator);
    }
    return [acceptableAnswer, acceptableAnswerReduced];
  }

  function getAnswerJaxForPositiveIntegerExponents(exponentNumerator, coefficientNumerator, coefficientDenominator){
    var answerCoefficientNumerator, answerCoefficientNumeratorReduced, coefficientDenominatorReduced, answerExponent, answerXTerm, answerJax, asnswerJaxReduced;
    answerCoefficientNumerator = parseInt(coefficientNumerator * exponentNumerator)
    answerExponent = exponentNumerator - 1;
    answerXTerm = getAnswerXTerm(answerExponent);
    if (fractionalCoefficient) {
      [answerCoefficientNumeratorReduced, coefficientDenominatorReduced] = reduceFraction(answerCoefficientNumerator, coefficientDenominator);
      if (coefficientDenominator == 1) {
        answerJax = coefficientNumerator.toString() + answerXTerm;
        if (coefficientDenominatorReduced == 1) {
          answerJaxReduced = answerCoefficientNumeratorReduced.toString() + answerXTerm;
          if (answerCoefficientNumeratorReduced == 1) {
            answerJaxReduced = answerXTerm;
          }
        }
      } else {
        answerJax = answerCoefficientNumerator.toString() + '/' + coefficientDenominator + answerXTerm;
        answerJaxReduced = answerCoefficientNumeratorReduced.toString() + '/' + coefficientDenominatorReduced.toString() + answerXTerm;
        if (coefficientDenominatorReduced == 1) {
          answerJaxReduced = answerCoefficientNumeratorReduced.toString() + answerXTerm;
          if (answerCoefficientNumeratorReduced == 1) {
            answerJaxReduced = answerXTerm;
          }
        }
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
    var answerCoefficientNumerator, answerCoefficientNumeratorReduced, coefficientDenominatorReduced, answerExponent, answerXTerm, answerJax, answerJaxReduced;
    answerCoefficientNumerator = parseInt(coefficientNumerator * exponentNumerator * 1)
    answerExponent = exponentNumerator + 1;
    answerXTerm = getAnswerXTerm(answerExponent);
    if (fractionalCoefficient) {
      [answerCoefficientNumeratorReduced, coefficientDenominatorReduced] = reduceFraction(answerCoefficientNumerator, coefficientDenominator);
      if (coefficientDenominator == 1) {
        answerJax = answerCoefficientNumerator.toString() + '/' + answerXTerm;
        answerJaxReduced = answerCoefficientNumeratorReduced.toString() + '/' + answerXTerm;
        if (coefficientDenominatorReduced == 1){
          answerJaxReduced = answerCoefficientNumeratorReduced.toString() + '/' + answerXTerm;
        }
      } else {
        answerJax = answerCoefficientNumerator.toString() + '/(' + coefficientDenominator.toString() + answerXTerm  + ')';
        answerJaxReduced = answerCoefficientNumeratorReduced.toString() + '/(' + coefficientDenominatorReduced.toString() + answerXTerm + ')';
        if (coefficientDenominatorReduced == 1){
          answerJaxReduced = answerCoefficientNumeratorReduced.toString() + '/' + answerXTerm;
        }
      }
    } else {
      answerJax = answerCoefficientNumerator.toString() + '/' + answerXTerm;
      answerJaxReduced = answerCoefficientNumerator.toString() + '/' + answerXTerm;
    }
    if (!negativeCoefficient){
      answerJax = '-' + answerJax;
      answerJaxReduced = '-' + answerJaxReduced;
    }
    return [answerJax, answerJaxReduced];
  }

  function getAnswerJaxForAllFractionalExponents(exponentNumerator, exponentDenominator, coefficientNumerator, coefficientDenominator){
    console.log(exponentDenominator)
    console.log(coefficientDenominator)
    var answerCoefficientNumerator, answerCoefficientNumeratorReduced, answerCoefficientDenominator, answerCoefficientDenominatorReduced, answerExponentNumerator, answerExponentDenominator, answerXTerm, answerJax, answerJaxReduced;
    var exponentNowNegative = 0;
    if (!fractionalCoefficient) {
      coefficientDenominator = 1;
    }
    answerCoefficientNumerator = parseInt(coefficientNumerator * exponentNumerator)
    answerCoefficientDenominator = parseInt(coefficientDenominator * exponentDenominator)
    console.log(answerCoefficientDenominator);
    [answerCoefficientNumeratorReduced, answerCoefficientDenominatorReduced] = reduceFraction(answerCoefficientNumerator, answerCoefficientDenominator);
    console.log(answerCoefficientDenominatorReduced)
    if (negativeExponent) {
      answerExponentNumerator = exponentNumerator + exponentDenominator;
    } else {
      answerExponentNumerator = exponentNumerator - exponentDenominator;
      if (answerExponentNumerator < 1) {
        exponentNowNegative = 1
        answerExponentNumerator = parseInt(answerExponentNumerator * -1);
      }
    }
    answerXTerm = getAnswerXTermFractionalExponent(answerExponentNumerator, exponentDenominator);
    if (!negativeExponent && !exponentNowNegative) {
      answerJax = answerCoefficientNumerator.toString() + '/' + answerCoefficientDenominator.toString() + answerXTerm;
      answerJaxReduced = answerCoefficientNumeratorReduced.toString() + '/' + answerCoefficientDenominatorReduced.toString() + answerXTerm;
      if (answerCoefficientDenominatorReduced == 1){
        answerJaxReduced = answerCoefficientNumeratorReduced.toString() + answerXTerm;
      }
    } else {
      console.log
      answerJax = answerCoefficientNumerator.toString() + '/(' + answerCoefficientDenominator.toString() + answerXTerm + ')';
      answerJaxReduced = answerCoefficientNumeratorReduced.toString() + '/(' + answerCoefficientDenominatorReduced.toString() + answerXTerm + ')';
      if (answerCoefficientDenominatorReduced == 1){
        answerJaxReduced = answerCoefficientNumeratorReduced.toString() + '/(' + answerXTerm + ')';
      }
    }
    if ((negativeExponent & !negativeCoefficient) || (negativeCoefficient & !negativeExponent)){
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

  function getAnswerXTermFractionalExponent(answerExponentNumerator, exponentDenomonator){
    answerXTerm = 'x^' + answerExponentNumerator.toString() + '/' + exponentDenomonator.toString();
    return answerXTerm;
  }

  function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function getNumeratorAndDenominator() {
    numerator = 1;
    denominator = 1;
    while (numerator == denominator) {
      numerator = getRandomIntInclusive(1, 9);
      denominator = getRandomIntInclusive(2, 9);
    }
    [numerator, denomminator] = reduceFraction(numerator, denominator);
    return [numerator, denominator];
  }

  function reduceFraction(numerator, denominator) {
    var reducedNumerator = numerator;
    var reducedDenominator = denominator;
    for (var i = 10; i>1; i--) {
      if (reducedNumerator % i == 0 && reducedDenominator % i == 0) {
        reducedNumerator = parseInt(reducedNumerator/i);
        reducedDenominator = parseInt(reducedDenominator/i);
      }
    }
    console.log(reducedDenominator)
    return [reducedNumerator, reducedDenominator]
  }

  function fractionToJax(numerator, denominator) {
    jaxFraction = '\\frac{' + numerator + '}{' + denominator + '}';
    return jaxFraction;
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
