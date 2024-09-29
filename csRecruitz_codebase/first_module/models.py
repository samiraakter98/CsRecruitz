from django.db import models


# Create your models here.
class Jobpost(models.Model):
    title = models.CharField(max_length=200)


class User(models.Model):
    user_id = models.IntegerField(primary_key=True)
    password = models.CharField(max_length=300)
    name = models.CharField(max_length=40)
    email = models.EmailField(unique=True)
    contact_no=models.CharField(max_length=20)
    # address
    street = models.CharField(max_length=70, null=True)
    thana = models.CharField(max_length=30, blank=True, null=True)
    district = models.CharField(max_length=30, null=True)
    division = models.CharField(max_length=30)




class Jobseeker(User):
    father_name = models.CharField(max_length=40, null=True)
    mother_name = models.CharField(max_length=40, null=True)
    self_desc = models.CharField(max_length=200, null=True)
    propic = models.TextField(null=True)
    date_of_birth = models.DateField()
    nationality = models.CharField(max_length=20)
    gender = models.CharField(max_length=20,null=True)
    field = models.CharField(max_length=40)
    nid_number = models.IntegerField(unique=True)
    pref_job_ntr = models.CharField(max_length=20, null=True)
    pref_org_type = models.CharField(max_length=20, null=True)
    pref_sal = models.IntegerField(null=True)
    resume = models.FileField(upload_to='resumes', null=True)



class Employer(User):
    org_type = models.CharField(max_length=20)
    establishment_year = models.IntegerField(null=True)

class Follow(models.Model):
    follow_id = models.IntegerField(primary_key=True)
    employer_id = models.ForeignKey(Employer, on_delete=models.CASCADE)
    follower_id = models.ForeignKey(Jobseeker, on_delete=models.CASCADE)


class NewJobpost(models.Model):
    jobpost_id = models.IntegerField(primary_key=True)
    employer_id = models.ForeignKey(Employer, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=200)
    post_date = models.DateField()
    deadline_date = models.DateField()
    salary = models.IntegerField()
    required_experience = models.IntegerField()
    vacancies = models.IntegerField(null=True)
    job_context = models.TextField()
    job_nature = models.TextField()
    job_responsibilities = models.TextField()
    edu_requirement = models.TextField()
    additional_requirements = models.TextField(null=True)
    application_process = models.TextField(null=True)


class Skill(models.Model):
    skill_id = models.IntegerField(primary_key=True)
    skill_name = models.CharField(max_length=100)
    gap_between_consecutive_attempts = models.IntegerField()


class JobSeekerSkill(models.Model):
    jobseeker_skill_id = models.IntegerField(primary_key=True)
    user_id = models.ForeignKey(Jobseeker, on_delete=models.CASCADE)
    skill_id = models.ForeignKey(Skill, on_delete=models.CASCADE)
    isOpenToWork = models.BooleanField(default=False)


class JobSkill(models.Model):
    job_skill_id = models.IntegerField(primary_key=True)
    jobpost_id = models.ForeignKey(NewJobpost, on_delete=models.CASCADE)
    skill_id = models.ForeignKey(Skill, on_delete=models.CASCADE)


class Question(models.Model):
    question_id = models.IntegerField(primary_key=True)
    skill_id = models.ForeignKey(Skill, on_delete=models.CASCADE)
    question_text = models.TextField()
    optionA = models.TextField()
    optionB = models.TextField()
    optionC = models.TextField()
    optionD = models.TextField()
    answer = models.TextField()
    mark = models.IntegerField()
    time_limit = models.CharField(max_length=20)


class SkillMarkCutoff(models.Model):
    cutoff_id = models.IntegerField(primary_key=True)
    skill_id = models.ForeignKey(Skill, on_delete=models.CASCADE)
    cutoff_percentage = models.IntegerField()
    from_date = models.DateField()
    to_date = models.DateField()


class Assessment(models.Model):
    assessment_id = models.IntegerField(primary_key=True)
    jobseeker_skill_id = models.ForeignKey(JobSeekerSkill, on_delete=models.CASCADE)
    marks_obtained = models.IntegerField()
    date = models.DateField()


class JobApplication(models.Model):
    application_id = models.IntegerField(primary_key=True)
    user_id = models.ForeignKey(Jobseeker, on_delete=models.CASCADE)
    highlighted_projects=models.TextField(null=True)
    highlighted_publications=models.TextField(null=True)
    highlighted_lics = models.TextField(null=True)
    extra_certificates = models.TextField(null=True)
    resume_link=models.TextField(null=True)
    newjobpost_id = models.ForeignKey(NewJobpost, on_delete=models.CASCADE)
    apply_date = models.DateField()
    apply_time = models.TimeField()


class JobShortlist(models.Model):
    jobshortlist_id = models.IntegerField(primary_key=True)
    user_id = models.ForeignKey(Jobseeker, on_delete=models.CASCADE)
    newjobpost_id = models.ForeignKey(NewJobpost, on_delete=models.CASCADE)


class JobExperience(models.Model):
    jobexperience_id = models.IntegerField(primary_key=True)
    user_id = models.ForeignKey(Jobseeker, on_delete=models.CASCADE)
    experience_name = models.CharField(max_length=200)
    description=models.TextField(null=True)
    organization_name = models.CharField(max_length=200)
    from_year = models.IntegerField()
    to_year = models.IntegerField()


class Project(models.Model):
    project_id = models.IntegerField(primary_key=True)
    user_id = models.ForeignKey(Jobseeker, on_delete=models.CASCADE)
    project_name = models.CharField(max_length=200)
    project_short_desc = models.TextField(null=True)
    project_link = models.CharField(max_length=200,null=True)
    language= models.TextField(null=True)


class Publication(models.Model):
    publication_id = models.IntegerField(primary_key=True)
    user_id = models.ForeignKey(Jobseeker, on_delete=models.CASCADE)
    publication_name = models.CharField(max_length=200)
    publication_link = models.CharField(max_length=200,null=True)
    venue = models.TextField(null=True)
    publication_year=models.DateField(null=True)


class LicenseCertificate(models.Model):
    certificate_id = models.IntegerField(primary_key=True)
    certificate_name = models.CharField(max_length=200)
    issuing_org = models.CharField(max_length=200)
    certificate_link = models.CharField(max_length=200,null=True)


class JobseekerCertificate(models.Model):
    jobseeker_certificate_id = models.IntegerField(primary_key=True)
    user_id = models.ForeignKey(Jobseeker, on_delete=models.CASCADE)
    certificate_id = models.ForeignKey(LicenseCertificate, on_delete=models.CASCADE)


class Notification(models.Model):
    notification_id = models.IntegerField(primary_key=True)
    user_id = models.ForeignKey(Jobseeker, on_delete=models.CASCADE)
    text = models.CharField(max_length=200)
    noti_date = models.DateField()
    noti_time = models.TimeField()
