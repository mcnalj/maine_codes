from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class RegisterForm(UserCreationForm):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password1', 'password2',)
        widgets = {
            'username': forms.TextInput(attrs={'class': 'form-control col-sm-8'}),
            'first_name': forms.TextInput(attrs={'class': 'form-control col-sm-8'}),
            'last_name': forms.TextInput(attrs={'class': 'form-control col-sm-8'}),
            'email': forms.EmailInput(attrs={'class': 'form-control col-sm-8'}),
            'password1': forms.TextInput(attrs={'class': 'form-control col-sm-8'}),
            'password2': forms.TextInput(attrs={'class': 'form-control col-sm-8'}),
        }
