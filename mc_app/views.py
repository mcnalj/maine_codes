from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.core import serializers

from json import dumps

from .models import JavaScriptPunctuation
from .models import DerivativesSkills
from .models import UsersLatestSession
from .models import UserProgress

from .forms import SelectSkillsForm


"""Next Steps: some of the percents on the DB are hard to get"""
"""is there a way to rationalize the mastered fields on the DB to make the code easier"""
"""Need a view progress page"""
"""Need to allow more choices of skills"""
"""Need to think about how the machine progresses to give you greater challenges."""
"""Need to give UI experience for when you've mastered a topc"""
"""Need a score/progress bar on the problems card"""
"""Need to create a UserProgress card when the user registers"""
"""Need to style all pages associated with the USER app"""
"""Need to host with DreamHost"""
"""Need to connect Google Sign In"""
"""Need to hook up Twilio for notifications"""

def index(request):
    """The home page for Maine codes."""
    return render(request, 'mc_app/index.html')

@login_required
def jsPunctuation(request):
    print("We got back to jsPunctuation")
    if request.method !='POST':
        print("It's not a post")
        test = JavaScriptPunctuation.objects.filter(topic='punctuation')
        print("Here's the id of the first question.")
        print(test[0].id)
        questions = serializers.serialize('json', JavaScriptPunctuation.objects.filter(topic='punctuation'))
        context = {'questions': questions}
        return render(request, 'mc_app/jsPunctuation.html', context)

    else:
        print("Here is the POST DATA")
        print("id: ")
        print(request.POST['id'])
        print("timesAnswered")
        print(request.POST['timesAnswered'])
        print("It IS a post!")
        id = request.POST['id']
        JavaScriptPunctuation.objects.filter(id=id).update(timesAnswered = request.POST['timesAnswered'], timesAnsweredCorrectly = request.POST['timesAnswered'], timesDistractor1 = request.POST['timesDistractor1'], timesDistractor2 = request.POST['timesDistractor2'], timesDistractor3 = request.POST['timesDistractor3'], timesDistractor4 = request.POST['timesDistractor4'])
    """The page for quizzes."""
    return render(request, 'mc_app/jsPunctuation.html')

@login_required
def skill_selection(request):
    if request.method != 'POST':
        progressObj = serializers.serialize('json', UserProgress.objects.filter(progressForUser=request.user))
        context = {'progressObj': progressObj}
        return render(request, 'mc_app/skill_selection.html', context)
    else:
        print(request.user)
        sessionObj = serializers.serialize('json', UsersLatestSession.objects.filter(sessionUser=request.user))
        print(sessionObj)
        form = SelectSkillsForm(data=request.POST)
        if form.is_valid():
            selection = form.cleaned_data["skillRadios"]
            print("This is selection: ")
            print(selection)
        else:
            selection = 'basicDerivatives'
        skillObj = serializers.serialize('json', DerivativesSkills.objects.filter(skillName=selection))
        print(skillObj)
        progressObj = serializers.serialize('json', UserProgress.objects.filter(progressForUser=request.user))
        context = {'selection': selection, 'sessionObj':sessionObj, 'skillObj': skillObj, 'progressObj': progressObj}
        return render(request, 'mc_app/derivatives.html', context )

