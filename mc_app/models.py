from django.db import models
from django.contrib.auth.models import User

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
    createdBy = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        """Return a string representation of the model."""
        return self.question

class DerivativesSkills(models.Model):
    """Skills exercises that involve finding the derivative."""
    skillName = models.CharField(max_length=200, unique=True)
    skillDisplayName = models.CharField(max_length=200)
    skillDescription = models.CharField(max_length=400)
    numberNeededForMastery = models.IntegerField(default=7)
    consecutiveNeededForMastery = models.IntegerField(default=4)
    timesAttempted = models.IntegerField(default=0)
    timesMastered = models.IntegerField(default=0)
    totalQuestionsAsked = models.IntegerField(default=0)
    totalQuestionsAnsweredCorrectly = models.IntegerField(default=0)
    longestStreak = models.IntegerField(default=0)
    percentCorrect = models.IntegerField(default=100)

    def __str__(self):
        """Return a string representation of the model."""
        message = self.skillName + ": " + self.skillDescription + ". " + str(self.timesAttempted) + "attempts with " + str(self.percentCorrect) + "% accuracy."
        return message

class UsersLatestSession(models.Model):
    sessionUser = models.OneToOneField(User, on_delete=models.CASCADE)
    sessionCount = models.IntegerField(default=0)
    sessionStartTime = models.DateTimeField(auto_now_add=True)
    sessionEndTime = models.DateTimeField(auto_now_add=False)
    skillsCompletedCount = models.IntegerField(default=0)
    quizzesCompletedCount = models.IntegerField(default=0)

    def __str__(self):
        """Return a string representation of the model."""
        message = "Session number: " + str(self.sessionCount) + " for user: " + self.sessionUser.username + " started at: " + str(self.sessionStartTime) + "."
        return message

class UserProgress(models.Model):
    progressForUser = models.OneToOneField(User, on_delete=models.CASCADE)
    totalSkillsMastered = models.IntegerField(default=0)
    totalQuizzesMastered = models.IntegerField(default=0)
    totalQuestionsAttempted = models.IntegerField(default=0)
    totalQuestionsAnsweredCorrectly = models.IntegerField(default=0)
    longestStreak = models.IntegerField(default=0)
    percentCorrect = models.IntegerField(default=100)
    masteredBasicDerivatives = models.BooleanField(default=False)
    basicDerivativesMaxCorrect = models.IntegerField(default=0)
    basicDerivativesPercentCorrect = models.IntegerField(default=100)
    masteredNegativeCoefficients = models.BooleanField(default=False)
    negativeCoefficientsMaxCorrect = models.IntegerField(default=0)
    negativeCoefficientsPercentCorrect = models.IntegerField(default=100)
    masteredFractionalCoefficients = models.BooleanField(default=False)
    fractionalCoefficientsMaxCorrect = models.IntegerField(default=0)
    fractionalCoefficientsPercentCorrect = models.IntegerField(default=100)
    masteredBasicMix = models.BooleanField(default=False)
    basicMixMaxCorrect = models.IntegerField(default=0)
    basicMixPercentCorrect = models.IntegerField(default=100)
    masteredNegativeExponents = models.BooleanField(default=False)
    negativeExponentsMaxCorrect = models.IntegerField(default=0)
    negativeExponentsPercentCorrect = models.IntegerField(default=100)
    masteredFractionalExponents = models.BooleanField(default=False)
    fractionalExponentsMaxCorrect = models.IntegerField(default=0)
    fractionalExponentsPercentCorrect = models.IntegerField(default=100)
    masteredAdvancedMix = models.BooleanField(default=False)
    advancedMixMaxCorrect = models.IntegerField(default=0)
    advancedMixPercentCorrect = models.IntegerField(default=100)
    masteredNegativeExponentsAndCoefficients = models.BooleanField(default=False)
    negativeExponentsAndCoefficientsMaxCorrect = models.IntegerField(default=0)
    negativeExponentsAndCoefficientsPercentCorrect = models.IntegerField(default=100)
    masteredNegativeExponentsAndFractionalCoefficients = models.BooleanField(default=False)
    negativeExponentsAndFractionalCoefficientsMaxCorrect = models.IntegerField(default=0)
    negativeExponentsAndFractionalCoefficientsPercentCorrect = models.IntegerField(default=100)
    masteredNegativeExponentsBasicMix = models.BooleanField(default=False)
    negativeExponentsBasicMixMaxCorrect = models.IntegerField(default=0)
    negativeExponentsBasicMixPercentCorrect = models.IntegerField(default=100)
    masteredNegativeExponentsAdvancedMix = models.BooleanField(default=False)
    negativeExponentsAdvancedMixMaxCorrect = models.IntegerField(default=0)
    negativeExponentsAdvancedMixPercentCorrect = models.IntegerField(default=100)
    masteredFractionalExponentsAndNegativeCoefficients = models.BooleanField(default=False)
    fractionalExponentsAndNegativeCoefficientsMaxCorrect = models.IntegerField(default=0)
    fractionalExponentsAndNegativeCoefficientsPercentCorrect = models.IntegerField(default=100)
    masteredFractionalExponentsAndFractionalCoefficients = models.BooleanField(default=False)
    fractionalExponentsAndFractionalCoefficientsMaxCorrect = models.IntegerField(default=0)
    fractionalExponentsAndFractionalCoefficientsPercentCorrect = models.IntegerField(default=100)
    masteredFractionalExponentsBasicMix = models.BooleanField(default=False)
    fractionalExponentsBasicMixMaxCorrect = models.IntegerField(default=0)
    fractionalExponentsBasicMixPercentCorrect = models.IntegerField(default=100)
    masteredFractionalExponentsAdvancedMix = models.BooleanField(default=False)
    fractionalExponentsAdvancedMixMaxCorrect = models.IntegerField(default=0)
    fractionalExponentsAdvancedMixPercentCorrect = models.IntegerField(default=100)
    masteredNegativeFractionalExponents = models.BooleanField(default=False)
    negativeFractionalExponentsMaxCorrect = models.IntegerField(default=0)
    negativeFractionalExponentsPercentCorrect = models.IntegerField(default=100)
    masteredNegativeFractionalExponentsAndNegativeCoefficients = models.BooleanField(default=False)
    negativeFractionalExponentsAndNegativeCoefficientsMaxCorrect = models.IntegerField(default=0)
    negativeFractionalExponentsAndNegativeCoefficientsPctCorrect = models.IntegerField(default=100)
    masteredNegativeFractionalExponentsAndFractionalCoefficients = models.BooleanField(default=False)
    negativeFractionalExponentsAndFractionalCoefficientsMaxCorrect = models.IntegerField(default=0)
    negativeFractionalExponentsAndFractionalCoefficientsPctCorrect = models.IntegerField(default=100)
    masteredNegativeFractionalExponentsBasicMix = models.BooleanField(default=False)
    negativeFractionalExponentsBasicMixMaxCorrect = models.IntegerField(default=0)
    negativeFractionalExponentsBasicMixPercentCorrect = models.IntegerField(default=100)
    masteredNegativeFractionalExponentsAdvancedMix = models.BooleanField(default=False)
    negativeFractionalExponentsAdvancedMixMaxCorrect = models.IntegerField(default=0)
    negativeFractionalExponentsAdvancedMixPercentCorrect = models.IntegerField(default=100)

    def __str__(self):
        """Return a string representation of the model."""
        message = "Progress for: " + self.progressForUser.username + ". Questions: " + str(self.totalQuestionsAttempted) + " % correct : " + str(self.percentCorrect) + "."
        return message
