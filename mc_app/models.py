from django.db import models

class JavaScriptPunctuation(models.Model):
    """Questions about punctuation marks."""
    question = models.CharField(max_length=400)
    correctAnswer = models.CharField(max_length=200)
    distractor1 = models.CharField(max_length=200)
    distractor2 = models.CharField(max_length=200, blank=True, null=True)
    distractor3 = models.CharField(max_length=200, blank=True, null=True)
    distractor4 = models.CharField(max_length=200, blank=True, null=True)
    questionImage = models.ImageField(blank=True)
    isTrueFalse = models.BooleanField(default=False)
    isRandomized = models.BooleanField(default=True)
    isCodeSnippet = models.BooleanField(default=False)
    distractoreIsCodeSnippet = models.BooleanField(default=False)
    topic = models.CharField(max_length=100, default="")
    timesAnswered = models.IntegerField(default=0)
    timesAnsweredCorrectly = models.IntegerField(default=0)
    timesDistractor1 = models.IntegerField(default=0)
    timesDistractor2 = models.IntegerField(default=0)
    timesDistractor3 = models.IntegerField(default=0)
    timesDistractor4 = models.IntegerField(default=0)

    def __str__(self):
        """Return a string representation of the model."""
        return self.question