def masteredRoutine(request):
    print("in the mastered routine")
    if request.method != 'POST':
        print("This is not a post")
    else:
        DerivativesSkills.objects.filter(skillName=request.POST["skillName"]).update(timesAttempted = request.POST['timesAttempted'], timesMastered = request.POST['timesMastered'], totalQuestionsAsked = request.POST['totalQuestionsAsked'], totalQuestionsAnsweredCorrectly = request.POST['totalQuestionsAnsweredCorrectly'], longestStreak = request.POST['longestStreak'], percentCorrect = request.POST['percentCorrect'])
        UserProgress.objects.filter(progressForUser=request.user).update(totalSkillsMastered = request.POST['totalSkillsMastered'], totalQuestionsAttempted = request.POST['progressTotalQuestionsAttempted'], totalQuestionsAnsweredCorrectly = request.POST['progressTotalQuestionsAnsweredCorrectly'], longestStreak = request.POST['progressLongestStreak'], percentCorrect = request.POST['progressPercentCorrect'])
        if request.POST["skillName"] == "basicDerivatives":
            UserProgress.objects.filter(progressForUser=request.user).update(masteredBasicDerivatives = True, basicDerivativesMaxCorrect = request.POST['progressMaxCorrect'])
        elif request.POST["skillName"] == "negativeCoefficients":
            UserProgress.objects.filter(progressForUser=request.user).update(masteredNegativeCoefficients = True, negativeCoefficientsMaxCorrect = request.POST['progressMaxCorrect'])
        elif request.POST["skillName"] == "basicMix":
            UserProgress.objects.filter(progressForUser=request.user).update(masteredBasicMix = True, basicMixMaxCorrect = request.POST['progressMaxCorrect'])
        elif request.POST["skillName"] == "negativeExponents":
            UserProgress.objects.filter(progressForUser=request.user).update(masteredNegativeExponents = True, negativeExponentsMaxCorrect = request.POST['progressMaxCorrect'])
        elif request.POST["skillName"] == "fractionalExponents":
            UserProgress.objects.filter(progressForUser=request.user).update(masteredFractionalExponents = True, fractionalExponentsMaxCorrect = request.POST['progressMaxCorrect'])
        elif request.POST["skillName"] == "advancedMix":
            UserProgress.objects.filter(progressForUser=request.user).update(masteredAdvancedMix = True, advancedMixMaxCorrect = request.POST['progressMaxCorrect'])
        elif request.POST["skillName"] == "negativeExponentsAndCoefficients":
            UserProgress.objects.filter(progressForUser=request.user).update(masteredAdvancedMix = True, advancedMixMaxCorrect = request.POST['progressMaxCorrect'])
        elif request.POST["skillName"] == "negativeExponentsAndFractionalCoefficients":
            UserProgress.objects.filter(progressForUser=request.user).update(masteredAdvancedMix = True, advancedMixMaxCorrect = request.POST['progressMaxCorrect'])
        elif request.POST["skillName"] == "negativeExponentsBasicMix":
            UserProgress.objects.filter(progressForUser=request.user).update(masteredAdvancedMix = True, advancedMixMaxCorrect = request.POST['progressMaxCorrect'])
        elif request.POST["skillName"] == "negativeExponentsAdavancedMix":
            UserProgress.objects.filter(progressForUser=request.user).update(masteredAdvancedMix = True, advancedMixMaxCorrect = request.POST['progressMaxCorrect'])
        elif request.POST["skillName"] == "fractionalExponentsAndNegativeCoefficients":
            UserProgress.objects.filter(progressForUser=request.user).update(masteredAdvancedMix = True, advancedMixMaxCorrect = request.POST['progressMaxCorrect'])
        elif request.POST["skillName"] == "fractionalExponentsAndFractionalCoefficients":
            UserProgress.objects.filter(progressForUser=request.user).update(masteredAdvancedMix = True, advancedMixMaxCorrect = request.POST['progressMaxCorrect'])
        elif request.POST["skillName"] == "fractionalExponentsBasicMix":
            UserProgress.objects.filter(progressForUser=request.user).update(masteredAdvancedMix = True, advancedMixMaxCorrect = request.POST['progressMaxCorrect'])
        elif request.POST["skillName"] == "fractionalExponentsAdavancedMix":
            UserProgress.objects.filter(progressForUser=request.user).update(masteredAdvancedMix = True, advancedMixMaxCorrect = request.POST['progressMaxCorrect'])
        elif request.POST["skillName"] == "negativeFractionalExponents":
            UserProgress.objects.filter(progressForUser=request.user).update(masteredFractionalExponents = True, fractionalExponentsMaxCorrect = request.POST['progressMaxCorrect'])
        elif request.POST["skillName"] == "negativeFractionalExponentsAndNegativeCoefficients":
            UserProgress.objects.filter(progressForUser=request.user).update(masteredAdvancedMix = True, advancedMixMaxCorrect = request.POST['progressMaxCorrect'])
        elif request.POST["skillName"] == "negativeFractionalExponentsAndFractionalCoefficients":
            UserProgress.objects.filter(progressForUser=request.user).update(masteredAdvancedMix = True, advancedMixMaxCorrect = request.POST['progressMaxCorrect'])
        elif request.POST["skillName"] == "negativeFractionalExponentsBasicMix":
            UserProgress.objects.filter(progressForUser=request.user).update(masteredAdvancedMix = True, advancedMixMaxCorrect = request.POST['progressMaxCorrect'])
        elif request.POST["skillName"] == "negativeFractionalExponentsAdavancedMix":
            UserProgress.objects.filter(progressForUser=request.user).update(masteredAdvancedMix = True, advancedMixMaxCorrect = request.POST['progressMaxCorrect'])
    """This page does not actually get rendered, but it throws an error wihtout any html"""
    return render(request, 'mc_app/derivatives.html')

def masteredMessage(request):
    """This shows a message when user has mastered a skill."""
    print("In the masteredMessage routine.")
    if request.method != 'POST':
        print("This is not a post")
    else:
        print("This is a post")
    return render(request, 'mc_app/skill_selection.html')

@login_required
def class_progress(request):
    if request.method != 'POST':
        progressData = UserProgress.objects.all()
        context = {'progressData': progressData}
        return render(request, 'mc_app/class_progress.html', context)
    else:
        print("This was a POST! Should be impossible!")

    return render(request, 'mc_app/class_progress.html', context)

@login_required
def your_progress(request):
    if request.method != 'POST':
        progressData = UserProgress.objects.get(progressForUser=request.user)
        context = {'progressData': progressData}
        return render(request, 'mc_app/your_progress.html', context)
    else:
        print("This was a POST! Should be impossible!")

    return render(request, 'mc_app/your_progress.html', context)


def derivatives(request):
    print("Derivatives works!")
    functions = "first";
    context = {'functions': functions}
    return render(request, 'mc_app/derivatives.html', context)

def fractionalCoefficients(request):
    print("FC works!")
    functions = "first";
    context = {'functions': functions}
    return render(request, 'mc_app/fractionalCoefficients.html', context)
