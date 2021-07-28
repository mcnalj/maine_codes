from django import forms

class SelectSkillsForm(forms.Form):
    """This allows the user to select types of problems in the drills."""

    skillRadios = forms.CharField(widget=forms.RadioSelect)
