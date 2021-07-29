from django.contrib import admin

# Register your models here.
from .models import JavaScriptPunctuation
from .models import DerivativesSkills
from .models import UsersLatestSession
from .models import UserProgress

admin.site.register(JavaScriptPunctuation)
admin.site.register(DerivativesSkills)
admin.site.register(UsersLatestSession)
admin.site.register(UserProgress)
