from django.shortcuts import render, redirect

from django.shortcuts import render, redirect
from django.contrib.auth import login
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth.views import PasswordChangeDoneView

from mc_app.models import UsersLatestSession
from mc_app.models import UserProgress

import datetime


def register(request):
    """Register a new user."""
    if request.method != 'POST':
        # Display blank registration form.
        form = UserCreationForm()
    else:
        # Process completed form.
        form = UserCreationForm(data=request.POST)

        if form.is_valid():
            new_user = form.save()
            print("here is new user: ")
            print(new_user)
            now = datetime.datetime.now()
            first_session = UsersLatestSession.objects.create(sessionUser=new_user, sessionEndTime=now)
            first_progress = UserProgress.objects.create(progressForUser=new_user)
            #Log the user in and then redirect to home page.
            login(request, new_user)
            return redirect('mc_app:index')
    # Display a blank or invalid form.
    context = {'form': form}
    return render(request, 'registration/register.html', context)

def profile(request):
    """Update a users profile."""
    if request.method != 'POST':
        # Display profile update from.
        form = PasswordChangeForm(request.user)
    else:
        form = PasswordChangeForm(request.user)

        if form.is_valid():
            print("valid")
            updated_user = form.save()
            login(request, updated_user)
            return redirect('mc_app:index')
    # Display a blank or invalid form.
    context = {'form': form}
    return render(request, 'registration/profile.html', context)
