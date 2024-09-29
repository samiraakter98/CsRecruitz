from rest_framework import serializers
from .models import *
from datetime import date
class postSerializer(serializers.ModelSerializer):
    class Meta:
        model=Jobpost
        fields=['id','title']
    # def create(self, validated_data):
    #     return Jobpost.objects.create(validated_data)
    #
    # def update(self, instance, validated_data):
    #     instance.title=validated_data.get('title',instance.title)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model= User
        fields='__all__'
class projSerializer(serializers.ModelSerializer):
    class Meta:
        model= Project
        fields='__all__'
class pubSerializer(serializers.ModelSerializer):
    class Meta:
        model= Publication
        fields='__all__'
class certiSerializer(serializers.ModelSerializer):
    class Meta:
        model= LicenseCertificate
        fields='__all__'
class LicSerializer(serializers.ModelSerializer):
    lic_name = serializers.SerializerMethodField("get_lic_name")
    lic_org = serializers.SerializerMethodField("get_lic_org")
    lic_link=serializers.SerializerMethodField("get_lic_link")

    class Meta:
        model= JobseekerCertificate
        fields='__all__'
    def get_lic_name(self,obj):
        return obj.certificate_id.certificate_name
    def get_lic_org(self,obj):
        return obj.certificate_id.issuing_org

    def get_lic_link(self, obj):
        return obj.certificate_id.certificate_link
class NewPostSerializer(serializers.ModelSerializer):
    #print("serialiser")
    emp_name = serializers.SerializerMethodField("get_emp_name")
    emp_district = serializers.SerializerMethodField("get_emp_district")
    emp_division = serializers.SerializerMethodField("get_emp_division")
    tot_applicants = serializers.SerializerMethodField("get_tot_applicants")
    class Meta:
        model= NewJobpost
        fields='__all__'

    def get_emp_name(self, obj):
        return obj.employer_id.name

    def get_emp_district(self, obj):
        return obj.employer_id.district

    def get_emp_division(self, obj):
        return obj.employer_id.division

    def get_tot_applicants(self, obj):
        return 5

class jobseekerSerializer(serializers.ModelSerializer):
    #print("serialiser")
    age=serializers.SerializerMethodField()
    class Meta:
        model= Jobseeker
        fields='__all__'
    def get_age(self,obj):
        today = date.today()
        day=((today - obj.date_of_birth).days)
        return day//365



class jobexpSerializer(serializers.ModelSerializer):
    #print("serialiser")
    class Meta:
        model= JobExperience
        fields='__all__'

class uskillSerializer(serializers.ModelSerializer):
    #print("serialiser")
    skill_name = serializers.SerializerMethodField("get_skill_name")
    class Meta:
        model= JobSeekerSkill
        fields='__all__'

    def get_skill_name(self, obj):
        return obj.skill_id.skill_name
class pub_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Publication
        fields = '__all__'
class Cutoff_Serializer(serializers.ModelSerializer):
    class Meta:
        model = SkillMarkCutoff
        fields = '__all__'
class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'
class applicationSerializer(serializers.ModelSerializer):
    #print("serialiser")
    job_name = serializers.SerializerMethodField("get_job_name")
    emp_name = serializers.SerializerMethodField("get_emp_name")
    emp_id = serializers.SerializerMethodField("get_emp_id")
    app_name = serializers.SerializerMethodField("get_app_name")
    deadline = serializers.SerializerMethodField("get_deadline")
    class Meta:
        model= JobApplication
        fields='__all__'

    def get_emp_name(self, obj):
        return obj.newjobpost_id.employer_id.name

    def get_emp_id(self, obj):
        return obj.newjobpost_id.employer_id_id

    def get_app_name(self, obj):
        return obj.user_id.name

    def get_job_name(self, obj):
        return obj.newjobpost_id.title

    def get_deadline(self, obj):
        return obj.newjobpost_id.deadline_date

class shortlistSerializer(serializers.ModelSerializer):
    #print("serialiser")
    job_name = serializers.SerializerMethodField("get_job_name")
    emp_name = serializers.SerializerMethodField("get_emp_name")
    deadline = serializers.SerializerMethodField("get_deadline")
    class Meta:
        model= JobShortlist
        fields='__all__'

    def get_emp_name(self, obj):
        return obj.newjobpost_id.employer_id.name

    def get_job_name(self, obj):
        return obj.newjobpost_id.title

    def get_deadline(self, obj):
        return obj.newjobpost_id.deadline_date

class questionSerializer(serializers.ModelSerializer):
    #print("serialiser")
    class Meta:
        model= Question
        fields='__all__'


class employerSerializer(serializers.ModelSerializer):
    # tot_jobpost = serializers.SerializerMethodField("get_tot_jobpost")
    class Meta:
        model= Employer
        fields='__all__'
    # def get_tot_jobpost(self,obj):
    #     total =0
    #     posts = NewJobpost.objects.filter(employer_id = obj.user_ptr_id)
    #     total = len(posts)
    #     return posts
class assesmentSerializer(serializers.ModelSerializer):
    # tot_jobpost = serializers.SerializerMethodField("get_tot_jobpost")
    class Meta:
        model=Assessment
        fields='__all__'