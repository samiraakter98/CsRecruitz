from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(User)

admin.site.register(Jobseeker)
admin.site.register(Employer)

admin.site.register(Follow)
admin.site.register(NewJobpost)
admin.site.register(Skill)
admin.site.register(JobSeekerSkill)
admin.site.register(JobSkill)
admin.site.register(Question)
admin.site.register(SkillMarkCutoff)
admin.site.register(Assessment)
admin.site.register(JobApplication)
admin.site.register(JobShortlist)
admin.site.register(JobExperience)
admin.site.register(Project)
admin.site.register(Publication)
admin.site.register(LicenseCertificate)
admin.site.register(JobseekerCertificate)
admin.site.register(Notification)

