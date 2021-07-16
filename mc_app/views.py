from django.shortcuts import render
from django.core import serializers

from .models import JavaScriptPunctuation

def index(request):
    """The home page for Maine codes."""
    return render(request, 'mc_app/index.html')

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
