$(function(){
  var equation, answerEquation, coefficient, coefficientNumerator, coefficientDenominator, exponent, exponentNumerator, exponentDenominator, numerator, denominator, formattedCoefficient, acceptableAnswer, acceptableAnswerReduced, answeredCorrectly, negativeCoefficient, fractionalCoefficient, negativeExponent, fractionalExponent;
  skillFields.timesAttempted = skillFields.timesAttempted + 1;
  var streak = 0;
  var correctAnswers = 0;
  var masteredSkill, skillMaxCorrect
  [masteredSkill, skillMaxCorrect] = getMasteryFieldsForProgress()
  [equation, exponentNumerator, exponentDenominator, coefficientNumerator, coefficientDenominator] = setMasterEquation();

  document.getElementById("answer_form").onsubmit = function(e){
    e.preventDefault();
    answeredCorrectly = false;
    var serializedData = $(this).serializeArray();
    if (document.getElementById("answerButton").innerText == 'SUBMIT') {
      [acceptableAnswer, acceptableAnswerReduced] = getAnswerMaster(exponentNumerator, exponentDenominator, coefficientNumerator, coefficientDenominator);
      var message = "";
      var messageColor = "green";
      answer = document.getElementById("answer").value.trim();
      // Removes interior whitespaces by splitting at a space and joining with nothing in-between.
      answer = answer.split(" ").join("");
      // If they type in anything other than numbers, and x and a ^ . . .
      if (answer.match(/[^-x0-9^/()]/)) {
        console.log("got to the message")
        message = "Please enter in the form 5x^2 or -1/(3x^2) using only numbers, /, x, -, and ^.";
        messageColor = "red";
        document.getElementById("answerMessage").innerHTML = message;
        document.getElementById("answerMessage").style.color = messageColor;
        document.getElementById("answerMessage").style.visibility = "visible";
      } else {
        answeredCorrectly = compareAnswerWithEnteredAnswer(acceptableAnswer, acceptableAnswerReduced, answer);
        if (answeredCorrectly) {
          streak = streak + 1;
          if (streak > skillFields.longestStreak){
            skillFields.longestStreak = streak
          }
          if (streak > progressFields.longestStreak) {
            progressFields.longestStreak = streak
          }
          correctAnswers = correctAnswers + 1
          progressFields.totalQuestionsAnsweredCorrectly = progressFields.totalQuestionsAnsweredCorrectly + 1
          if (correctAnswers > skillMaxCorrect) {
            skillMaxCorrect = skillMaxCorrect + 1
          }
//          if (correctAnswers >= skillFields.numberNeededForMastery && streak >= skillFields.consecutiveNeededForMastery){
          if (correctAnswers >= 2) {
            masteredRoutine(serializedData);
          } else {
          correctAnswerUIChanges();
        }

        } else {
          wrongAnswerUIChanges();
          streak = 0;
        }
      }
    } else { // This is a NEXT, not a SUBMIT
      equation = "";
      answerEquation = "";
      initializeUIForNextQuestion();
      setMasterEquation();
      skillFields.totalQuestionsAsked = skillFields.totalQuestionsAsked + 1;
      progressFields.totalQuestionsAttempted = progressFields.totalQuestionsAttempted + 1
    }
  }

  function masteredRoutine(serializedData){
    skillFields.timesMastered = skillFields.timesMastered + 1;
    skillFields.totalQuestionsAnsweredCorrectly = skillFields.totalQuestionsAnsweredCorrectly + correctAnswers;
    skillFields.percentCorrect = parseInt((skillFields.totalQuestionsAnsweredCorrectly/skillFields.totalQuestionsAsked) * 100)
    serializedData.push({name: "skillName", value: skillFields["skillName"]});
    serializedData.push({name: "timesAttempted", value: skillFields["timesAttempted"]});
    serializedData.push({name: "timesMastered", value: skillFields["timesMastered"]});
    serializedData.push({name: "totalQuestionsAsked", value: skillFields["totalQuestionsAsked"]});
    serializedData.push({name: "totalQuestionsAnsweredCorrectly", value: skillFields["totalQuestionsAnsweredCorrectly"]});
    serializedData.push({name: "longestStreak", value: skillFields["longestStreak"]});
    serializedData.push({name: "percentCorrect", value: skillFields["percentCorrect"]});
    if (!masteredSkill) {
      masteredSkill = true
      var masteryName = "mastered" + skillFields["skillName"]
      serializedData.push({name: masteryName, value: masteredSkill});
    }
    progressFields["totalSkillsMastered"] = progressFields["totalSkillsMastered"] + 1
    serializedData.push({name: "totalSkillsMastered", value: progressFields["totalSkillsMastered"]});
    serializedData.push({name: "progressTotalQuestionsAttempted", value: progressFields["totalQuestionsAttempted"]});
    serializedData.push({name: "progressTotalQuestionsAnsweredCorrectly", value: progressFields["totalQuestionsAnsweredCorrectly"]});
    serializedData.push({name: "progressLongestStreak", value: progressFields["longestStreak"]});
    progressFields.percentCorrect = parseInt((progressFields.totalQuestionsAnsweredCorrectly/progressFields.totalQuestionsAttempted) * 100)
    serializedData.push({name: "progressPercentCorrect", value: progressFields["percentCorrect"]});

    serializedData.push({name: "progressMaxCorrect", value: skillMaxCorrect});

    jQuery.ajax({
      type: 'POST',
      url: '/masteredRoutine/',
      data: $.param(serializedData),
      success: function(response) {
        console.log("It worked");
        streak = 0;
        correctAnswers = 0;
        //go to skill choice, show something on UI
      },
      error: function(response) {
        console.log("There was an error");
      }
    });
  }

  function getMasteryFieldsForProgress(){
    if (skillFields.skillName == 'basicDerivatives') {
      masteredSkill = progressFields.masteredBasicDerivatives
      skillMaxCorrect = progressFields.basicDerivativesMaxCorrect
    } else if (skillFields.skillName == 'negativeCoefficients') {
      masteredSkill = progressFields.masteredNegativeCoefficients
      skillMaxCorrect = progressFields.negativeCoefficientsMaxCorrect
    } else if (skillFields.skillName == 'fractionalCoefficients') {
        masteredSkill = progressFields.masteredFractionalCoefficients
        skillMaxCorrect = progressFields.fractionalCoefficientsMaxCorrect
    } else if (skillFields.skillName == 'basicMix') {
        masteredSkill = progressFields.masteredBasicMix
        skillMaxCorrect = progressFields.basicMixMaxCorrect
    } else if (skillFields.skillName == 'negativeExponents') {
        masteredSkill = progressFields.masteredNegativeExponents
        skillMaxCorrect = progressFields.negativeExponentsMaxCorrect
    } else if (skillFields.skillName == 'fractionalExponents') {
        masteredSkill = progressFields.masteredFractionalExponents
        skillMaxCorrect = progressFields.fractionalExponentsMaxCorrect
    } else if (skillFields.skillName == 'advancedMix') {
        masteredSkill = progressFields.masteredAdvancedMix
        skillMaxCorrect = progressFields.advancedMixMaxCorrect
    }
    return [masteredSkill, skillMaxCorrect]
  }

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
