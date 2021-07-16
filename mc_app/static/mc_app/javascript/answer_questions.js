$(function(){
  var questionNumber = 0;
  var answerChoice;
  var alreadyAnswered = false;
  var postData = {};
  var selection;
  console.log(questions[0].fields.correctAnswer);
  showQuestion(questionNumber);


  document.getElementById("answer_a").onclick = function() {
    if (!alreadyAnswered){
      postData, selection = checkAnswer("answer_a");
      alreadyAnswered = true
    }
  };
  document.getElementById("answer_b").onclick = function() {
    if (!alreadyAnswered){
      postData, selection = checkAnswer("answer_b");
    }
  };
  document.getElementById("answer_c").onclick = function() {
    if (!alreadyAnswered){
        postData, selection = checkAnswer("answer_c");
    }
  };
  document.getElementById("answer_d").onclick = function() {
    if (!alreadyAnswered){
      postData, selection = checkAnswer("answer_d");
    }
  };

  document.getElementById("answer_form").onsubmit = function(e){
    console.log("We submitted!")
    e.preventDefault();
    var serializedData = $(this).serializeArray();
//    moreData = {'alreadyAnswered': alreadyAnswered, 'answerChoice': answerChoice}
//    serializedData.push({name: "alreadyAnswered", value: alreadyAnswered});
    serializedData.push({name: "id", value: postData["id"]});
    serializedData.push({name: "timesAnswered", value: postData["timesAnswered"]});
    serializedData.push({name: "timesAnsweredCorrectly", value: postData["timesAnsweredCorrectly"]});
    serializedData.push({name: "timesDistractor1", value: postData["timesDistractor1"]});
    serializedData.push({name: "timesDistractor2", value: postData["timesDistractor2"]});
    serializedData.push({name: "timesDistractor3", value: postData["timesDistractor3"]});
    serializedData.push({name: "timesDistractor4", value: postData["timesDistractor4"]});
    jQuery.ajax({
      type: 'POST',
      url: '/jsPunctuation/',
      data: $.param(serializedData),

      // data:
      //       {
      //         'areadyAnswered': alreadyAnswered,
      //         'answerChoice': answerChoice,
      //       },
      // dataType:'json',
      success: function(response) {
        console.log("It worked");
        questionNumber++;
        showQuestion(questionNumber);
        alreadyAnswered = false;
        selection.parentElement.style.color = "black";
      },
      error: function(response) {
        console.log("There was an error");
      }
    });
  }


  function checkAnswer(element) {
    selection = document.getElementById(element);
    answerChoice = selection.innerHTML;
    postData.timesDistractor1 = questions[questionNumber].fields.timesDistractor1;
    postData.timesDistractor2 = questions[questionNumber].fields.timesDistractor2;
    postData.timesDistractor3 = questions[questionNumber].fields.timesDistractor3;
    postData.timesDistractor4 = questions[questionNumber].fields.timesDistractor4;
    if (answerChoice==questions[questionNumber].fields.correctAnswer) {
      selection.parentElement.style.color = "green";
      postData.timesAnsweredCorrectly = questions[questionNumber].fields.timesAnsweredCorrectly + 1;
    } else {
      selection.parentElement.style.color = "red";
      if (answerChoice==questions[questionNumber].fields.distractor1) {
        postData.timesDistractor1++
      }
      if (answerChoice==questions[questionNumber].fields.distractor2) {
        postData.timesDistractor2++
      }
      if (answerChoice==questions[questionNumber].fields.distractor3) {
        postData.timesDistractor3++
      }
      if (answerChoice==questions[questionNumber].fields.distractor4) {
        postData.timesDistractor4++
      }
    }
    postData.id = questions[questionNumber].pk;
    postData.timesAnswered = questions[questionNumber].fields.timesAnswered + 1;
    return postData, selection;
  }

  function showQuestion(questionNumber) {
    topic = questions[questionNumber].fields.topic.toUpperCase();
    document.getElementById("topic").innerHTML = topic;
    document.getElementById("question").innerHTML = questions[questionNumber].fields.question;
    document.getElementById("answer_a").innerHTML = questions[questionNumber].fields.correctAnswer;
    document.getElementById("answer_b").innerHTML = questions[questionNumber].fields.distractor1;
    document.getElementById("answer_c").innerHTML = questions[questionNumber].fields.distractor2;
    document.getElementById("answer_d").innerHTML = questions[questionNumber].fields.distractor3;
  }

  function createPostData(){

  }
})
