from django.http import JsonResponse
from django.shortcuts import render, HttpResponse, redirect
from .models import *
from .serializers import *
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework import viewsets, status
from django.db.models import Q
from datetime import datetime
import hashlib
import random
# #hiiiii
is_logged_in=False
#
logged_in_id=-1
#
reg_id=-1
def make_pw_hash(password):
   return hashlib.sha256(str.encode(password)).hexdigest()

def check_pw_hash(password,hash):
    if make_pw_hash(password)==hash:
        return True
    return False

class postViewsets(viewsets.ModelViewSet):
    # def list(self,request):
    #     posts = Jobpost.objects.all()
    #     serializer = postSerializer(posts, many=True)
    #     return Response(serializer.data)
    queryset = Jobpost.objects.all()
    serializer_class = postSerializer


class postViewsets_for_jobpost(viewsets.ModelViewSet):
    queryset = NewJobpost.objects.all()
    serializer_class = NewPostSerializer
    cat = ""
    org = ""
    loc = ""
    keyword = ""
    nature = ""
    redir_from_home= "true"
    filtername=""
    filter_cat=""
    filter_nat = ""
    filter_exp = ""
    filter_loc = ""
    sort_dir= ""
    sort_option= ""
    search_str=""
    emp_prof_id=-1
    objs_keyword = NewJobpost.objects.none()

    #variables for job posting
    # j_step=""
    j_title=""
    j_cat=""
    j_context=""
    j_nat=""
    j_sal=""
    j_deadline=""
    j_vacancy=""
    j_exp=""
    j_res=""
    j_edu=""
    j_add=""
    j_apply=""



    @action(methods=['post', 'get'], detail=False, url_path='details')
    def jobdetails(self, request):
        global logged_in_id
        if request.method == 'POST':
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            jobs = NewJobpost.objects.all()
            serializer = NewPostSerializer(jobs, many=True)
            if logged_in_id == -1:
                string = "false"
            else:
                string = "true"
            return Response({
                'status': status.HTTP_204_NO_CONTENT,
                'data': serializer.data,
                'response': string,
            })

    @action(methods=['post', 'get'], detail=False, url_path='searchinput')
    def follow(self, request):

        if request.method == 'POST':
            if request.data['redir_from_home']=="true": # home theke post hoise
                print(request.data['category'])
                print(request.data['organization'])
                print(request.data['location'])
                print(request.data['keyword'])
                print(request.data['nature'])
                postViewsets_for_jobpost.cat = request.data['category']
                postViewsets_for_jobpost.org = request.data['organization']
                postViewsets_for_jobpost.loc = request.data['location']
                postViewsets_for_jobpost.keyword = request.data['keyword']
                postViewsets_for_jobpost.nature = request.data['nature']
                postViewsets_for_jobpost.redir_from_home = request.data['redir_from_home']
                postViewsets_for_jobpost.filter_cat = request.data['category']
                postViewsets_for_jobpost.filter_nat = request.data['nature']
                postViewsets_for_jobpost.filter_loc = request.data['location']
                postViewsets_for_jobpost.sort_option=request.data['sortoption']
                postViewsets_for_jobpost.sort_dir="asc"
                # print(postViewsets_for_jobpost.filter_loc)
                return Response(status=status.HTTP_204_NO_CONTENT)
            else: # filter theke post hoise
                postViewsets_for_jobpost.redir_from_home = request.data['redir_from_home']
                postViewsets_for_jobpost.filtername = request.data["filtername"]
                if request.data['filtername']=="cat":
                    postViewsets_for_jobpost.filter_cat =request.data["category"]
                if request.data['filtername']=="nat":
                    postViewsets_for_jobpost.filter_nat =request.data["nature"]
                if request.data['filtername']=="exp":
                    postViewsets_for_jobpost.filter_exp =request.data["req_exp"]
                if request.data['filtername'] == "loc":
                    postViewsets_for_jobpost.filter_loc = request.data["location"]
                if request.data['filtername'] == "sortbtn":
                    if request.data["asc"]== "true":
                        postViewsets_for_jobpost.sort_dir = "asc"
                    else:
                        postViewsets_for_jobpost.sort_dir = "desc"
                if request.data['filtername'] == "sortoption":
                    postViewsets_for_jobpost.sort_option = request.data["sortoption"]

                return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            if postViewsets_for_jobpost.redir_from_home=="true":
                print("home theke asche")
                # save search result for keyword
                if postViewsets_for_jobpost.keyword != "":
                    postViewsets_for_jobpost.objs_keyword = NewJobpost.objects.filter(
                        Q(title__icontains=postViewsets_for_jobpost.keyword) | Q(
                            category__icontains=postViewsets_for_jobpost.keyword)
                        | Q(
                            job_context__icontains=postViewsets_for_jobpost.keyword) | Q(
                            job_nature=postViewsets_for_jobpost.keyword)
                        | Q(
                            job_responsibilities__icontains=postViewsets_for_jobpost.keyword) | Q(
                            edu_requirement__icontains=postViewsets_for_jobpost.keyword)
                        | Q(
                            additional_requirements__icontains=postViewsets_for_jobpost.keyword) | Q(
                            application_process__icontains=postViewsets_for_jobpost.keyword)
                        | Q(
                            employer_id__org_type__icontains=postViewsets_for_jobpost.keyword) | Q(
                            employer_id__thana__icontains=postViewsets_for_jobpost.keyword)
                        | Q(
                            employer_id__district__icontains=postViewsets_for_jobpost.keyword) | Q(
                            employer_id__division__icontains=postViewsets_for_jobpost.keyword)
                        | Q(
                            employer_id__name__icontains=postViewsets_for_jobpost.keyword))
                else:
                    postViewsets_for_jobpost.objs_keyword = NewJobpost.objects.all()

                if postViewsets_for_jobpost.cat != "" and postViewsets_for_jobpost.keyword != "" and postViewsets_for_jobpost.nature != "" and postViewsets_for_jobpost.org != "" and postViewsets_for_jobpost.loc != "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(Q(category=postViewsets_for_jobpost.cat),
                                                     Q(employer_id__division=postViewsets_for_jobpost.loc),
                                                     Q(employer_id__org_type=postViewsets_for_jobpost.org),
                                                     Q(job_nature=postViewsets_for_jobpost.nature), (
                                                             Q(title__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         category__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         job_context__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         job_nature=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         job_responsibilities__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         edu_requirement__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         additional_requirements__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         application_process__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__org_type__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         employer_id__thana__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__district__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         employer_id__division__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__name__icontains=postViewsets_for_jobpost.keyword)))

                elif postViewsets_for_jobpost.cat == "" and postViewsets_for_jobpost.keyword != "" and postViewsets_for_jobpost.nature != "" and postViewsets_for_jobpost.org != "" and postViewsets_for_jobpost.loc != "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(Q(employer_id__division=postViewsets_for_jobpost.loc),
                                                     Q(employer_id__org_type=postViewsets_for_jobpost.org),
                                                     Q(job_nature=postViewsets_for_jobpost.nature), (
                                                             Q(title__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         category__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         job_context__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         job_nature=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         job_responsibilities__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         edu_requirement__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         additional_requirements__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         application_process__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__org_type__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         employer_id__thana__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__district__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         employer_id__division__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__name__icontains=postViewsets_for_jobpost.keyword)))
                elif postViewsets_for_jobpost.cat != "" and postViewsets_for_jobpost.keyword == "" and postViewsets_for_jobpost.nature != "" and postViewsets_for_jobpost.org != "" and postViewsets_for_jobpost.loc != "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(Q(category=postViewsets_for_jobpost.cat),
                                                     Q(employer_id__division=postViewsets_for_jobpost.loc),
                                                     Q(employer_id__org_type=postViewsets_for_jobpost.org),
                                                     Q(job_nature=postViewsets_for_jobpost.nature))
                elif postViewsets_for_jobpost.cat != "" and postViewsets_for_jobpost.keyword != "" and postViewsets_for_jobpost.nature == "" and postViewsets_for_jobpost.org != "" and postViewsets_for_jobpost.loc != "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(Q(category=postViewsets_for_jobpost.cat),
                                                     Q(employer_id__division=postViewsets_for_jobpost.loc),
                                                     Q(employer_id__org_type=postViewsets_for_jobpost.org),
                                                     (
                                                             Q(title__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         category__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         job_context__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         job_nature=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         job_responsibilities__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         edu_requirement__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         additional_requirements__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         application_process__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__org_type__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         employer_id__thana__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__district__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         employer_id__division__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__name__icontains=postViewsets_for_jobpost.keyword)))
                elif postViewsets_for_jobpost.cat != "" and postViewsets_for_jobpost.keyword != "" and postViewsets_for_jobpost.nature != "" and postViewsets_for_jobpost.org == "" and postViewsets_for_jobpost.loc != "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(Q(category=postViewsets_for_jobpost.cat),
                                                     Q(employer_id__division=postViewsets_for_jobpost.loc),

                                                     Q(job_nature=postViewsets_for_jobpost.nature), (
                                                             Q(title__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         category__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         job_context__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         job_nature=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         job_responsibilities__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         edu_requirement__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         additional_requirements__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         application_process__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__org_type__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         employer_id__thana__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__district__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         employer_id__division__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__name__icontains=postViewsets_for_jobpost.keyword)))
                elif postViewsets_for_jobpost.cat != "" and postViewsets_for_jobpost.keyword != "" and postViewsets_for_jobpost.nature != "" and postViewsets_for_jobpost.org != "" and postViewsets_for_jobpost.loc == "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(Q(category=postViewsets_for_jobpost.cat),

                                                     Q(employer_id__org_type=postViewsets_for_jobpost.org),
                                                     Q(job_nature=postViewsets_for_jobpost.nature), (
                                                             Q(title__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         category__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         job_context__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         job_nature=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         job_responsibilities__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         edu_requirement__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         additional_requirements__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         application_process__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__org_type__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         employer_id__thana__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__district__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         employer_id__division__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__name__icontains=postViewsets_for_jobpost.keyword)))
                elif postViewsets_for_jobpost.cat == "" and postViewsets_for_jobpost.keyword == "" and postViewsets_for_jobpost.nature != "" and postViewsets_for_jobpost.org != "" and postViewsets_for_jobpost.loc != "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(
                        Q(employer_id__division=postViewsets_for_jobpost.loc),
                        Q(employer_id__org_type=postViewsets_for_jobpost.org),
                        Q(job_nature=postViewsets_for_jobpost.nature))
                elif postViewsets_for_jobpost.cat == "" and postViewsets_for_jobpost.keyword != "" and postViewsets_for_jobpost.nature == "" and postViewsets_for_jobpost.org != "" and postViewsets_for_jobpost.loc != "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(
                        Q(employer_id__division=postViewsets_for_jobpost.loc),
                        Q(employer_id__org_type=postViewsets_for_jobpost.org),
                        (
                                Q(title__icontains=postViewsets_for_jobpost.keyword) | Q(
                            category__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            job_context__icontains=postViewsets_for_jobpost.keyword) | Q(
                            job_nature=postViewsets_for_jobpost.keyword)
                                | Q(
                            job_responsibilities__icontains=postViewsets_for_jobpost.keyword) | Q(
                            edu_requirement__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            additional_requirements__icontains=postViewsets_for_jobpost.keyword) | Q(
                            application_process__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__org_type__icontains=postViewsets_for_jobpost.keyword) | Q(
                            employer_id__thana__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__district__icontains=postViewsets_for_jobpost.keyword) | Q(
                            employer_id__division__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__name__icontains=postViewsets_for_jobpost.keyword)))
                elif postViewsets_for_jobpost.cat == "" and postViewsets_for_jobpost.keyword != "" and postViewsets_for_jobpost.nature != "" and postViewsets_for_jobpost.org == "" and postViewsets_for_jobpost.loc != "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(
                        Q(employer_id__division=postViewsets_for_jobpost.loc),

                        Q(job_nature=postViewsets_for_jobpost.nature), (
                                Q(title__icontains=postViewsets_for_jobpost.keyword) | Q(
                            category__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            job_context__icontains=postViewsets_for_jobpost.keyword) | Q(
                            job_nature=postViewsets_for_jobpost.keyword)
                                | Q(
                            job_responsibilities__icontains=postViewsets_for_jobpost.keyword) | Q(
                            edu_requirement__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            additional_requirements__icontains=postViewsets_for_jobpost.keyword) | Q(
                            application_process__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__org_type__icontains=postViewsets_for_jobpost.keyword) | Q(
                            employer_id__thana__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__district__icontains=postViewsets_for_jobpost.keyword) | Q(
                            employer_id__division__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__name__icontains=postViewsets_for_jobpost.keyword)))
                elif postViewsets_for_jobpost.cat == "" and postViewsets_for_jobpost.keyword != "" and postViewsets_for_jobpost.nature != "" and postViewsets_for_jobpost.org != "" and postViewsets_for_jobpost.loc == "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(
                        Q(employer_id__org_type=postViewsets_for_jobpost.org),
                        Q(job_nature=postViewsets_for_jobpost.nature), (
                                Q(title__icontains=postViewsets_for_jobpost.keyword) | Q(
                            category__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            job_context__icontains=postViewsets_for_jobpost.keyword) | Q(
                            job_nature=postViewsets_for_jobpost.keyword)
                                | Q(
                            job_responsibilities__icontains=postViewsets_for_jobpost.keyword) | Q(
                            edu_requirement__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            additional_requirements__icontains=postViewsets_for_jobpost.keyword) | Q(
                            application_process__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__org_type__icontains=postViewsets_for_jobpost.keyword) | Q(
                            employer_id__thana__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__district__icontains=postViewsets_for_jobpost.keyword) | Q(
                            employer_id__division__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__name__icontains=postViewsets_for_jobpost.keyword)))
                elif postViewsets_for_jobpost.cat != "" and postViewsets_for_jobpost.keyword == "" and postViewsets_for_jobpost.nature == "" and postViewsets_for_jobpost.org != "" and postViewsets_for_jobpost.loc != "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(Q(category=postViewsets_for_jobpost.cat),
                                                     Q(employer_id__division=postViewsets_for_jobpost.loc),
                                                     Q(employer_id__org_type=postViewsets_for_jobpost.org))

                elif postViewsets_for_jobpost.cat != "" and postViewsets_for_jobpost.keyword == "" and postViewsets_for_jobpost.nature != "" and postViewsets_for_jobpost.org == "" and postViewsets_for_jobpost.loc != "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(Q(category=postViewsets_for_jobpost.cat),
                                                     Q(employer_id__division=postViewsets_for_jobpost.loc),

                                                     Q(job_nature=postViewsets_for_jobpost.nature))
                elif postViewsets_for_jobpost.cat != "" and postViewsets_for_jobpost.keyword == "" and postViewsets_for_jobpost.nature != "" and postViewsets_for_jobpost.org != "" and postViewsets_for_jobpost.loc == "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(Q(category=postViewsets_for_jobpost.cat),

                                                     Q(employer_id__org_type=postViewsets_for_jobpost.org),
                                                     Q(job_nature=postViewsets_for_jobpost.nature))
                elif postViewsets_for_jobpost.cat != "" and postViewsets_for_jobpost.keyword != "" and postViewsets_for_jobpost.nature == "" and postViewsets_for_jobpost.org == "" and postViewsets_for_jobpost.loc != "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(Q(category=postViewsets_for_jobpost.cat),
                                                     Q(employer_id__division=postViewsets_for_jobpost.loc),
                                                     (
                                                             Q(title__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         category__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         job_context__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         job_nature=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         job_responsibilities__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         edu_requirement__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         additional_requirements__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         application_process__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__org_type__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         employer_id__thana__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__district__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         employer_id__division__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__name__icontains=postViewsets_for_jobpost.keyword)))
                elif postViewsets_for_jobpost.cat != "" and postViewsets_for_jobpost.keyword != "" and postViewsets_for_jobpost.nature == "" and postViewsets_for_jobpost.org != "" and postViewsets_for_jobpost.loc == "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(Q(category=postViewsets_for_jobpost.cat),

                                                     Q(employer_id__org_type=postViewsets_for_jobpost.org),
                                                     (
                                                             Q(title__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         category__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         job_context__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         job_nature=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         job_responsibilities__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         edu_requirement__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         additional_requirements__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         application_process__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__org_type__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         employer_id__thana__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__district__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         employer_id__division__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__name__icontains=postViewsets_for_jobpost.keyword)))
                elif postViewsets_for_jobpost.cat != "" and postViewsets_for_jobpost.keyword != "" and postViewsets_for_jobpost.nature != "" and postViewsets_for_jobpost.org == "" and postViewsets_for_jobpost.loc == "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(Q(category=postViewsets_for_jobpost.cat),

                                                     Q(job_nature=postViewsets_for_jobpost.nature), (
                                                             Q(title__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         category__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         job_context__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         job_nature=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         job_responsibilities__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         edu_requirement__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         additional_requirements__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         application_process__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__org_type__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         employer_id__thana__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__district__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         employer_id__division__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__name__icontains=postViewsets_for_jobpost.keyword)))
                elif postViewsets_for_jobpost.cat == "" and postViewsets_for_jobpost.keyword == "" and postViewsets_for_jobpost.nature == "" and postViewsets_for_jobpost.org != "" and postViewsets_for_jobpost.loc != "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(
                        Q(employer_id__division=postViewsets_for_jobpost.loc),
                        Q(employer_id__org_type=postViewsets_for_jobpost.org))
                elif postViewsets_for_jobpost.cat == "" and postViewsets_for_jobpost.keyword != "" and postViewsets_for_jobpost.nature == "" and postViewsets_for_jobpost.org == "" and postViewsets_for_jobpost.loc != "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(
                        Q(employer_id__division=postViewsets_for_jobpost.loc),
                        (
                                Q(title__icontains=postViewsets_for_jobpost.keyword) | Q(
                            category__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            job_context__icontains=postViewsets_for_jobpost.keyword) | Q(
                            job_nature=postViewsets_for_jobpost.keyword)
                                | Q(
                            job_responsibilities__icontains=postViewsets_for_jobpost.keyword) | Q(
                            edu_requirement__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            additional_requirements__icontains=postViewsets_for_jobpost.keyword) | Q(
                            application_process__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__org_type__icontains=postViewsets_for_jobpost.keyword) | Q(
                            employer_id__thana__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__district__icontains=postViewsets_for_jobpost.keyword) | Q(
                            employer_id__division__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__name__icontains=postViewsets_for_jobpost.keyword)))
                elif postViewsets_for_jobpost.cat == "" and postViewsets_for_jobpost.keyword != "" and postViewsets_for_jobpost.nature != "" and postViewsets_for_jobpost.org == "" and postViewsets_for_jobpost.loc == "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(

                        Q(job_nature=postViewsets_for_jobpost.nature), (
                                Q(title__icontains=postViewsets_for_jobpost.keyword) | Q(
                            category__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            job_context__icontains=postViewsets_for_jobpost.keyword) | Q(
                            job_nature=postViewsets_for_jobpost.keyword)
                                | Q(
                            job_responsibilities__icontains=postViewsets_for_jobpost.keyword) | Q(
                            edu_requirement__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            additional_requirements__icontains=postViewsets_for_jobpost.keyword) | Q(
                            application_process__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__org_type__icontains=postViewsets_for_jobpost.keyword) | Q(
                            employer_id__thana__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__district__icontains=postViewsets_for_jobpost.keyword) | Q(
                            employer_id__division__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__name__icontains=postViewsets_for_jobpost.keyword)))
                elif postViewsets_for_jobpost.cat == "" and postViewsets_for_jobpost.keyword != "" and postViewsets_for_jobpost.nature == "" and postViewsets_for_jobpost.org == "" and postViewsets_for_jobpost.loc != "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(
                        Q(employer_id__division=postViewsets_for_jobpost.loc),
                        (
                                Q(title__icontains=postViewsets_for_jobpost.keyword) | Q(
                            category__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            job_context__icontains=postViewsets_for_jobpost.keyword) | Q(
                            job_nature=postViewsets_for_jobpost.keyword)
                                | Q(
                            job_responsibilities__icontains=postViewsets_for_jobpost.keyword) | Q(
                            edu_requirement__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            additional_requirements__icontains=postViewsets_for_jobpost.keyword) | Q(
                            application_process__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__org_type__icontains=postViewsets_for_jobpost.keyword) | Q(
                            employer_id__thana__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__district__icontains=postViewsets_for_jobpost.keyword) | Q(
                            employer_id__division__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__name__icontains=postViewsets_for_jobpost.keyword)))
                elif postViewsets_for_jobpost.cat == "" and postViewsets_for_jobpost.keyword != "" and postViewsets_for_jobpost.nature == "" and postViewsets_for_jobpost.org != "" and postViewsets_for_jobpost.loc == "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(

                        Q(employer_id__org_type=postViewsets_for_jobpost.org),
                        (
                                Q(title__icontains=postViewsets_for_jobpost.keyword) | Q(
                            category__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            job_context__icontains=postViewsets_for_jobpost.keyword) | Q(
                            job_nature=postViewsets_for_jobpost.keyword)
                                | Q(
                            job_responsibilities__icontains=postViewsets_for_jobpost.keyword) | Q(
                            edu_requirement__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            additional_requirements__icontains=postViewsets_for_jobpost.keyword) | Q(
                            application_process__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__org_type__icontains=postViewsets_for_jobpost.keyword) | Q(
                            employer_id__thana__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__district__icontains=postViewsets_for_jobpost.keyword) | Q(
                            employer_id__division__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__name__icontains=postViewsets_for_jobpost.keyword)))
                elif postViewsets_for_jobpost.cat == "" and postViewsets_for_jobpost.keyword != "" and postViewsets_for_jobpost.nature != "" and postViewsets_for_jobpost.org == "" and postViewsets_for_jobpost.loc == "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(

                        Q(job_nature=postViewsets_for_jobpost.nature), (
                                Q(title__icontains=postViewsets_for_jobpost.keyword) | Q(
                            category__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            job_context__icontains=postViewsets_for_jobpost.keyword) | Q(
                            job_nature=postViewsets_for_jobpost.keyword)
                                | Q(
                            job_responsibilities__icontains=postViewsets_for_jobpost.keyword) | Q(
                            edu_requirement__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            additional_requirements__icontains=postViewsets_for_jobpost.keyword) | Q(
                            application_process__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__org_type__icontains=postViewsets_for_jobpost.keyword) | Q(
                            employer_id__thana__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__district__icontains=postViewsets_for_jobpost.keyword) | Q(
                            employer_id__division__icontains=postViewsets_for_jobpost.keyword)
                                | Q(
                            employer_id__name__icontains=postViewsets_for_jobpost.keyword)))
                elif postViewsets_for_jobpost.cat != "" and postViewsets_for_jobpost.keyword == "" and postViewsets_for_jobpost.nature == "" and postViewsets_for_jobpost.org == "" and postViewsets_for_jobpost.loc != "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(Q(category=postViewsets_for_jobpost.cat),
                                                     Q(employer_id__division=postViewsets_for_jobpost.loc))
                elif postViewsets_for_jobpost.cat != "" and postViewsets_for_jobpost.keyword == "" and postViewsets_for_jobpost.nature == "" and postViewsets_for_jobpost.org != "" and postViewsets_for_jobpost.loc == "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(Q(category=postViewsets_for_jobpost.cat),

                                                     Q(employer_id__org_type=postViewsets_for_jobpost.org))
                elif postViewsets_for_jobpost.cat != "" and postViewsets_for_jobpost.keyword == "" and postViewsets_for_jobpost.nature != "" and postViewsets_for_jobpost.org == "" and postViewsets_for_jobpost.loc == "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(Q(category=postViewsets_for_jobpost.cat),

                                                     Q(job_nature=postViewsets_for_jobpost.nature))
                elif postViewsets_for_jobpost.cat != "" and postViewsets_for_jobpost.keyword != "" and postViewsets_for_jobpost.nature == "" and postViewsets_for_jobpost.org == "" and postViewsets_for_jobpost.loc == "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(Q(category=postViewsets_for_jobpost.cat),
                                                     (
                                                             Q(title__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         category__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         job_context__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         job_nature=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         job_responsibilities__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         edu_requirement__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         additional_requirements__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         application_process__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__org_type__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         employer_id__thana__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__district__icontains=postViewsets_for_jobpost.keyword) | Q(
                                                         employer_id__division__icontains=postViewsets_for_jobpost.keyword)
                                                             | Q(
                                                         employer_id__name__icontains=postViewsets_for_jobpost.keyword)))
                elif postViewsets_for_jobpost.cat == "" and postViewsets_for_jobpost.keyword == "" and postViewsets_for_jobpost.nature == "" and postViewsets_for_jobpost.org == "" and postViewsets_for_jobpost.loc != "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(
                        Q(employer_id__division=postViewsets_for_jobpost.loc)
                    )
                elif postViewsets_for_jobpost.cat == "" and postViewsets_for_jobpost.keyword == "" and postViewsets_for_jobpost.nature == "" and postViewsets_for_jobpost.org != "" and postViewsets_for_jobpost.loc == "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(Q(employer_id__org_type=postViewsets_for_jobpost.org))
                elif postViewsets_for_jobpost.cat == "" and postViewsets_for_jobpost.keyword == "" and postViewsets_for_jobpost.nature != "" and postViewsets_for_jobpost.org == "" and postViewsets_for_jobpost.loc == "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(

                        Q(job_nature=postViewsets_for_jobpost.nature))
                elif postViewsets_for_jobpost.cat == "" and postViewsets_for_jobpost.keyword != "" and postViewsets_for_jobpost.nature == "" and postViewsets_for_jobpost.org == "" and postViewsets_for_jobpost.loc == "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(
                        Q(title__icontains=postViewsets_for_jobpost.keyword) | Q(
                            category__icontains=postViewsets_for_jobpost.keyword)
                        | Q(
                            job_context__icontains=postViewsets_for_jobpost.keyword) | Q(
                            job_nature=postViewsets_for_jobpost.keyword)
                        | Q(
                            job_responsibilities__icontains=postViewsets_for_jobpost.keyword) | Q(
                            edu_requirement__icontains=postViewsets_for_jobpost.keyword)
                        | Q(
                            additional_requirements__icontains=postViewsets_for_jobpost.keyword) | Q(
                            application_process__icontains=postViewsets_for_jobpost.keyword)
                        | Q(
                            employer_id__org_type__icontains=postViewsets_for_jobpost.keyword) | Q(
                            employer_id__thana__icontains=postViewsets_for_jobpost.keyword)
                        | Q(
                            employer_id__district__icontains=postViewsets_for_jobpost.keyword) | Q(
                            employer_id__division__icontains=postViewsets_for_jobpost.keyword)
                        | Q(
                            employer_id__name__icontains=postViewsets_for_jobpost.keyword))
                elif postViewsets_for_jobpost.cat != "" and postViewsets_for_jobpost.keyword == "" and postViewsets_for_jobpost.nature == "" and postViewsets_for_jobpost.org == "" and postViewsets_for_jobpost.loc == "":
                    postViewsets_for_jobpost.objs = NewJobpost.objects.filter(Q(category=postViewsets_for_jobpost.cat))
                else:
                    postViewsets_for_jobpost.objs = NewJobpost.objects.all()
                print("iiooooooooooo"+postViewsets_for_jobpost.sort_option)
                if postViewsets_for_jobpost.sort_option=="Most Recent Post":
                    print("dhuksereeeeeeeeeeeeeeeeeeeeee")
                    if postViewsets_for_jobpost.sort_dir=="asc":
                        postViewsets_for_jobpost.objs = postViewsets_for_jobpost.objs.filter().order_by('-post_date')

                serializer = NewPostSerializer(postViewsets_for_jobpost.objs, many=True)

                return Response({
                    'status': status.HTTP_204_NO_CONTENT,
                    'data': serializer.data,
                    'cat': postViewsets_for_jobpost.filter_cat,
                    'nat': postViewsets_for_jobpost.filter_nat,
                    'exp': postViewsets_for_jobpost.filter_exp,
                    'loc': postViewsets_for_jobpost.filter_loc,
                })
            else:
                print("filter theke asche")
                objs2=postViewsets_for_jobpost.objs_keyword
                if postViewsets_for_jobpost.filter_cat!="":
                    print("cat")
                    objs2=postViewsets_for_jobpost.objs_keyword.filter(category=postViewsets_for_jobpost.filter_cat)
                if postViewsets_for_jobpost.filter_nat!="":
                    print("nat")
                    objs2=objs2.filter(job_nature=postViewsets_for_jobpost.filter_nat)
                if postViewsets_for_jobpost.filter_exp!="":
                    print("exp")
                    if postViewsets_for_jobpost.filter_exp=="Upto 1 year":
                        objs2 = objs2.filter(required_experience__lte=1)
                    elif postViewsets_for_jobpost.filter_exp=="2-5 years":
                        objs2 = objs2.filter(required_experience__lte=5)
                        objs2 = objs2.filter(required_experience__gte=2)
                    else:
                        objs2 = objs2.filter(required_experience__gt=5)
                if postViewsets_for_jobpost.filter_loc!="":
                    objs2=objs2.filter(employer_id__division = postViewsets_for_jobpost.filter_loc)
                print(objs2)
                print(postViewsets_for_jobpost.sort_option)
                if postViewsets_for_jobpost.sort_option=="Most Recent Post":
                    print("dhuksereeeeeeeeeeeeeeeeeeeeee")
                    if postViewsets_for_jobpost.sort_dir=="asc":
                        objs2 = objs2.filter().order_by('post_date')
                    else:
                        objs2 = objs2.filter().order_by('-post_date')
                elif postViewsets_for_jobpost.sort_option=="Deadline":
                    if postViewsets_for_jobpost.sort_dir=="asc":
                        objs2 = objs2.filter().order_by('deadline_date')
                    else:
                        objs2 = objs2.filter().order_by('-deadline_date')
                elif postViewsets_for_jobpost.sort_option=="Salary":
                    if postViewsets_for_jobpost.sort_dir=="asc":
                        objs2 = objs2.filter().order_by('salary')
                    else:
                        objs2 = objs2.filter().order_by('-salary')

                serializer = NewPostSerializer(objs2, many=True)
                return Response({
                    'status': status.HTTP_204_NO_CONTENT,
                    'data': serializer.data,
                    'cat': postViewsets_for_jobpost.filter_cat,
                    'nat': postViewsets_for_jobpost.filter_nat,
                    'exp': postViewsets_for_jobpost.filter_exp,
                    'loc': postViewsets_for_jobpost.filter_loc,
                })

    @action(methods=['post', 'get'], detail=False, url_path='empjobs')
    def get_all_jobs_emp(self, request):
        global logged_in_id
        emp_id=logged_in_id
        if request.method == 'POST':
            postViewsets_for_jobpost.search_str=request.data["search_str"]

            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            jobs = NewJobpost.objects.filter(employer_id_id=emp_id,title__icontains=postViewsets_for_jobpost.search_str)
            # print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
            # print(jobs)
            appstr=""
            for job in jobs:
                jobid=job.jobpost_id
                # print("~~~~~~~~~~~~~~~~~~~~")
                # print(jobid)
                apps=JobApplication.objects.filter(newjobpost_id_id=jobid)
                num=len(apps)
                # print("num")
                if appstr=="":
                    appstr = appstr +  str(num)
                else:
                    appstr = appstr + "#" + str(num)

            # print(appstr)
            serializer = NewPostSerializer(jobs, many=True)
            return Response({
                'status': status.HTTP_204_NO_CONTENT,
                'data': serializer.data,
                'response': appstr,
            })

    @action(methods=['post', 'get'], detail=False, url_path='empprofjobs')
    def get_all_jobs_empprofile(self, request):
        if request.method == 'POST':
            postViewsets_for_jobpost.emp_prof_id=int(request.data["emp_id"])

            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            findemp=Employer.objects.filter(user_ptr_id=postViewsets_for_jobpost.emp_prof_id)
            employername=findemp[0].name
            employerdiv=findemp[0].division
            employeryear=findemp[0].establishment_year
            jobs = NewJobpost.objects.filter(employer_id_id=postViewsets_for_jobpost.emp_prof_id)
            # print(appstr)
            serializer = NewPostSerializer(jobs, many=True)
            return Response({
                'status': status.HTTP_204_NO_CONTENT,
                'data': serializer.data,
                'empname':employername,
                'empdiv':employerdiv,
                'empyear':employeryear
            })

    @action(methods=['post', 'get'], detail=False, url_path='jobpost')
    def post_new_job(self, request):
        if request.method == 'POST':
            if request.data["j_step"]=="1":
                print("step1")
                postViewsets_for_jobpost.j_title=request.data["j_title"]
                postViewsets_for_jobpost.j_cat = request.data["j_cat"]
                postViewsets_for_jobpost.j_context = request.data["j_context"]
                postViewsets_for_jobpost.j_nat=request.data["j_nat"]
            elif request.data["j_step"]=="2":
                print("step2")
                postViewsets_for_jobpost.j_sal = int(request.data["j_sal"])
                postViewsets_for_jobpost.j_deadline = request.data["j_deadline"]
                postViewsets_for_jobpost.j_exp = int(request.data["j_exp"])
                if request.data["j_vacancy"]!="":
                    postViewsets_for_jobpost.j_vacancy = int(request.data["j_vacancy"])
                else:
                    postViewsets_for_jobpost.j_vacancy =None
                postViewsets_for_jobpost.j_res = request.data["j_res"]
            else:
                print("step3")
                postViewsets_for_jobpost.j_edu = request.data["j_edu"]
                if request.data["j_add"]!="":
                    postViewsets_for_jobpost.j_add = (request.data["j_add"])
                else:
                    postViewsets_for_jobpost.j_add =None
                if request.data["j_apply"]!="":
                    postViewsets_for_jobpost.j_apply = (request.data["j_apply"])
                else:
                    postViewsets_for_jobpost.j_apply =None

                #get next id
                allpostlist = NewJobpost.objects.all()
                p_id = 1
                if len(allpostlist) == 0:
                    p_id = 1
                else:
                    lists = NewJobpost.objects.filter().order_by('-jobpost_id')
                    p_id = int(lists[0].jobpost_id) + 1

                todaydate = datetime.today().strftime('%Y-%m-%d')
                global logged_in_id
                newpost=NewJobpost(jobpost_id=p_id,employer_id_id=logged_in_id,title=postViewsets_for_jobpost.j_title,category=postViewsets_for_jobpost.j_cat,
                                   post_date=todaydate,deadline_date=postViewsets_for_jobpost.j_deadline,salary=postViewsets_for_jobpost.j_sal,
                                   required_experience=postViewsets_for_jobpost.j_exp,vacancies=postViewsets_for_jobpost.j_vacancy,
                                   job_context=postViewsets_for_jobpost.j_context,job_nature=postViewsets_for_jobpost.j_nat,
                                   job_responsibilities=postViewsets_for_jobpost.j_res,edu_requirement=postViewsets_for_jobpost.j_edu,
                                   additional_requirements=postViewsets_for_jobpost.j_add,application_process=postViewsets_for_jobpost.j_apply)
                newpost.save()

        return Response(status=status.HTTP_204_NO_CONTENT)



class jobseekerViewsets(viewsets.ModelViewSet):
    queryset = Jobseeker.objects.all()
    serializer_class = jobseekerSerializer
    isdetails = False
    email = ""
    password = ""




    @action(methods=['post', 'get'], detail=False, url_path='matchuser')
    def match(self, request):
        global is_logged_in
        global logged_in_id
        if request.method == 'POST':
            jobseekerViewsets.isdetails = True
            jobseekerViewsets.email = request.data['email']
            jobseekerViewsets.password = request.data['password']
            objs = User.objects.filter(email=jobseekerViewsets.email)
            # global is_logged_in
            # global logged_in_id
            if len(objs) == 1:
                print("bal")
                hash_pass = objs[0].password
                # global is_logged_in
                # global logged_in_id
                if (check_pw_hash(jobseekerViewsets.password, hash_pass)):

                    is_logged_in = True

                    logged_in_id = objs[0].user_id
                else:
                    logged_in_id = -1
            else:
                logged_in_id = -1
                print("chal")
            return Response(status=status.HTTP_204_NO_CONTENT)

        else:
            if jobseekerViewsets.isdetails == True:
                print(jobseekerViewsets.email)
                print(jobseekerViewsets.password)
                objs = User.objects.filter(email=jobseekerViewsets.email)


                if len(objs) == 1:
                    hash_pass = objs[0].password
                    if(check_pw_hash(jobseekerViewsets.password,hash_pass)):
                        string = "success"
                        # global is_logged_in
                        is_logged_in=True
                        # global logged_in_id
                        logged_in_id=objs[0].user_id
                    else:
                        string="fail"
                else:
                    string = "fail"
                # global logged_in_id
                # if logged_in_id==-1:
                #     string="fail"
                # else:
                #     string="success"
                serializer = UserSerializer(objs, many=True)
                jobseekerViewsets.isdetails = False
                return Response({
                    'status': status.HTTP_204_NO_CONTENT,
                    'data': serializer.data,
                    'response': string,

                })
            else:
                jobseekerViewsets.isdetails = False
                return Response({
                    'status': status.HTTP_204_NO_CONTENT,
                    'data': None,
                    'response': "not_submitted",

                })

    @action(methods=['post', 'get'], detail=False, url_path='adduser')
    def register(self, request):
        if request.method == 'POST':
            name=request.data['name']
            password=request.data['password']
            password=make_pw_hash(password)
            email = request.data['email']
            dob=request.data['dob']
            gender=""
            if request.data['gender']!="":
                gender=request.data['gender']
            else:
                gender=None
            mob=request.data['mob']
            nid=int(request.data['nid'])
            nat=request.data['nat']
            father=""
            if request.data['father']!="":
                father=request.data['father']
            else:
                father=None
            mother=""
            if request.data['mother']!="":
                mother=request.data['mother']
            else:
                mother=None
            desc=""
            if request.data['desc']!="":
                desc=request.data['desc']
            else:
                desc=None
            street=""
            if request.data['street']!="":
                street=request.data['street']
            else:
                street=None
            thana=""
            if request.data['thana']!="":
                thana = request.data['thana']
            else:
                thana=None
            dis=""
            if request.data['dis']!="":
                dis = request.data['dis']
            else :
                dis=None
            div = request.data['div']
            field=request.data['field']
            pref_org=""
            if request.data['pref_org']!="":
                pref_org=request.data['pref_org']
            else:
                pref_org=None
            pref_nat=""
            if request.data['pref_nat']!="":
                pref_nat=request.data['pref_nat']
            else:
                pref_nat=None
            pref_sal = ""
            if request.data['pref_sal'] != "":
                pref_sal = request.data['pref_sal']
            else:
                pref_sal = None
            if request.data['pic']!="":
                pic=request.data['pic']
            else:
                pic=None
            if len(User.objects.all())==0:
                id=0
            else:
                id=User.objects.order_by('-user_id').first().user_id
            id=id+1
            global reg_id
            reg_id=id
            print(reg_id)
            user=Jobseeker(user_id=id,name=name,email=email,password=password,thana=thana,district=dis,division=div,father_name=father,
                           mother_name=mother,date_of_birth=dob,self_desc=desc,nationality=nat,nid_number=nid,field=field,pref_sal=pref_sal,
                           pref_job_ntr=pref_nat,pref_org_type=pref_org,gender=gender,contact_no=mob,street=street,propic=pic)
            user.save()
            print(request.data)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(methods=['post', 'get'], detail=False, url_path='addemp')
    def register_emp(self, request):
        if request.method == 'POST':

            print(request.data)
            name = request.data['name']
            password = request.data['password']
            password = make_pw_hash(password)
            email = request.data['email']
            mob=request.data['mob']
            if request.data['est_year']!="":
                est_year=request.data['est_year']
            else:
                est_year=None
            org=request.data['org']
            street = ""
            if request.data['street'] != "":
                street = request.data['street']
            else:
                street = None
            thana = ""
            if request.data['thana'] != "":
                thana = request.data['thana']
            else:
                thana = None
            dis = ""
            if request.data['dis'] != "":
                dis = request.data['dis']
            else:
                dis = None
            div = request.data['div']
            if len(User.objects.all())==0:
                id=0
            else:
                id=User.objects.order_by('-user_id').first().user_id
            id=id+1

            employer=Employer(user_id=id,name=name,email=email,password=password,thana=thana,district=dis,division=div,contact_no=mob,street=street,establishment_year=est_year,org_type=org)
            employer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(methods=['post', 'get'], detail=False, url_path='get_info')
    def get_log_in(self, request):
        global logged_in_id

        if request.method == 'POST':
            logged_in_id=-1
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:

            if logged_in_id == -1:
                res = "No"
            else:
                res = "Yes"
            return Response({
                'status': status.HTTP_204_NO_CONTENT,
                'data': None,
                'response': res,

            })

    @action(methods=['post', 'get'], detail=False, url_path='get_id')
    def get_id(self, request):
        # global logged_in_id
        print("logged_in "+str(logged_in_id))
        if request.method == 'GET':
            id = Jobseeker.objects.filter(user_ptr_id = logged_in_id)[0]

            print(id.name)
            serializer = jobseekerSerializer(id, many=False)
            print(serializer.data)
            return Response({
                'status': status.HTTP_204_NO_CONTENT,
                'data': serializer.data,
                'response': "hi",

            })
        return Response(status=status.HTTP_204_NO_CONTENT)

    def update(self, request, pk=None):
        data_in = request.data
        print(data_in)

        instance = self.get_object()
        print(instance.father_name)
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        # serializer.is_valid(raise_exception=True)

        if serializer.is_valid():
            # lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field
            # lookup_value = self.kwargs[lookup_url_kwarg]
            # extra_kwargs = {self.lookup_field: lookup_value}
            # serializer.save(**extra_kwargs)
            print("into")
            serializer.save()
            return Response(serializer.data)
        # data_out = serializer.data
        return Response(serializer.data, status=status.HTTP_201_CREATED)

        # @action(methods=['post', 'get','put'], detail=False, url_path='editinfo')
    # @action(detail=True, methods=['put'])
    # def update(self, request, pk=None):
        # if request.method == 'PUT':
        #     userid=1
        #     print(request.data['name'])
        #     print(request.data['age'])
        #     print(request.data['fathername'])
        #     print(request.data['mothername'])
        #     print(request.data['nationality'])
        #     print(request.data['nid'])
        #     print(request.data['dob'])
        #     print(request.data['mobile'])
        #     if request.data['nationality'] != "" :
        #         obj = Jobseeker.objects.filter(user_id=userid).update(nationality=request.data['nationality'])
        #         # obj.refresh_from_db()

        return Response(status=status.HTTP_204_NO_CONTENT)


class recoViewsets(viewsets.ModelViewSet):
    #null ar open to dekhte hobe
    global logged_in_id
    if logged_in_id==-1:
        userid=1
    else:
        userid = logged_in_id
    user = Jobseeker.objects.filter(user_id=userid)
    usercat = user[0].field  # not null
    userloc = user[0].division  # not null
    usersal = user[0].pref_sal ####null kina dekhte hobe
    userntr = user[0].pref_job_ntr ####null kina dekhte hobe
    userorg = user[0].pref_org_type ####null kina dekhte hobe
    todaydate = datetime.today().strftime('%Y-%m-%d')

    total_user_exp = 0
    all_exp = JobExperience.objects.filter(user_id=userid)
    hasexp=False
    if len(all_exp)>0:
        hasexp=True
    for exp in all_exp:
        expval = exp.to_year - exp.from_year
        total_user_exp = total_user_exp + expval
    print("total_user_exp:"+str(total_user_exp))

    uskill = JobSeekerSkill.objects.filter(user_id=userid)
    hasuskill = False
    if len(uskill) > 0:
        hasuskill = True
    # print("user skills: ")
    # print(uskill)

    # queryset = NewJobpost.objects.filter(category = usercat, employer_id__division = userloc, deadline_date__gte=todaydate, job_nature = userntr, salary__gte = usersal, employer_id__org_type = userorg).order_by('-salary')
    # queryset = NewJobpost.objects.filter(salary__gte=usersal,job_nature=userntr).order_by('-salary')
    # qset = NewJobpost.objects.filter(deadline_date__gte=todaydate).order_by('deadline_date')
    qset=NewJobpost.objects.none()
    if usersal==None and userntr==None and userorg==None:
        qset = NewJobpost.objects.filter(category=usercat, employer_id__division=userloc, deadline_date__gte=todaydate)
    elif usersal==None and userntr==None:
        qset = NewJobpost.objects.filter(category=usercat, employer_id__division=userloc, deadline_date__gte=todaydate, employer_id__org_type=userorg)
    elif userntr==None and userorg==None:
        qset = NewJobpost.objects.filter(category=usercat, employer_id__division=userloc, deadline_date__gte=todaydate, salary__gte=usersal)
    elif usersal==None and userorg==None:
        qset = NewJobpost.objects.filter(category=usercat, employer_id__division=userloc, deadline_date__gte=todaydate, job_nature=userntr)
    elif usersal==None:
        qset = NewJobpost.objects.filter(category=usercat, employer_id__division=userloc, deadline_date__gte=todaydate,
                                         job_nature=userntr, employer_id__org_type=userorg)
    elif userntr==None:
        qset = NewJobpost.objects.filter(category=usercat, employer_id__division=userloc, deadline_date__gte=todaydate,
                                         salary__gte=usersal, employer_id__org_type=userorg)
    elif userorg==None:
        qset = NewJobpost.objects.filter(category=usercat, employer_id__division=userloc, deadline_date__gte=todaydate,
                                         job_nature=userntr, salary__gte=usersal)
    else:
        qset = NewJobpost.objects.filter(category = usercat, employer_id__division = userloc, deadline_date__gte=todaydate, job_nature = userntr, salary__gte = usersal, employer_id__org_type = userorg)
    print("filtered jobs0.1:")
    print("user skills: ")
    print(uskill)

    queryset = NewJobpost.objects.filter(category = usercat, employer_id__division = userloc, deadline_date__gte=todaydate, job_nature = userntr, salary__gte = usersal, employer_id__org_type = userorg).order_by('-salary')
    queryset = NewJobpost.objects.filter(salary__gte=usersal,job_nature=userntr).order_by('-salary')
    qset = NewJobpost.objects.filter(deadline_date__gte=todaydate).order_by('deadline_date')
    qset = NewJobpost.objects.filter(category = usercat, employer_id__division = userloc, deadline_date__gte=todaydate, job_nature = userntr, salary__gte = usersal, employer_id__org_type = userorg)
    print("filtered jobs0:")
    print(qset)
    valid_job_ids = []
    for q in qset:
        print("job id:"+str(q.jobpost_id))
        jobid=q.jobpost_id
        required_exp=q.required_experience
        # print("req_exp:" + str(required_exp))
        if(total_user_exp>=required_exp):
            jskill=JobSkill.objects.filter(jobpost_id=jobid)
            hasjskill = False
            if len(jskill) > 0:
                hasjskill = True
            # print("job skills: ")
            # print(jskill)
            match_out=True
            for js in jskill:
                jsid=js.skill_id
                match_in=False
                for us in uskill:
                    if us.skill_id==jsid:
                        match_in=True
                        break
                if match_in==False:
                    match_out=False
                    break
            if match_out==True:
                valid_job_ids.append(q.jobpost_id)
    print("filtered jobs0.2:")
    print(valid_job_ids)
    if len(valid_job_ids)<5:
        print("list choto hoise after first filtering")

        totjobs=len(valid_job_ids)
        qset2=NewJobpost.objects.filter(category = usercat, employer_id__division = userloc, deadline_date__gte=todaydate).order_by('-salary')
        for q2 in qset2:
            if totjobs<5:
                if not q2.jobpost_id in valid_job_ids:
                    valid_job_ids.append(q2.jobpost_id)
                    totjobs = totjobs + 1
            else:
                break
        print("filtered jobs1:")
        print(valid_job_ids)
        if len(valid_job_ids) < 5:
            print("list choto hoise after second filtering")
            totjobs2 = len(valid_job_ids)
            qset3 = NewJobpost.objects.filter(deadline_date__gte=todaydate).order_by('-salary')
            # print("qset3 length: "+str(len(qset3)))
            for q3 in qset3:
                if totjobs2 < 5:
                    if not q3.jobpost_id in valid_job_ids:
                        valid_job_ids.append(q3.jobpost_id)
                        totjobs2=totjobs2+1
                else:
                    break
            print("filtered jobs2:")
            print(valid_job_ids)
    queryset = NewJobpost.objects.filter(jobpost_id__in=valid_job_ids).order_by('-salary')
    print("final jobs:")
    print(queryset)
    serializer_class = NewPostSerializer
    # open to   !!!
    # preferred sal
    # pref nature
    # pref org

    # location
    # exp       !!!
    # category
    # deadline par hoise kina


class jobexpViewsets(viewsets.ModelViewSet):
    global logged_in_id
    ############################kora hoynaiiiii#############################33
    queryset = JobExperience.objects.all()
    serializer_class = jobexpSerializer
    user_er_id=-1
    @action(methods=['post', 'get'], detail=False, url_path='addexp')
    def add_exp(self, request):
        if request.method == 'POST':
            global reg_id
            des_list=request.data["des"].split("#")
            emp_list=request.data["emp"].split("#")
            from_list=request.data["from"].split("#")
            to_list=request.data["to"].split("#")
            desc_list = request.data["desc"].split("#")
            for i in range(len(des_list)):
                if len(JobExperience.objects.all())==0:
                    id=0
                else:
                    id = JobExperience.objects.order_by('-jobexperience_id').first().jobexperience_id
                id=id+1
                if desc_list[i]=="?":
                    description=None
                else:
                    description=desc_list[i]
                job_exp = JobExperience(jobexperience_id=id, experience_name=des_list[i], organization_name=emp_list[i],
                                         from_year=from_list[i],
                                         to_year=to_list[i],description=description, user_id_id=reg_id)
                job_exp.save()

            print(request.data)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            global logged_in_id
            objs = JobExperience.objects.filter(user_id=logged_in_id)
            serializer = jobexpSerializer(objs, many=True)
            return Response({
                'status': status.HTTP_204_NO_CONTENT,
                'data': serializer.data,
            })

    @action(methods=['post', 'get'], detail=False, url_path='addexp2')
    def add_exp2(self, request):
        if request.method == 'POST':
            # global logged_in_id
            des_list = request.data["des"].split("#")
            emp_list = request.data["emp"].split("#")
            from_list = request.data["from"].split("#")
            to_list = request.data["to"].split("#")
            desc_list = request.data["desc"].split("#")

            for i in range(len(des_list)):
                if len(JobExperience.objects.all()) == 0:
                    id = 0
                else:
                    id = JobExperience.objects.order_by('-jobexperience_id').first().jobexperience_id
                id = id + 1
                if desc_list[i] == "?":
                    description = None
                else:
                    description = desc_list[i]
                print(id)
                print(des_list[i])
                print(emp_list[i])
                print(from_list[i])
                print(to_list[i])
                print(description)
                print(logged_in_id)
                job_exp = JobExperience(jobexperience_id=id, experience_name=des_list[i], organization_name=emp_list[i],
                                        from_year=from_list[i],
                                        to_year=to_list[i], description=description, user_id_id=logged_in_id)
                job_exp.save()
                print(JobExperience.objects.filter(jobexperience_id=id))

            print(request.data)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            # global logged_in_id
            objs = JobExperience.objects.filter(user_id=logged_in_id)
            serializer = jobexpSerializer(objs, many=True)
            return Response({
                'status': status.HTTP_204_NO_CONTENT,
                'data': serializer.data,
            })

    @action(methods=['post', 'get'], detail=False, url_path='get_info_user_emp')
    def user_emp_prof(self,request):
        if request.method == 'POST':
            jobexpViewsets.user_er_id=request.data['id']
            print(jobexpViewsets.user_er_id)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            objs = JobExperience.objects.filter(user_id=jobexpViewsets.user_er_id)
            serializer = jobexpSerializer(objs, many=True)
            objs2 = Project.objects.filter(user_id=jobexpViewsets.user_er_id)
            serializer2 = projSerializer(objs2, many=True)
            objs3 = Publication.objects.filter(user_id=jobexpViewsets.user_er_id)
            serializer3 = pub_Serializer(objs3, many=True)
            objs4 = JobseekerCertificate.objects.filter(user_id=jobexpViewsets.user_er_id)
            serializer4 = LicSerializer(objs4, many=True)
            objs5=Jobseeker.objects.filter(user_id=jobexpViewsets.user_er_id)
            serializer5=jobseekerSerializer(objs5,many=True)
            objs = JobSeekerSkill.objects.filter(user_id=jobexpViewsets.user_er_id).order_by("skill_id")
            skill_if_verified = ""
            skill_ids = ""
            # skill based mark
            for js in objs:  # for each jobskill
                jsid = int(js.skill_id_id)
                # check if jobskill is present in uskill and he is open to that
                user_skill = JobSeekerSkill.objects.filter(user_id_id=jobexpViewsets.user_er_id, skill_id_id=jsid)
                skillflag = False
                usid = 0
                if len(user_skill) != 0:
                    skillflag = True
                    usid = int(user_skill[0].jobseeker_skill_id)
                # print(skillflag)
                if skillflag:  # user has that skill, check if he has given assessment and passed
                    assflag = False
                    ass = Assessment.objects.filter(jobseeker_skill_id_id=usid).order_by("-date")
                    if len(ass) != 0:
                        assflag = True
                        assmark = ass[0].marks_obtained
                        asspercent = assmark * 10
                    if assflag:  # user has given assessment, check cutoff mark
                        # print("ass dise")
                        todaydate = datetime.today().strftime('%Y-%m-%d')
                        cutoff = SkillMarkCutoff.objects.filter(skill_id_id=jsid, to_date__gte=todaydate,
                                                                from_date__lte=todaydate)
                        cutoffmark = cutoff[0].cutoff_percentage
                        if asspercent >= cutoffmark:
                            skill_if_verified = skill_if_verified + "1" + "#"
                            skill_ids = skill_ids + "#" + str(jsid)
                        else:
                            skill_if_verified = skill_if_verified + "0" + "#"
                            skill_ids = skill_ids + "#" + str(jsid)
                    else:
                        skill_if_verified = skill_if_verified + "0" + "#"
                        skill_ids = skill_ids + "#" + str(jsid)

            serializer6 = uskillSerializer(objs, many=True)
            # return Response({
            #     'status': status.HTTP_204_NO_CONTENT,
            #     'data': serializer.data,
            #     "verifylist": skill_if_verified,
            #     "skill_ids": skill_ids
            # })
            return Response({
                'skills':serializer6.data,
                'verifylist':skill_if_verified,
                'status': status.HTTP_204_NO_CONTENT,
                'data': serializer.data,
                'projects':serializer2.data,
                'pubs':serializer3.data,
                'lics':serializer4.data,
                 'items':serializer5.data,
            })



    def update(self, request, pk=None):
        data_in = request.data
        print(data_in)
        instance = self.get_object()
        print(instance.jobexperience_id)
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        # serializer.is_valid(raise_exception=True)

        if serializer.is_valid():
            print("into")
            serializer.save()
            return Response(serializer.data)
        # data_out = serializer.data
        return Response(serializer.data, status=status.HTTP_201_CREATED)



class uskillViewsets(viewsets.ModelViewSet):
    global logged_in_id
    queryset = JobSeekerSkill.objects.all()
    serializer_class = uskillSerializer

    @action(methods=['post', 'get'], detail=False, url_path='editskill')
    def edit_skill(self, request):
        if request.method == 'POST':
            global reg_id
            print(request.data)
            print(reg_id)
            skill_list = request.data['skills'].split("#")
            open_to_list = request.data['currentSkills'].split("#")
            print(skill_list)
            print(open_to_list)
            # shortlist = JobShortlist.objects.filter(user_id_id=int(logged_user_id),
            #                                         newjobpost_id_id=int(request.data['job_id']))
            # shortlist.delete()
            print(len(JobSeekerSkill.objects.all()))
            # for i in range (1,len(skill_list)):
            #     temp = Skill.objects.filter(skill_name=skill_list[i])
            #     if len(temp) == 0:
            #         continue
            #     else:
            #         id = int(temp[0].skill_id)
            #         obj =  JobSeekerSkill.objects.filter(skill_id_id = id, user_id = logged_in_id)
            #         obj.delete()

            objs =  JobSeekerSkill.objects.filter( user_id = logged_in_id)
            objs.delete()

            print(len(JobSeekerSkill.objects.all()))
            for i in range(1, len(skill_list)):
                if len(JobSeekerSkill.objects.all()) == 0:
                    id = 0
                else:
                    id = JobSeekerSkill.objects.order_by('-jobseeker_skill_id').first().jobseeker_skill_id
                id = id + 1
                if (skill_list[i] in open_to_list):
                    flag = True
                else:
                    flag = False
                print(skill_list[i])
                objs = Skill.objects.filter(skill_name=skill_list[i])
                print(objs)
                print(objs[0].skill_id)
                uskill = JobSeekerSkill(jobseeker_skill_id=id, isOpenToWork=flag, skill_id_id=objs[0].skill_id,
                                        user_id_id=logged_in_id)
                uskill.save()

            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({
                'status': status.HTTP_204_NO_CONTENT,
            })

    @action(methods=['post', 'get'], detail=False, url_path='addskill')
    def add_skill(self, request):
        if request.method == 'POST':
            print(request.data)
            global reg_id
            print(reg_id)
            skill_list = request.data['skills'].split("#")
            open_to_list = request.data['open_to'].split("#")
            for i in range (1,len(skill_list)):
                if len(JobSeekerSkill.objects.all())==0:
                    id=0
                else:
                    id = JobSeekerSkill.objects.order_by('-jobseeker_skill_id').first().jobseeker_skill_id
                id=id+1
                if(skill_list[i] in open_to_list):
                    flag=True
                else:
                    flag=False
                print(skill_list[i])
                objs=Skill.objects.filter(skill_name=skill_list[i])

                uskill = JobSeekerSkill(jobseeker_skill_id=id, isOpenToWork=flag, skill_id_id=objs[0].skill_id, user_id_id=reg_id)
                uskill.save()
            name_list = request.data["proj_name"].split("#")
            link_list = request.data["proj_link"].split()
            desc_list = request.data["proj_desc"].split("#")

            for i in range(len(name_list)):
                if len(Project.objects.all()) == 0:
                    id = 0
                else:
                    id = Project.objects.order_by('-project_id').first().project_id
                id = id + 1

                if desc_list[i] == "?":
                    description = None
                else:
                    description = desc_list[i]
                if link_list[i]== "?" :
                    proj_link=None
                else:
                    proj_link=link_list[i]
                project = Project(project_id=id, project_name=name_list[i], project_link=proj_link,
                                        project_short_desc=description, user_id_id=reg_id)
                project.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            global logged_in_id
            print("koooooo" + str(logged_in_id))
            objs = JobSeekerSkill.objects.filter(user_id=logged_in_id).order_by("skill_id")
            skill_if_verified=""
            skill_ids=""
            # skill based mark
            for js in objs:  # for each jobskill
                jsid = int(js.skill_id_id)
                # check if jobskill is present in uskill and he is open to that
                user_skill = JobSeekerSkill.objects.filter(user_id_id=logged_in_id, skill_id_id=jsid)
                skillflag = False
                usid = 0
                if len(user_skill) != 0:
                    skillflag = True
                    usid = int(user_skill[0].jobseeker_skill_id)
                # print(skillflag)
                if skillflag:  # user has that skill, check if he has given assessment and passed
                    assflag = False
                    ass = Assessment.objects.filter(jobseeker_skill_id_id=usid).order_by("-date")
                    if len(ass) != 0:
                        assflag = True
                        assmark = ass[0].marks_obtained
                        asspercent = assmark * 10
                    if assflag:  # user has given assessment, check cutoff mark
                        # print("ass dise")
                        todaydate = datetime.today().strftime('%Y-%m-%d')
                        cutoff = SkillMarkCutoff.objects.filter(skill_id_id=jsid, to_date__gte=todaydate,
                                                                from_date__lte=todaydate)
                        cutoffmark = cutoff[0].cutoff_percentage
                        if asspercent >= cutoffmark:
                            skill_if_verified=skill_if_verified+"1"+"#"
                            skill_ids = skill_ids +"#"+str(jsid)
                        else:
                            skill_if_verified = skill_if_verified +  "0"+"#"
                            skill_ids = skill_ids+ "#" + str(jsid)
                    else:
                        skill_if_verified = skill_if_verified +  "0"+"#"
                        skill_ids = skill_ids + "#" + str(jsid)

            serializer = uskillSerializer(objs, many=True)
            return Response({
                'status': status.HTTP_204_NO_CONTENT,
                'data': serializer.data,
                "verifylist":skill_if_verified,
                "skill_ids":skill_ids
            })




# class publicationViewsets(viewsets.ModelViewSet):
#     #######################kora hoynai###################################3
#     queryset = Publication.objects.all()
#     serializer_class = pub_Serializer

class projectViewsets(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = projSerializer
    global logged_in_id
    @action(methods=['post', 'get'], detail=False, url_path='get_proj')
    def get_proj(self, request):
        # global logged_in_id
        user_id = logged_in_id
        if request.method == 'POST':
            global reg_id
            project_name = request.data["project_name"].split("#")
            project_link = request.data["project_link"].split("#")
            language = request.data["language"].split("#")
            desc_list = request.data["desc"].split("#")
            print(project_name)
            for i in range(len(project_name)):
                if len(Project.objects.all()) == 0:
                    id = 0
                else:
                    id = Project.objects.order_by('-project_id').first().project_id
                id = id + 1
                if desc_list[i] == "?":
                    description = None
                else:
                    description = desc_list[i]
                print(id)
                proj = Project(project_id = id, project_name=project_name[i],
                                        project_short_desc=desc_list[i],
                                        project_link=project_link[i],
                                        language  = language[i],
                                         user_id_id=user_id)
                proj.save()

            print(request.data)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:

            objs = Project.objects.filter(user_id=logged_in_id)
            serializer = projSerializer(objs, many=True)

            return Response({
                'status': status.HTTP_204_NO_CONTENT,
                'data': serializer.data,
            })
    def update(self, request, pk=None):
        data_in = request.data
        print(data_in)
        instance = self.get_object()
        print(instance.project_id)
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        # serializer.is_valid(raise_exception=True)

        if serializer.is_valid():
            print("into")
            serializer.save()
            return Response(serializer.data)
        # data_out = serializer.data
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class pubViewsets(viewsets.ModelViewSet):
    queryset = Publication.objects.all()
    serializer_class = pub_Serializer
    global logged_in_id
    @action(methods=['post', 'get'], detail=False, url_path='get_pub')
    def get_pub(self, request):
        user_id = logged_in_id
        if request.method == 'POST':
            global reg_id
            pub_name = request.data["pub_name"].split("#")
            pub_link = request.data["pub_link"].split("#")
            venue = request.data["venue"].split("#")
            yr = request.data["yr"].split("#")
            print(pub_name)
            for i in range(len(pub_name)):
                if len(Publication.objects.all()) == 0:
                    id = 0
                else:
                    id = Publication.objects.order_by('-publication_id').first().publication_id
                id = id + 1
                if pub_link[i] == "?":
                    plink = None
                else:
                    plink = pub_link[i]
                if venue[i] == "?":
                   v = None
                else:
                    v= venue[i]
                if yr[i] == "?":
                    year= None
                else:
                    year= yr[i]
                print(id)
                pub = Publication(publication_id=id, publication_name=pub_name[i],
                               publication_link=plink,
                               venue=v,
                               publication_year=year,
                               user_id_id=user_id)
                pub.save()

            print(request.data)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:

            objs = Publication.objects.filter(user_id=logged_in_id)
            serializer = pub_Serializer(objs, many=True)

            return Response({
                'status': status.HTTP_204_NO_CONTENT,
                'data': serializer.data,
            })
    def update(self, request, pk=None):
        data_in = request.data
        print(data_in)
        instance = self.get_object()
        print(instance.publication_year)
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        # serializer.is_valid(raise_exception=True)

        if serializer.is_valid():
            print("into")
            serializer.save()
            return Response(serializer.data)
        # data_out = serializer.data
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(methods=['post', 'get'], detail=False, url_path='addpub')
    def add_pub(self, request):
        if request.method == 'POST':
            print(request.data)
            global reg_id
            pub_name_list = request.data["pub_name"].split("#")
            pub_link_list = request.data["pub_link"].split()


            for i in range(len(pub_name_list)):
                if len(Publication.objects.all()) == 0:
                    id = 0
                else:
                    id = Publication.objects.order_by('-publication_id').first().publication_id
                id = id + 1

                if pub_link_list[i] == "?":
                    link = None
                else:
                    link = pub_link_list[i]
                publi = Publication(publication_id=id, user_id_id=reg_id, publication_name=pub_name_list[i],
                                    publication_link=link)
                publi.save()


        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(methods=['post', 'get'], detail=False, url_path='addlic')
    def add_lic(self, request):
        if request.method == 'POST':
            print(request.data)
            lic_name = request.data["lic_name"]
            lic_org = request.data["lic_org"]
            lic_link=request.data["lic_link"]

            if len(LicenseCertificate.objects.all()) == 0:
                id = 0
            else:
                id = LicenseCertificate.objects.order_by('-certificate_id').first().certificate_id
            id = id + 1
            lic = LicenseCertificate(certificate_id=id, certificate_name=lic_name,
                                         issuing_org=lic_org,certificate_link=
                                         lic_link)
            lic.save()
            if len(JobseekerCertificate.objects.all()) == 0:
                id2 = 0
            else:
                id2 = JobseekerCertificate.objects.order_by(
                        '-jobseeker_certificate_id').first().jobseeker_certificate_id
            id2 = id2 + 1
            licuser = JobseekerCertificate(jobseeker_certificate_id=id2, certificate_id=lic, user_id_id=reg_id)
            licuser.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
class licAndcertiViewsets(viewsets.ModelViewSet):
    queryset = LicenseCertificate.objects.all()
    serializer_class = certiSerializer
    def update(self, request, pk=None):
        data_in = request.data
        print(data_in)
        instance = self.get_object()
        print(instance.certificate_id)
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        # serializer.is_valid(raise_exception=True)

        if serializer.is_valid():
            print("into")
            serializer.save()
            return Response(serializer.data)
        # data_out = serializer.data
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class LicViewsets(viewsets.ModelViewSet):
    queryset = JobseekerCertificate.objects.all()
    serializer_class =LicSerializer
    global logged_in_id
    @action(methods=['post', 'get'], detail=False, url_path='get_lic')
    def get_lic(self, request):
        user_id = logged_in_id
        if request.method == 'POST':
            global reg_id
            certificate_name = request.data["certificate_name"].split("#")
            certificate_link = request.data["certificate_link"].split("#")
            issuing_org = request.data["issuing_org"].split("#")

            print(certificate_name)
            for i in range(len(certificate_name)):
                if len(LicenseCertificate.objects.all()) == 0:
                    id = 0
                else:
                    id = LicenseCertificate.objects.order_by('-certificate_id').first().certificate_id
                id = id + 1
                if  issuing_org [i] == "?":
                    issuingorg = None
                else:
                    issuingorg  =  issuing_org [i]
                print(id)
                lic = LicenseCertificate(certificate_id=id, certificate_name=certificate_name[i],
                               issuing_org=issuing_org[i],
                               certificate_link=certificate_link[i])
                lic.save()
                jobseekerlicId = JobseekerCertificate.objects.order_by('-jobseeker_certificate_id').first().jobseeker_certificate_id
                jobseekerlicId+=1
                jobseekerlic= JobseekerCertificate(jobseeker_certificate_id = jobseekerlicId, certificate_id_id = id, user_id_id = user_id)
                jobseekerlic.save()

            print(request.data)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:

            objs = JobseekerCertificate.objects.filter(user_id=logged_in_id)
            serializer = LicSerializer(objs, many=True)

            return Response({
                'status': status.HTTP_204_NO_CONTENT,
                'data': serializer.data,
            })



    @action(methods=['post', 'get'], detail=False, url_path='get_lic_id')
    def get_license(self, request):
        if request.method == 'POST':
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            if len(LicenseCertificate.objects.all()) == 0:
                id = 0
            else:
                id = LicenseCertificate.objects.order_by('-certificate_id').first().certificate_id
            return Response({
                'status': status.HTTP_204_NO_CONTENT,
                'total_certis':str(id),
            })
class applicationViewsets(viewsets.ModelViewSet):
    queryset = JobApplication.objects.all()
    serializer_class = applicationSerializer
    # stat="notapplied"

    # global logged_in_id
    # if logged_in_id!=-1:
    #     user_id=logged_in_id
    # else:
    #     user_id = 1
    job_id = ""
    emp_id = ""
    mountfrom=""
    #employer job preview variables
    emp_appid=0
    emp_userid=0

    @action(methods=['post', 'get'], detail=False, url_path='getapplication')
    def apply(self, request):
        global logged_in_id
        if logged_in_id != -1:
            logged_user_id = logged_in_id
        else:
            logged_user_id = 1
        if request.method == 'POST':
            # print(request.data)
            if request.data['mount']=="true":#mount er shomoy post
                applicationViewsets.mountfrom = request.data['mountfrom']
                if request.data['mountfrom']=="job":
                    applicationViewsets.job_id = int(request.data['job_id'])
                else:
                    applicationViewsets.emp_id = int(request.data['emp_id'])
            else:#apply er somoy
                if request.data['type']=="apply":
                    print(request.data)
                    proj_list = request.data['projs'].split("#")
                    proj_id_list=""
                    pub_id_list = ""
                    lic_id_list = ""
                    pub_list=request.data['pubs'].split("#")
                    lic_list=request.data['lics'].split("#")
                    for i in range(1,len(proj_list)):
                        objs=Project.objects.filter(
                            project_name=proj_list[i]
                        )
                        # print("etaaaaaaaaa"+proj_list[i])
                        # print(len(objs))
                        proj_id=objs[0].project_id

                        # print(proj_id)
                        # print("idddddddddddd"+str(proj_id))
                        proj_id_list=proj_id_list+"#"+str(proj_id)

                    for i in range(1,len(pub_list)):
                        objs=Publication.objects.filter(
                            publication_name=pub_list[i]
                        )
                        pub_id=objs[0].publication_id
                        pub_id_list=pub_id_list+"#"+str(pub_id)

                    for i in range(1,len(lic_list)):
                        objs=LicenseCertificate.objects.filter(
                            certificate_name=lic_list[i]
                        )
                        lic_id=objs[0].certificate_id
                        lic_id_list=lic_id_list+"#"+str(lic_id)


                    allapplication = JobApplication.objects.all()
                    app_id = 1
                    if len(allapplication) == 0:
                        app_id = 1
                    else:
                        apps = JobApplication.objects.filter().order_by('-application_id')
                        #print(apps[0].application_id)
                        app_id = int(apps[0].application_id) + 1
                    now = datetime.now()
                    current_time = now.strftime("%H:%M:%S")
                    print("Current Time =", current_time)
                    todaydate = datetime.today().strftime('%Y-%m-%d')
                    print(app_id)
                    if request.data['resume']== "":
                        res=None
                    else:
                        res=request.data['resume']

                    applicationViewsets.job_id=int(request.data['job_id'])
                    application = JobApplication(application_id=int(app_id), user_id_id=int(logged_user_id), newjobpost_id_id=int(request.data['job_id']), apply_date=todaydate,apply_time=current_time,highlighted_projects=proj_id_list
                                                 ,highlighted_publications=pub_id_list,highlighted_lics=lic_id_list,extra_certificates=request.data['extras'],resume_link=res)
                    application.save()
                elif request.data['type']=="follow":
                    if request.data["iffollow"]=="false":
                        applicationViewsets.job_id = int(request.data['job_id'])
                        findselectedjob = NewJobpost.objects.filter(jobpost_id=int(applicationViewsets.job_id))
                        findselectedempid = int(findselectedjob[0].employer_id_id)
                        followobj = Follow.objects.filter(follower_id_id=int(logged_user_id), employer_id_id=findselectedempid)
                        followobj.delete()
                    else:
                        allfollow=Follow.objects.all()
                        f_id=1
                        if len(allfollow)==0:
                            f_id=1
                        else:
                            lists=Follow.objects.filter().order_by('-follow_id')
                            f_id=int(lists[0].follow_id)+1
                        applicationViewsets.job_id = int(request.data['job_id'])
                        findselectedjob = NewJobpost.objects.filter(jobpost_id=int(applicationViewsets.job_id))
                        findselectedempid = int(findselectedjob[0].employer_id_id)
                        followobj = Follow(follow_id=f_id,follower_id_id=int(logged_user_id),employer_id_id=findselectedempid)
                        followobj.save()
                elif request.data['type']=="profilefollow":
                    print("profile er follow te dhukse")
                    if request.data["iffollow"]=="false":
                        followobj = Follow.objects.filter(follower_id_id=int(logged_user_id), employer_id_id=applicationViewsets.emp_id)
                        followobj.delete()
                    else:
                        allfollow=Follow.objects.all()
                        f_id=1
                        if len(allfollow)==0:
                            f_id=1
                        else:
                            lists=Follow.objects.filter().order_by('-follow_id')
                            f_id=int(lists[0].follow_id)+1
                        followobj = Follow(follow_id=f_id,follower_id_id=int(logged_user_id),employer_id_id=applicationViewsets.emp_id)
                        followobj.save()
                else:
                    if request.data["ifshortlist"]=="false":
                        applicationViewsets.job_id = int(request.data['job_id'])
                        shortlist = JobShortlist.objects.filter(user_id_id=int(logged_user_id), newjobpost_id_id=int(request.data['job_id']))
                        shortlist.delete()
                    else:
                        allshortlist=JobShortlist.objects.all()
                        sh_id=1
                        if len(allshortlist)==0:
                            sh_id=1
                        else:
                            lists=JobShortlist.objects.filter().order_by('-jobshortlist_id')
                            sh_id=int(lists[0].jobshortlist_id)+1
                        applicationViewsets.job_id = int(request.data['job_id'])
                        shortlist=JobShortlist(jobshortlist_id=int(sh_id),user_id_id=int(logged_user_id), newjobpost_id_id=int(request.data['job_id']))
                        shortlist.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            if applicationViewsets.mountfrom=="job":
                str1="notapplied"
                apps = JobApplication.objects.filter(newjobpost_id_id=int(applicationViewsets.job_id),user_id_id=int(logged_user_id))
                print(apps)
                if len(apps)!=0:
                    str1="applied"

                str2 = "notshortlisted"
                sh = JobShortlist.objects.filter(newjobpost_id_id=int(applicationViewsets.job_id),
                                                     user_id_id=int(logged_user_id))
                print(sh)
                if len(sh) != 0:
                    str2 = "shortlisted"
                serializer = applicationSerializer(apps, many=True)

                str3 = "notfollowed"
                findselectedjob=NewJobpost.objects.filter(jobpost_id=int(applicationViewsets.job_id))
                findselectedempid=int(findselectedjob[0].employer_id_id)
                fl = Follow.objects.filter(employer_id_id=findselectedempid,
                                                 follower_id_id=int(logged_user_id))
                if len(fl) != 0:
                    str3 = "followed"
                serializer = applicationSerializer(apps, many=True)
                return Response({
                    'status': status.HTTP_204_NO_CONTENT,
                    'data':serializer.data,
                    'response': str1,
                    'short':str2,
                    'follow':str3
                })
            else:
                str3 = "notfollowed"
                fl = Follow.objects.filter(employer_id_id=applicationViewsets.emp_id,
                                           follower_id_id=int(logged_user_id))
                if len(fl) != 0:
                    str3 = "followed"

                return Response({
                    'status': status.HTTP_204_NO_CONTENT,
                    'follow': str3
                })

    @action(methods=['post', 'get'], detail=False, url_path='get_app_info')
    def get_app_info(self,request):
        global logged_in_id
        if logged_in_id != -1:
            logged_user_id = logged_in_id
        else:
            logged_user_id = 1
        if request.method=='POST':
            return Response(status=status.HTTP_204_NO_CONTENT)
        else :
            if len(JobApplication.objects.all()) == 0:
                id = 0
            else:
                id = JobApplication.objects.order_by('-application_id').first().application_id
            obj=JobApplication.objects.filter(application_id=id)
            proj_conc=obj[0].highlighted_projects.split("#")
            proj_ids=[]
            for i in range(1,len(proj_conc)):
                proj_ids.append(int(proj_conc[i]))
            projects=Project.objects.filter(project_id__in=proj_ids)
            print(projects)
            pub_conc = obj[0].highlighted_publications.split("#")
            pub_ids = []
            for i in range(1, len(pub_conc)):
                pub_ids.append(int(pub_conc[i]))
            publications = Publication.objects.filter(publication_id__in=pub_ids)
            print(publications)
            lic_conc = obj[0].highlighted_lics.split("#")
            lic_ids = []
            for i in range(1, len(lic_conc)):
                lic_ids.append(int(lic_conc[i]))
            licenses = LicenseCertificate.objects.filter(certificate_id__in=lic_ids)
            print(licenses)
            experiences=JobExperience.objects.filter(user_id_id=obj[0].user_id_id)
            print(experiences)
            ver_skills_ids=[]
            ver_skills=JobSeekerSkill.objects.filter(user_id_id=int(logged_user_id))
            for vs in ver_skills:  # for each jobskill
                vsid = int(vs.skill_id_id)
                # check if jobskill is present in uskill and he is open to that
                user_skill = JobSeekerSkill.objects.filter(user_id_id=int(logged_user_id), skill_id_id=vsid)
                skillflag = False
                usid = 0
                if len(user_skill) != 0:
                    skillflag = True
                    usid = int(user_skill[0].jobseeker_skill_id)
                # print(skillflag)
                if skillflag:  # user has that skill, check if he has given assessment and passed
                    assflag = False
                    ass = Assessment.objects.filter(jobseeker_skill_id_id=usid).order_by("-date")
                    if len(ass) != 0:
                        assflag = True
                        assmark = ass[0].marks_obtained
                        asspercent = assmark * 10
                    if assflag:  # user has given assessment, check cutoff mark
                        # print("ass dise")
                        todaydate = datetime.today().strftime('%Y-%m-%d')
                        cutoff = SkillMarkCutoff.objects.filter(skill_id_id=vsid, to_date__gte=todaydate,
                                                                from_date__lte=todaydate)
                        cutoffmark = cutoff[0].cutoff_percentage
                        # print("cutoffmark")
                        # print(cutoffmark)
                        if asspercent >= cutoffmark:
                            ver_skills_ids.append(vsid)

            ver_skilles_to_send=Skill.objects.filter(skill_id__in=ver_skills_ids)

            serializer=projSerializer(projects,many=True)
            serializer_1=pubSerializer(publications,many=True)
            serializer_2=certiSerializer(licenses,many=True)
            serializer_3 = jobexpSerializer(experiences, many=True)
            serializer_4 = SkillSerializer(ver_skilles_to_send, many=True)
            return Response({
                'status': status.HTTP_204_NO_CONTENT,
                'data': serializer.data,
                'data_1': serializer_1.data,
                'data_2' :serializer_2.data,
                'data_3': serializer_3.data,
                'resume': obj[0].resume_link,
                'data_4':serializer_4.data,
                'extras' :obj[0].extra_certificates,
            })

    @action(methods=['post', 'get'], detail=False, url_path='get_app_info_emp')
    def get_app_info_emp(self, request):
        if request.method == 'POST':
            print("post")
            applicationViewsets.emp_appid=int(request.data['app_id'])
            findapp=JobApplication.objects.filter(application_id=applicationViewsets.emp_appid)
            applicationViewsets.emp_userid=int(findapp[0].user_id_id)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            obj = JobApplication.objects.filter(application_id=applicationViewsets.emp_appid)
            app_user_id=obj[0].user_id_id
            proj_conc = obj[0].highlighted_projects.split("#")
            proj_ids = []
            for i in range(1, len(proj_conc)):
                proj_ids.append(int(proj_conc[i]))
            projects = Project.objects.filter(project_id__in=proj_ids)
            print(projects)
            pub_conc = obj[0].highlighted_publications.split("#")
            pub_ids = []
            for i in range(1, len(pub_conc)):
                pub_ids.append(int(pub_conc[i]))
            publications = Publication.objects.filter(publication_id__in=pub_ids)
            print(publications)
            lic_conc = obj[0].highlighted_lics.split("#")
            lic_ids = []
            for i in range(1, len(lic_conc)):
                lic_ids.append(int(lic_conc[i]))
            licenses = LicenseCertificate.objects.filter(certificate_id__in=lic_ids)
            print(licenses)
            experiences = JobExperience.objects.filter(user_id_id=obj[0].user_id_id)
            print(experiences)
            ver_skills_ids = []
            ver_skills = JobSeekerSkill.objects.filter(user_id_id=app_user_id)
            for vs in ver_skills:  # for each jobskill
                vsid = int(vs.skill_id_id)
                # check if jobskill is present in uskill and he is open to that
                user_skill = JobSeekerSkill.objects.filter(user_id_id=app_user_id, skill_id_id=vsid)
                skillflag = False
                usid = 0
                if len(user_skill) != 0:
                    skillflag = True
                    usid = int(user_skill[0].jobseeker_skill_id)
                # print(skillflag)
                if skillflag:  # user has that skill, check if he has given assessment and passed
                    assflag = False
                    ass = Assessment.objects.filter(jobseeker_skill_id_id=usid).order_by("-date")
                    if len(ass) != 0:
                        assflag = True
                        assmark = ass[0].marks_obtained
                        asspercent = assmark * 10
                    if assflag:  # user has given assessment, check cutoff mark
                        # print("ass dise")
                        todaydate = datetime.today().strftime('%Y-%m-%d')
                        cutoff = SkillMarkCutoff.objects.filter(skill_id_id=vsid, to_date__gte=todaydate,
                                                                from_date__lte=todaydate)
                        cutoffmark = cutoff[0].cutoff_percentage
                        # print("cutoffmark")
                        # print(cutoffmark)
                        if asspercent >= cutoffmark:
                            ver_skills_ids.append(vsid)

            ver_skilles_to_send = Skill.objects.filter(skill_id__in=ver_skills_ids)

            serializer = projSerializer(projects, many=True)
            serializer_1 = pubSerializer(publications, many=True)
            serializer_2 = certiSerializer(licenses, many=True)
            serializer_3 = jobexpSerializer(experiences, many=True)
            serializer_4 = SkillSerializer(ver_skilles_to_send, many=True)

            getjobseeker = Jobseeker.objects.filter(user_ptr_id=applicationViewsets.emp_userid)[0]
            # getjobseekerid=getjobseeker[0].user_id
            serializer_user = jobseekerSerializer(getjobseeker, many=False)
            return Response({
                'status': status.HTTP_204_NO_CONTENT,
                'user':serializer_user.data,
                'data': serializer.data,
                'data_1': serializer_1.data,
                'data_2': serializer_2.data,
                'data_3': serializer_3.data,
                'resume': obj[0].resume_link,
                'data_4': serializer_4.data,
                'extras': obj[0].extra_certificates,
            })

    @action(methods=['post', 'get'], detail=False, url_path='editapplication')
    def edit_apply(self, request):
        global logged_in_id
        if logged_in_id != -1:
            logged_user_id = logged_in_id
        else:
            logged_user_id = 1
        if request.method == 'POST':
            print(request.data)
            proj_list = request.data['projs'].split("#")
            proj_id_list = ""
            pub_id_list = ""
            lic_id_list = ""
            pub_list = request.data['pubs'].split("#")
            lic_list = request.data['lics'].split("#")
            for i in range(1, len(proj_list)):
                objs = Project.objects.filter(
                    project_name=proj_list[i]
                )
                print("etaaaaaaaaa" + proj_list[i])
                print(len(objs))
                proj_id = objs[0].project_id

                print(proj_id)
                print("idddddddddddd" + str(proj_id))
                proj_id_list = proj_id_list + "#" + str(proj_id)

            for i in range(1, len(pub_list)):
                objs = Publication.objects.filter(
                    publication_name=pub_list[i]
                )
                pub_id = objs[0].publication_id
                pub_id_list = pub_id_list + "#" + str(pub_id)

            for i in range(1, len(lic_list)):
                objs = LicenseCertificate.objects.filter(
                    certificate_name=lic_list[i]
                )
                lic_id = objs[0].certificate_id
                lic_id_list = lic_id_list + "#" + str(lic_id)

            allapplication = JobApplication.objects.all()
            app_id = 1

            if len(allapplication) == 0:
                app_id = 1
            else:
                apps = JobApplication.objects.filter().order_by('-application_id')
                # print(apps[0].application_id)
                app_id = int(apps[0].application_id)
            t=JobApplication.objects.filter(application_id=app_id)
            js=int(t[0].newjobpost_id_id)
            now = datetime.now()
            current_time = now.strftime("%H:%M:%S")
            print("Current Time =", current_time)
            todaydate = datetime.today().strftime('%Y-%m-%d')
            print(app_id)
            if request.data['resume'] == "":
                res = None
            else:
                res = request.data['resume']

            #applicationViewsets.job_id = int(request.data['job_id'])
            application = JobApplication(application_id=int(app_id), user_id_id=int(logged_user_id),
                                         newjobpost_id_id=js, apply_date=todaydate,
                                         apply_time=current_time, highlighted_projects=proj_id_list
                                         , highlighted_publications=pub_id_list, highlighted_lics=lic_id_list,
                                         extra_certificates=request.data['extras'], resume_link=res)
            application.save()

        return Response(status=status.HTTP_204_NO_CONTENT)


class appliedjobViewsets(viewsets.ModelViewSet):
    global logged_in_id
    if logged_in_id != -1:
        user_id = logged_in_id
    else:
        user_id = 1
    queryset = JobApplication.objects.filter(user_id_id=user_id)
    serializer_class = applicationSerializer

class shortlistedjobViewsets(viewsets.ModelViewSet):
    user_id=1
    queryset = JobShortlist.objects.filter(user_id_id=user_id)
    serializer_class = shortlistSerializer
    job_id=""
    @action(methods=['post', 'get'], detail=False, url_path='shortlist')
    def shortlist(self, request):
        if request.method == 'POST':
            print(request.data["id"])
            shortlistedjobViewsets.job_id = request.data['id']
            shortlist = JobShortlist.objects.filter(user_id_id=int(shortlistedjobViewsets.user_id),
                                                    newjobpost_id_id=int(shortlistedjobViewsets.job_id))
            shortlist.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            jobs=JobShortlist.objects.filter(user_id_id=shortlistedjobViewsets.user_id)

            serializer = shortlistSerializer(jobs, many=True)
            return Response({
                'status': status.HTTP_204_NO_CONTENT,
                'data': serializer.data,
            })


class questionViewsets(viewsets.ModelViewSet):
    skill_id =2

    @action(methods=['post', 'get'], detail=False, url_path='skillid')
    def skillid(self, request):
        if request.method == 'POST':
            id = request.data['skill_id']
            print(request.data)
            print(str(id))
            questionViewsets.skill_id = int(id)
        return Response(status=status.HTTP_204_NO_CONTENT)

    queryset= Question.objects.filter(skill_id=skill_id)
    print(queryset)
    serializer_class = questionSerializer

    @action(methods=['post', 'get'], detail=False, url_path='questionselect')
    def questionselect(self, request):
        if request.method == 'GET':
            # print(questionViewsets.skill_id)
            id = questionViewsets.skill_id
            tempset = Question.objects.filter(skill_id =id).order_by('?')
            # print(tempset)
            id_list = []
            count_1 = 0
            count_2 = 0
            flag_1 = 0
            flag_2 = 0
            for i in range(len(tempset)):
                if flag_1 == 0:
                    if tempset[i].mark == 1:
                        if count_1 == 6:
                            flag_1 = 1
                        else:
                            id_list.append(tempset[i].question_id)
                            count_1 = count_1 + 1
                if flag_2 == 0:
                    if tempset[i].mark == 2:
                        if count_2 == 2:
                            flag_2 = 1
                        else:
                            id_list.append(tempset[i].question_id)
                            count_2 = count_2 + 1
                if flag_1 == 1 and flag_2 == 1:
                    break

            print("it is tempppp")
            obj = Question.objects.filter(skill_id=id, question_id__in=id_list)

            # random.shuffle(queryset)
            serializer_class = questionSerializer
            serializer = questionSerializer(obj, many=True)
            print(serializer.data)
            return Response({
                'status': status.HTTP_204_NO_CONTENT,
                'data': serializer.data,
            })
        else :
            return Response(status=status.HTTP_204_NO_CONTENT)


    question_id = -1
    answer = ""
    total_num = 0

    @action(methods=['post', 'get'], detail=False, url_path='answer')
    def answer(self, request):
        global logged_in_id
        user_id = logged_in_id
        if request.method == 'POST':
            if request.data['type'] == "next":
                print("next theke ashche")
                question_id = request.data["question_id"]
                answer = request.data["answer"]
                # print(request.data)

                obj = Question.objects.filter(question_id=question_id)
                correct_ans = obj[0].answer
                ques_mark = obj[0].mark
                # print(correct_ans)

                if answer == correct_ans:
                    print("milse")
                    questionViewsets.total_num = questionViewsets.total_num + ques_mark
                else:
                    print("milenai")
                print(questionViewsets.total_num)
            else:  # finish
                print("finish theke ashche")
                question_id = request.data["question_id"]
                answer = request.data["answer"]
                print(request.data)

                obj = Question.objects.filter(question_id=question_id)
                correct_ans = obj[0].answer
                ques_mark = obj[0].mark
                print(correct_ans)

                if answer == correct_ans:
                    print("milse")
                    questionViewsets.total_num = questionViewsets.total_num + ques_mark
                else:
                    print("milenai")
                print(questionViewsets.total_num)
                print("final marks")
                print(questionViewsets.total_num)
                todaydate = datetime.today().strftime('%Y-%m-%d')
                allass = Assessment.objects.all()
                ass_id = 1
                if len(allass) == 0:
                    ass_id = 1
                else:
                    asses = Assessment.objects.filter().order_by('-assessment_id')
                    ass_id = int(asses[0].assessment_id) + 1
                jobseekerskill = JobSeekerSkill.objects.filter(user_id_id=user_id,
                                                               skill_id_id=questionViewsets.skill_id)
                print("js")
                print(user_id)
                print(questionViewsets.skill_id)
                print(jobseekerskill)
                jsid = jobseekerskill[0].jobseeker_skill_id
                assessment = Assessment(assessment_id=int(ass_id), marks_obtained=int(questionViewsets.total_num),
                                        jobseeker_skill_id_id=int(jsid), date=todaydate)
                assessment.save()
                # questionViewsets.total_num=0
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:

            todaydate = datetime.today().strftime('%Y-%m-%d')
            objs=SkillMarkCutoff.objects.filter(skill_id=questionViewsets.skill_id,from_date__lte=todaydate,to_date__gte=todaydate)
            per=objs[0].cutoff_percentage
            obtained_per=(questionViewsets.total_num/10)*100
            if obtained_per>=per:
                result="Passed"
            else:
                result="Failed"
            marks_obtained=str(questionViewsets.total_num)
            questionViewsets.total_num = 0
            serializer = Cutoff_Serializer(objs, many=True)
            return Response({
                'status': status.HTTP_204_NO_CONTENT,
                'data':serializer.data,
                'tot_mark': marks_obtained,
                'per': str(int(obtained_per)),
                'res': result,

            })


class cutoffViewsets(viewsets.ModelViewSet):
    queryset = SkillMarkCutoff.objects.all()
    serializer_class = Cutoff_Serializer

    @action(methods=['post', 'get'], detail=False, url_path='cutoffpercent')
    def cutoffPercent(self, request):
        global logged_in_id
        user_id = logged_in_id
        if request.method == 'GET':
            obj = JobSeekerSkill.objects.filter(user_id=user_id)
            # print(obj)
            id_list = []
            for i in range(len(obj)):
                print(obj[i].skill_id)
                id_list.append(obj[i].skill_id)
            print(id_list)
            skill = SkillMarkCutoff.objects.filter(skill_id_id__in=id_list)
            serializer = Cutoff_Serializer(skill, many=True)
            print(serializer.data)
            return Response({
                'status': status.HTTP_204_NO_CONTENT,
                'data': serializer.data,
            })

        else:
            return Response(status=status.HTTP_204_NO_CONTENT)


class assesmentViewsets(viewsets.ModelViewSet):
    queryset = Assessment.objects.all()
    serializer_class = assesmentSerializer




class employerViewsets(viewsets.ModelViewSet):
    queryset = Employer.objects.all()
    serializer_class = employerSerializer
    isdetails = False
    email = ""
    password = ""

    @action(methods=['post', 'get'], detail=False, url_path='get_companies')
    def get_companies(self, request):
        print("into get companies")
        if request.method == 'GET':
            objs = Employer.objects.all()
            serializer = employerSerializer(objs, many=True)
            print("Companies objects: ")
            print(serializer.data)
            post_jobs = ""
            i=0
            for obj in objs:
                id = obj.user_ptr_id
                print(id)
                jobs = NewJobpost.objects.filter(employer_id = id )
                job_no = len(jobs)
                # post_jobs = post_jobs+"#"+str(job_no)
                if i==0:
                    post_jobs = str(job_no)
                    i+=1
                else:
                    post_jobs = post_jobs + "#" + str(job_no)
            print(post_jobs)

            return Response({
                'status': status.HTTP_204_NO_CONTENT,
                'data': serializer.data,
                'response': post_jobs,

            })
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(methods=['post', 'get'], detail=False, url_path='emp')
    def get_employer(self, request):
        print("if er age")
        if request.method == 'GET':
            print("getttttt")
            global logged_in_id
            empid = logged_in_id
            emp = Employer.objects.filter(user_ptr_id=empid)
            serializer = employerSerializer(emp, many=True)
            # print(serializer.data)
            return Response({
                'status': status.HTTP_204_NO_CONTENT,
                'data': serializer.data,
            })
        return Response(status=status.HTTP_204_NO_CONTENT)
    # @action(methods=['post', 'get'], detail=False, url_path='get_jobpost')
    # def get_jobpost(self, request):
    #     print("into get job post")
    #     if request.method == 'GET':
    #         objs = NewJobpost.objects.all()
    #         serializer = employerSerializer(objs, many=True)
    #         print("Companies objects: ")
    #         print(serializer.data)
    #         return Response({
    #             'status': status.HTTP_204_NO_CONTENT,
    #             'data': serializer.data,
    #             'response': "send",
    #
    #         })
    #     return Response(status=status.HTTP_204_NO_CONTENT)

class empApplicantViewsets(viewsets.ModelViewSet):
    global logged_in_id
    if logged_in_id != -1:
        user_id = logged_in_id
    else:
        user_id = 1
    queryset = JobApplication.objects.all()
    serializer_class = applicationSerializer
    job_id=""
    filtername = ""
    filter_cat = ""
    filter_exp = ""
    filter_keyword_arr=[]

    @action(methods=['post', 'get'], detail=False, url_path='applist')
    def get_applist(self, request):
        if request.method == 'POST':
            empApplicantViewsets.job_id=request.data["job_id"]
            postViewsets_for_jobpost.filtername = request.data["filtername"]
            if request.data['filtername'] == "cat":
                postViewsets_for_jobpost.filter_cat = request.data["category"]
                # print(request.data["category"])
            if request.data['filtername'] == "exp":
                postViewsets_for_jobpost.filter_exp = request.data["req_exp"]
                # print(request.data["req_exp"])
            if request.data['filtername'] == "keyword":
                postViewsets_for_jobpost.filter_keyword_arr = request.data["keywords"]
                # print(request.data["req_exp"])
            if request.data['filtername'] == "mount":
                postViewsets_for_jobpost.filter_cat=""
                postViewsets_for_jobpost.filter_exp=""
                postViewsets_for_jobpost.filter_keyword_arr=[]
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            apps = JobApplication.objects.filter(newjobpost_id_id=int(empApplicantViewsets.job_id))
            applicant_ids=[]
            valid_applicant_ids = []
            for app in apps:
                applicant_ids.append(app.user_id_id)
            print(applicant_ids)
            for id in applicant_ids:
                print("applicant  "+str(id))
                flag1=False
                flag2=False
                flag3=False
                if postViewsets_for_jobpost.filter_cat != "":
                    print(postViewsets_for_jobpost.filter_cat)
                    temp = Jobseeker.objects.filter(user_ptr_id=int(id))
                    if temp[0].field==postViewsets_for_jobpost.filter_cat:
                        flag1=True
                else:
                    flag1=True

                if postViewsets_for_jobpost.filter_exp != "":
                    total_user_exp = 0
                    all_exp = JobExperience.objects.filter(user_id=int(id))
                    for exp in all_exp:
                        expval = exp.to_year - exp.from_year
                        total_user_exp = total_user_exp + expval
                    # print("total_user_exp:" + str(total_user_exp))
                    if postViewsets_for_jobpost.filter_exp == "Minimum 1 year":
                        if total_user_exp>=1:
                            flag2=True
                    elif postViewsets_for_jobpost.filter_exp == "Minimum 3 years":
                        if total_user_exp >= 3:
                            flag2 = True
                    else:
                        if total_user_exp >= 5:
                            flag2 = True
                else:
                    flag2 = True

                if len(postViewsets_for_jobpost.filter_keyword_arr)!=0:
                    print(postViewsets_for_jobpost.filter_keyword_arr)
                    keycheckarr=[]
                    for key in postViewsets_for_jobpost.filter_keyword_arr:
                        # print("loop")
                        # print(keycheckarr)
                        #name check
                        namecheck = Jobseeker.objects.filter(user_ptr_id=int(id),name__icontains=key)
                        if len(namecheck)!=0:
                            keycheckarr.append(True)
                            # print("name check")
                            # print(keycheckarr)
                            continue
                        #street check
                        streetcheck = Jobseeker.objects.filter(user_ptr_id=int(id),street__icontains=key)
                        if len(streetcheck)!=0:
                            keycheckarr.append(True)
                            # print("s check")
                            # print(keycheckarr)
                            continue
                        #thana check
                        thanacheck = Jobseeker.objects.filter(user_ptr_id=int(id),thana__icontains=key)
                        if len(thanacheck)!=0:
                            keycheckarr.append(True)
                            # print("th check")
                            # print(keycheckarr)
                            continue
                        #sdistrict check
                        discheck = Jobseeker.objects.filter(user_ptr_id=int(id),district__icontains=key)
                        if len(discheck)!=0:
                            keycheckarr.append(True)
                            # print("ds check")
                            # print(keycheckarr)
                            continue
                        #division check
                        divcheck = Jobseeker.objects.filter(user_ptr_id=int(id),division__icontains=key)
                        if len(divcheck)!=0:
                            keycheckarr.append(True)
                            # print("dv check")
                            # print(keycheckarr)
                            continue
                        # self desc check
                        desccheck = Jobseeker.objects.filter(user_ptr_id=int(id), self_desc__icontains=key)
                        if len(desccheck) != 0:
                            keycheckarr.append(True)
                            # print("desc check")
                            # print(keycheckarr)
                            continue
                        # nationality check
                        natiocheck = Jobseeker.objects.filter(user_ptr_id=int(id), nationality__icontains=key)
                        if len(natiocheck) != 0:
                            keycheckarr.append(True)
                            # print("nt check")
                            # print(keycheckarr)
                            continue
                        # field check
                        fieldcheck = Jobseeker.objects.filter(user_ptr_id=int(id), field__icontains=key)
                        if len(fieldcheck) != 0:
                            keycheckarr.append(True)
                            # print("f check")
                            # print(keycheckarr)
                            continue
                        # skill check
                        skillcheck = JobSeekerSkill.objects.filter(user_id_id=int(id), skill_id__skill_name__icontains=key)
                        if len(skillcheck) != 0:
                            # print("skill check")
                            keycheckarr.append(True)
                            # print(keycheckarr)
                            continue
                        # project name check
                        projnamecheck = Project.objects.filter(user_id_id=int(id), project_name__icontains=key)
                        if len(projnamecheck) != 0:
                            keycheckarr.append(True)
                            continue
                        # project desc check
                        projdesccheck = Project.objects.filter(user_id_id=int(id), project_short_desc__icontains=key)
                        if len(projdesccheck) != 0:
                            keycheckarr.append(True)
                            continue
                        # project language check
                        projlangcheck = Project.objects.filter(user_id_id=int(id), language__icontains=key)
                        if len(projlangcheck) != 0:
                            keycheckarr.append(True)
                            continue
                        # publication name check
                        pubnamecheck = Publication.objects.filter(user_id_id=int(id),
                                                                  publication_name__icontains=key)
                        if len(pubnamecheck) != 0:
                            keycheckarr.append(True)
                            continue
                        # publication venue check
                        pubvenuecheck = Publication.objects.filter(user_id_id=int(id), venue__icontains=key)
                        if len(pubvenuecheck) != 0:
                            keycheckarr.append(True)
                            continue
                        # certi name check
                        certinamecheck = JobseekerCertificate.objects.filter(user_id_id=int(id),
                                                                  certificate_id__certificate_name__icontains=key)
                        if len(certinamecheck) != 0:
                            keycheckarr.append(True)
                            continue
                        # certi org check
                        certiorgcheck = JobseekerCertificate.objects.filter(user_id_id=int(id),
                                                                             certificate_id__issuing_org__icontains=key)
                        if len(certiorgcheck) != 0:
                            keycheckarr.append(True)
                            continue
                        # exp name check
                        expnamecheck = JobExperience.objects.filter(user_id_id=int(id),
                                                                             experience_name__icontains=key)
                        if len(expnamecheck) != 0:
                            keycheckarr.append(True)
                            continue
                        # exp desc check
                        expdesccheck = JobExperience.objects.filter(user_id_id=int(id),
                                                                    description__icontains=key)
                        if len(expdesccheck) != 0:
                            keycheckarr.append(True)
                            continue
                        # exp org check
                        exporgcheck = JobExperience.objects.filter(user_id_id=int(id),
                                                                    organization_name__icontains=key)
                        if len(exporgcheck) != 0:
                            keycheckarr.append(True)
                            continue
                        # print("false dhukche")
                        keycheckarr.append(False)
                        # print(keycheckarr)
                    print("keycheck")
                    print(keycheckarr)
                    tempflag=True
                    for f in keycheckarr:
                        if f==False:
                            tempflag=False
                            break
                    flag3=tempflag
                    print("flag3")
                    print(flag3)
                else:
                    flag3=True

                if flag1 and flag2 and flag3:
                    valid_applicant_ids.append(int(id))
            print(valid_applicant_ids)

            apps2 = JobApplication.objects.filter(user_id_id__in=valid_applicant_ids,newjobpost_id_id=int(empApplicantViewsets.job_id)).order_by("application_id")
            print("~~applicants~~")
            print(apps2)

            markarr=[]

            jobskills=JobSkill.objects.filter(jobpost_id_id=int(empApplicantViewsets.job_id))
            # print(jobskills)
            idx=0
            for app in apps2:#for each applicant
                uid=int(app.user_id_id)
                # print(uid)
                tempmark=0
                #skill based mark
                for js in jobskills:#for each jobskill
                    jsid=int(js.skill_id_id)
                    #check if jobskill is present in uskill and he is open to that
                    user_skill=JobSeekerSkill.objects.filter(user_id_id=uid,skill_id_id=jsid,isOpenToWork=True)
                    skillflag=False
                    usid=0
                    if len(user_skill)!=0:
                        skillflag=True
                        usid=int(user_skill[0].jobseeker_skill_id)
                    # print(skillflag)
                    if skillflag: #user has that skill, check if he has given assessment and passed
                        assflag=False
                        ass=Assessment.objects.filter(jobseeker_skill_id_id=usid).order_by("-date")
                        if len(ass)!=0:
                            assflag=True
                            assmark=ass[0].marks_obtained
                            asspercent=assmark*10
                        if assflag: #user has given assessment, check cutoff mark
                            # print("ass dise")
                            todaydate = datetime.today().strftime('%Y-%m-%d')
                            cutoff=SkillMarkCutoff.objects.filter(skill_id_id=jsid,to_date__gte=todaydate,from_date__lte=todaydate)
                            cutoffmark=cutoff[0].cutoff_percentage
                            if asspercent>=cutoffmark:
                                tempmark=tempmark+10
                #field based mark
                tempjob=NewJobpost.objects.filter(jobpost_id=int(empApplicantViewsets.job_id))
                job_cat=tempjob[0].category

                tempuser=Jobseeker.objects.filter(user_ptr_id=uid)
                user_cat=tempuser[0].field

                if job_cat==user_cat:
                    tempmark=tempmark+10

                #exp based mark
                total_user_exp = 0
                all_exp = JobExperience.objects.filter(user_id=uid)
                for exp in all_exp:
                    expval = exp.to_year - exp.from_year
                    total_user_exp = total_user_exp + expval

                job_req=tempjob[0].required_experience
                if total_user_exp>=job_req:
                    tempmark=tempmark+total_user_exp


                markarr.append((int(tempmark),idx))
                idx=idx+1

            # print(markarr)
            markarr.sort(reverse=True)
            listapp = []
            for m in markarr:
                mark_idx=m[1]
                # print(mark_idx)
                listapp.append(apps2[mark_idx])


            # listapp=[]
            # for i in range(len(apps2)):
            #     listapp.append(apps2[i])


            serializer = applicationSerializer(listapp, many=True)

            return Response({
                'status': status.HTTP_204_NO_CONTENT,
                'data': serializer.data,
                'cat': postViewsets_for_jobpost.filter_cat,
                'exp': postViewsets_for_jobpost.filter_exp,
            })

pas_temp=make_pw_hash("1234")
skill1 = Skill(skill_id=1, skill_name="Python", gap_between_consecutive_attempts=30)
skill1.save()
skill2 = Skill(skill_id=2, skill_name="C++", gap_between_consecutive_attempts=30)
skill2.save()
skill3 = Skill(skill_id=3, skill_name="Angular", gap_between_consecutive_attempts=30)
skill3.save()
skill4 = Skill(skill_id=4, skill_name="Django", gap_between_consecutive_attempts=30)
skill4.save()
skill5 = Skill(skill_id=5, skill_name="Java", gap_between_consecutive_attempts=30)
skill5.save()
skill6 = Skill(skill_id=6, skill_name="ReactJS", gap_between_consecutive_attempts=30)
skill6.save()
skill7 = Skill(skill_id=7, skill_name="PostgreSQL", gap_between_consecutive_attempts=30)
skill7.save()
skill8 = Skill(skill_id=8, skill_name="Flask", gap_between_consecutive_attempts=30)
skill8.save()
skill9 = Skill(skill_id=9, skill_name="C", gap_between_consecutive_attempts=30)
skill9.save()
skill10 = Skill(skill_id=10, skill_name="JavaFX", gap_between_consecutive_attempts=30)
skill10.save()
skill11 = Skill(skill_id=11, skill_name="NodeJS", gap_between_consecutive_attempts=30)
skill11.save()
skill12 = Skill(skill_id=12, skill_name="Bash", gap_between_consecutive_attempts=30)
skill12.save()
skill13 = Skill(skill_id=13, skill_name="C#", gap_between_consecutive_attempts=30)
skill13.save()
skill14 = Skill(skill_id=14, skill_name="MongoDB", gap_between_consecutive_attempts=30)
skill14.save()
skill15 = Skill(skill_id=15, skill_name="PHP", gap_between_consecutive_attempts=30)
skill15.save()
skill16 = Skill(skill_id=16, skill_name="Laravel", gap_between_consecutive_attempts=30)
skill16.save()
skill17 = Skill(skill_id=17, skill_name="JQuery", gap_between_consecutive_attempts=30)
skill17.save()
skill18 = Skill(skill_id=18, skill_name="MySQL", gap_between_consecutive_attempts=30)
skill18.save()
skill19 = Skill(skill_id=19, skill_name="Swift", gap_between_consecutive_attempts=30)
skill19.save()
skill20 = Skill(skill_id=20, skill_name="PL/SQL", gap_between_consecutive_attempts=30)
skill20.save()
lic_1=LicenseCertificate(certificate_id=1,certificate_name="HTML, CSS, and Javascript for Web Developers",issuing_org="Coursera",certificate_link="https://firebasestorage.googleapis.com/v0/b/csrecruitz-fd59e.appspot.com/o/license%2Fhtmlcss.pdf?alt=media&token=dd2e3156-b892-4edd-90bf-05d580b736e8")
lic_1.save()
lic_2=LicenseCertificate(certificate_id=2,certificate_name="HTML, CSS, and Javascript for Web Developers (Advanced)",issuing_org="Coursera",certificate_link="https://firebasestorage.googleapis.com/v0/b/csrecruitz-fd59e.appspot.com/o/license%2Fhtml2.pdf?alt=media&token=46514382-30cd-4507-a3cb-21186ac6d020")
lic_2.save()
lic_3=LicenseCertificate(certificate_id=3,certificate_name="Machine Learning",issuing_org="Stanford Online",certificate_link="https://firebasestorage.googleapis.com/v0/b/csrecruitz-fd59e.appspot.com/o/license%2FML.pdf?alt=media&token=c3c9147e-f1af-4e9d-b7b7-f5a76b190238")
lic_3.save()
lic_4=LicenseCertificate(certificate_id=4,certificate_name="Improving Deep Neural Networks: Hyperparameter tuning, Regularization and Optimization",issuing_org="Coursera",certificate_link="https://firebasestorage.googleapis.com/v0/b/csrecruitz-fd59e.appspot.com/o/license%2Fdl1.pdf?alt=media&token=c09c1cc0-f83b-4e3e-87ec-bd5c3cce9071")
lic_4.save()
lic_5=LicenseCertificate(certificate_id=5,certificate_name="Neural Networks and Deep Learning",issuing_org="Coursera",certificate_link="https://firebasestorage.googleapis.com/v0/b/csrecruitz-fd59e.appspot.com/o/license%2Fdl2.pdf?alt=media&token=c4503d6d-0ca2-4797-8137-0854104fba39")
lic_5.save()
lic_6=LicenseCertificate(certificate_id=6,certificate_name="Introduction to Artificial Intelligence (AI)",issuing_org="Coursera",certificate_link="https://firebasestorage.googleapis.com/v0/b/csrecruitz-fd59e.appspot.com/o/license%2FAI.pdf?alt=media&token=79888840-be06-435e-a052-52380261cb6f")
lic_6.save()
lic_7=LicenseCertificate(certificate_id=7,certificate_name="AI for Everyone",issuing_org="ResearchGate",certificate_link="https://firebasestorage.googleapis.com/v0/b/csrecruitz-fd59e.appspot.com/o/license%2FAI2.pdf?alt=media&token=c4c17935-6e10-4d36-b161-5e03b12ba742")
lic_7.save()
user1 = Jobseeker(user_id=1, name="Adrita Hossain Nakshi", email="adrita_99@yahoo.com", password=pas_temp, thana="Lalbag",contact_no="01871666053",
                  district="Dhaka", division="Dhaka", father_name="Dr. Md. Elias Hossain",
                  mother_name="Dr. Zennat Ferdousi", date_of_birth="1999-02-06",
                  self_desc="I am a CS under-graduate. I love programming. I am keen to learning. Like Steve Jobs, I like to believe 'Everybody should learn to program a computer, because it teaches you how to think.'",
                  nationality="Bangladeshi", nid_number="12345678", field="Research and Development", pref_sal="40000",
                  pref_job_ntr="Full-time", pref_org_type="NGO", propic="https://firebasestorage.googleapis.com/v0/b/csrecruitz-fd59e.appspot.com/o/images%2Fnakshi.jpg?alt=media&token=0fd92bf9-8418-432c-9d7c-9a03291ab619",
                  resume="resumes_input/nakshi.docx")
user1.save()
proj=Project(project_id=1,project_name="Istishon",project_link="https://github.com/adrita1999/ishtishon",project_short_desc="This is our 2-2 term project. It is basically a railway ticket booking website.",user_id=user1,language="Python, Django, HTML, CSS, Oracle, JavaScript")
proj.save()
proj_2=Project(project_id=2,project_name="csRecruitz",project_link="https://github.com/adrita1999/csRecruitZ",project_short_desc="This is our 4-1 term project. It is a job searching website. The development of the project is still ongoing.",user_id=user1,language="Python, DjangoRESTFramework, HTML, CSS, ReactJS, PostgreSQL")
proj_2.save()
proj_3=Project(project_id=3,project_name="Gesture-Based-Mini-Piano",
               project_link="https://github.com/adrita1999/csRecruitZ",project_short_desc="We have made a mini version of piano using the "
                                                                                          "ATmega32 Microcontroller which is able to play different musical notes. We've been a bit ambitious here by making this "
                                                                                          "piano play according to the finger gestures made by the users. Also the users can record and save the tune they play "
                                                                                          "and playback it anytime they want.",user_id=user1,language="C, C++")
proj_3.save()

uskill1 = JobSeekerSkill(jobseeker_skill_id=1, isOpenToWork=True, skill_id=skill1, user_id=user1)
uskill1.save()
uskill2 = JobSeekerSkill(jobseeker_skill_id=2, isOpenToWork=True, skill_id=skill2, user_id=user1)
uskill2.save()
uskill3 = JobSeekerSkill(jobseeker_skill_id=3, isOpenToWork=True, skill_id=skill4, user_id=user1)
uskill3.save()
uskill4 = JobSeekerSkill(jobseeker_skill_id=4, isOpenToWork=False, skill_id=skill5, user_id=user1)
uskill4.save()
uskill5 = JobSeekerSkill(jobseeker_skill_id=5, isOpenToWork=True, skill_id=skill6, user_id=user1)
uskill5.save()
uskill6 = JobSeekerSkill(jobseeker_skill_id=6, isOpenToWork=True, skill_id=skill7, user_id=user1)
uskill6.save()
uskill7 = JobSeekerSkill(jobseeker_skill_id=7, isOpenToWork=False, skill_id=skill10, user_id=user1)
uskill7.save()

pub_1=Publication(publication_id=1,publication_name="SentiCR: A customized sentiment analysis tool for code review interactions",publication_link="https://ieeexplore.ieee.org/abstract/document/8115623",user_id=user1,venue="IEEE/ACM International Conference, Urbana, IL, USA",publication_year="2017-10-30")
pub_1.save()
pub_2=Publication(publication_id=2,publication_name="Machine Vision Based Rice Disease Recognition by Deep Learning",publication_link="https://ieeexplore.ieee.org/abstract/document/9038350",user_id=user1,venue="IEEE Sensors Journal",publication_year="2020-03-19")
pub_2.save()

js_1=JobseekerCertificate(jobseeker_certificate_id=1,certificate_id=lic_1,user_id=user1)
js_1.save()
js_2=JobseekerCertificate(jobseeker_certificate_id=2,certificate_id=lic_4,user_id=user1)
js_2.save()
js_3=JobseekerCertificate(jobseeker_certificate_id=3,certificate_id=lic_5,user_id=user1)
js_3.save()


job_exp1 = JobExperience(jobexperience_id=1, experience_name="Software Developer Intern", organization_name="Kona SL", from_year="2017",
                         description="It was my first experience as an intern. To be honest, it was an intimidating experience. But, with time"
                                     "I became quite comfortable in my position and became 'Employee of the Month'",
                         to_year="2018", user_id=user1)
job_exp1.save()
job_exp2 = JobExperience(jobexperience_id=2, experience_name="Junior Engineer", organization_name="Imagine Ltd.",
                        description="I have worked there for a short period, but it helped me gaining some good career perspective.",
                         from_year="2018", to_year="2020", user_id=user1)
job_exp2.save()

job_exp3 = JobExperience(jobexperience_id=3, experience_name="Assistant Executive Developer", organization_name="Optimizely",
                        description="This is the job I am currently doing. I started working as a group member in a project."
                                    "Gradually, I became full-time software developer and worked with my own team. Recently I got"
                                    "promoted as assistant executive developer and I am really enjoying my job.",
                         from_year="2020", to_year="2021", user_id=user1)
job_exp3.save()







user3 = Jobseeker(user_id=17, name="Shafqat Talukder Rakin", email="iamshafqatrakin@gmail.com", password=pas_temp, thana="Mirbag",contact_no="01871866053",
                  district="Dhaka", division="Dhaka", father_name="Md. Abu Zafar Talukder",
                  mother_name="Shahina Beethi", date_of_birth="1997-10-31",
                  self_desc="I am a CS under-graduate. I love programming. Python is my favourite language. I want to work with ReactJS in future.",
                  nationality="Bangladeshi", nid_number="1203858", field="Programming", pref_sal="50000",
                  pref_job_ntr="Full-time", pref_org_type="NGO", propic="https://firebasestorage.googleapis.com/v0/b/csrecruitz-fd59e.appspot.com/o/images%2Frand_pp.png?alt=media&token=d51fec8d-bc95-4290-a1b1-09601abde54f",
                  resume="resumes_input/nakshi.docx")
user3.save()
proj=Project(project_id=5,project_name="Pathao",project_link="https://github.com/adrita1999/ishtishon",project_short_desc="This is our 2-2 term project. It is basically a ride sharing app.",user_id=user3,language="Python, Django, HTML, CSS, Oracle, JavaScript")
proj.save()
proj_2=Project(project_id=6,project_name="Uber",project_link="https://github.com/adrita1999/csRecruitZ",project_short_desc="This is our 4-1 term project. I did full stack development on this project",user_id=user3,language="Python, DjangoRESTFramework, HTML, CSS, ReactJS, PostgreSQL")
proj_2.save()
proj_3=Project(project_id=7,project_name="Covid-Safe Room",
               project_link="https://github.com/adrita1999/csRecruitZ",project_short_desc="It is a hardware project.We used ATmega32 for this. Besides ATmega , we used an Arduino, servo motors, LCD display etc.",user_id=user3,language="C, C++")
proj_3.save()

uskill12 = JobSeekerSkill(jobseeker_skill_id=12, isOpenToWork=True, skill_id=skill1, user_id=user3)
uskill12.save()
uskill13 = JobSeekerSkill(jobseeker_skill_id=13, isOpenToWork=True, skill_id=skill5, user_id=user3)
uskill13.save()
uskill14 = JobSeekerSkill(jobseeker_skill_id=14, isOpenToWork=True, skill_id=skill7, user_id=user3)
uskill14.save()
uskill15 = JobSeekerSkill(jobseeker_skill_id=15, isOpenToWork=False, skill_id=skill17, user_id=user3)
uskill15.save()
uskill16 = JobSeekerSkill(jobseeker_skill_id=16, isOpenToWork=True, skill_id=skill18, user_id=user3)
uskill16.save()



pub_1=Publication(publication_id=5,publication_name="A localized fault tolerant load balancing algorithm for RFID systems",publication_link="https://ieeexplore.ieee.org/abstract/document/8115623",user_id=user3,venue="Journal of Ambient Intelligence",publication_year="2017-10-30")
pub_1.save()

js_1=JobseekerCertificate(jobseeker_certificate_id=8,certificate_id=lic_2,user_id=user3)
js_1.save()
js_2=JobseekerCertificate(jobseeker_certificate_id=9,certificate_id=lic_3,user_id=user3)
js_2.save()
js_3=JobseekerCertificate(jobseeker_certificate_id=10,certificate_id=lic_4,user_id=user3)
js_3.save()

job_exp1 = JobExperience(jobexperience_id=6, experience_name="Junior Programmer", organization_name="SuperCoder", from_year="2017",
                         to_year="2019", user_id=user3)
job_exp1.save()
job_exp2 = JobExperience(jobexperience_id=7, experience_name="Full Stack Developer", organization_name="Wipro Ltd.",
                         from_year="2018", to_year="2020", user_id=user3)
job_exp2.save()

job_exp3 = JobExperience(jobexperience_id=8, experience_name="PHP programmer", organization_name="Kolpolok Ltd",
                         from_year="2020", to_year="2021", user_id=user3)
job_exp3.save()


user2 = Jobseeker(user_id=2, name="Simantika Bhattacharjee Dristi", email="1705029@ugrad.cse.buet.ac.bd", password=pas_temp, thana="Lalbag",
                  district="Dhaka", division="Dhaka", father_name="Pintu Bhattacharjee",
                  mother_name="Soma Chowdhury", date_of_birth="1998-01-21",
                  self_desc="I am studying in CSE, BUET. I am good at programming. CSE is my first love and my one and only passion.",
                  nationality="Bangladeshi", nid_number="12349876", field="Teaching", propic="https://firebasestorage.googleapis.com/v0/b/csrecruitz-fd59e.appspot.com/o/images%2F154617714_2792879197694937_5512096372900003083_n%20(2).jpg?alt=media&token=4730bdb0-7979-424d-bbbd-eeb6e11425f6",
                  resume="resumes_input/nakshi.docx")
user2.save()

proj_4=Project(project_id=4,project_name="csRecruitz",project_link="https://github.com/adrita1999/csRecruitZ",project_short_desc="This is our 4-1 term project. It is a job searching website. The development of the project is still ongoing.",user_id=user2,language="Python, DjangoRESTFramework, HTML, CSS, ReactJS, PostgreSQL")
proj_4.save()


uskill8 = JobSeekerSkill(jobseeker_skill_id=8, isOpenToWork=True, skill_id=skill1, user_id=user2)
uskill8.save()
uskill9 = JobSeekerSkill(jobseeker_skill_id=9, isOpenToWork=False, skill_id=skill2, user_id=user2)
uskill9.save()
uskill10 = JobSeekerSkill(jobseeker_skill_id=10, isOpenToWork=True, skill_id=skill3, user_id=user2)
uskill10.save()
uskill11 = JobSeekerSkill(jobseeker_skill_id=11, isOpenToWork=False, skill_id=skill4, user_id=user2)
uskill11.save()
uskill12 = JobSeekerSkill(jobseeker_skill_id=12, isOpenToWork=True, skill_id=skill5, user_id=user2)
uskill12.save()


pub_3=Publication(publication_id=3,publication_name="Multiobjective Formulation of Multiple Sequence Alignment for Phylogeny Inference",publication_link="https://ieeexplore.ieee.org/abstract/document/8115623",user_id=user2,venue="IEEE Transactions on Cybernetics, 2020",publication_year="2020-10-30")
pub_3.save()
pub_4=Publication(publication_id=4,publication_name="Association mapping from sequencing reads using k-mers",publication_link="https://ieeexplore.ieee.org/abstract/document/9038350",user_id=user2,venue="eLife",publication_year="2018-10-23")
pub_4.save()

js_4=JobseekerCertificate(jobseeker_certificate_id=4,certificate_id=lic_1,user_id=user2)
js_4.save()
js_5=JobseekerCertificate(jobseeker_certificate_id=5,certificate_id=lic_2,user_id=user2)
js_5.save()
js_6=JobseekerCertificate(jobseeker_certificate_id=6,certificate_id=lic_5,user_id=user2)
js_6.save()
js_7=JobseekerCertificate(jobseeker_certificate_id=7,certificate_id=lic_6,user_id=user2)
js_7.save()

job_exp4 = JobExperience(jobexperience_id=4, experience_name="Lecturer", organization_name="UIU", from_year="2018",
                         to_year="2019", user_id=user2)
job_exp4.save()
job_exp5 = JobExperience(jobexperience_id=5, experience_name="Lecturer", organization_name="Brac University",
                         from_year="2019", to_year="2021", user_id=user2)
job_exp5.save()





user4 = Jobseeker(user_id=18, name="Joy Saha", email="iamjOysaha1.0@gmail.com", password=pas_temp, thana="Azimpur",contact_no="01871866053",
                  district="Dhaka", division="Dhaka", father_name="Md. Abu Zafar Talukder",
                  mother_name="Shahina Beethi", date_of_birth="1997-10-31",
                  self_desc="I am a CSE graduate from BUET. I am sincere and I love to explore new frameworks",
                  nationality="Bangladeshi", nid_number="1204598", field="DevOps", pref_sal="70000",
                  pref_job_ntr="Full-time", pref_org_type="NGO", propic="https://firebasestorage.googleapis.com/v0/b/csrecruitz-fd59e.appspot.com/o/images%2Frand_pp.png?alt=media&token=d51fec8d-bc95-4290-a1b1-09601abde54f",
                  resume="resumes_input/nakshi.docx")
user4.save()
proj=Project(project_id=8,project_name="CricInfo",project_link="https://github.com/adrita1999/ishtishon",project_short_desc="This is our 2-2 term project. It is a replication of ESPN cricinfo",user_id=user4,language="Java, Spring, SQL")
proj.save()
proj_2=Project(project_id=9,project_name="FootballMania",project_link="https://github.com/adrita1999/csRecruitZ",project_short_desc="Here, I tried to implement something like FIFA. I used PHP for this.",user_id=user4,language="PHP,Laravel")
proj_2.save()


uskill17 = JobSeekerSkill(jobseeker_skill_id=17, isOpenToWork=False, skill_id=skill19, user_id=user4)
uskill17.save()
uskill18 = JobSeekerSkill(jobseeker_skill_id=18, isOpenToWork=True, skill_id=skill8, user_id=user4)
uskill18.save()
uskill19 = JobSeekerSkill(jobseeker_skill_id=19, isOpenToWork=False, skill_id=skill7, user_id=user4)
uskill19.save()
uskill20 = JobSeekerSkill(jobseeker_skill_id=20, isOpenToWork=False, skill_id=skill12, user_id=user4)
uskill20.save()
uskill21= JobSeekerSkill(jobseeker_skill_id=21, isOpenToWork=True, skill_id=skill14, user_id=user4)
uskill21.save()



pub_1=Publication(publication_id=6,publication_name="Statistical binning enables an accurate coalescent-based estimation of the avian tree",publication_link="https://ieeexplore.ieee.org/abstract/document/8115623",user_id=user4,venue="Journal of BioTech",publication_year="2017-10-30")
pub_1.save()

js_1=JobseekerCertificate(jobseeker_certificate_id=11,certificate_id=lic_7,user_id=user4)
js_1.save()
js_2=JobseekerCertificate(jobseeker_certificate_id=12,certificate_id=lic_5,user_id=user4)
js_2.save()
js_3=JobseekerCertificate(jobseeker_certificate_id=13,certificate_id=lic_1,user_id=user4)
js_3.save()

job_exp1 = JobExperience(jobexperience_id=9, experience_name="DevOps Engineer (Mid)", organization_name="Otto BD", from_year="2016",
                         to_year="2019", user_id=user4)
job_exp1.save()
job_exp2 = JobExperience(jobexperience_id=10, experience_name="Blockchain DevOps Engineer", organization_name="Snaphyre Bangladesh",
                         from_year="2019", to_year="2021", user_id=user4)
job_exp2.save()


user5 = Jobseeker(user_id=19, name="Samira Akter", email="1705028@ugrad.cse.buet.ac.bd", password=pas_temp, thana="Lalbag",
                  district="Dhaka", division="Dhaka", father_name="Pintu Akter",
                  mother_name="Soma Begum", date_of_birth="1998-01-21",
                  self_desc="I am studying in CSE, BUET. I am good at programming. CSE is my first love and my one and only passion.",
                  nationality="Bangladeshi", nid_number="1122356", field="Security", propic="https://firebasestorage.googleapis.com/v0/b/csrecruitz-fd59e.appspot.com/o/images%2Frand_pp.png?alt=media&token=d51fec8d-bc95-4290-a1b1-09601abde54f",
                  resume="resumes_input/nakshi.docx")
user5.save()

proj_4=Project(project_id=10,project_name="csRecruitz",project_link="https://github.com/adrita1999/csRecruitZ",project_short_desc="This is our 4-1 term project. It is a job searching website. The development of the project is still ongoing.",user_id=user5,language="Python, DjangoRESTFramework, HTML, CSS, ReactJS, PostgreSQL")
proj_4.save()
proj_4=Project(project_id=11,project_name="Uber",project_link="https://github.com/adrita1999/csRecruitZ",project_short_desc="This is our 2-2 term project. It is a replication of Uber.",user_id=user5,language="Python, Django, HTML, CSS")
proj_4.save()


uskill22 = JobSeekerSkill(jobseeker_skill_id=22, isOpenToWork=True, skill_id=skill2, user_id=user5)
uskill22.save()
uskill23 = JobSeekerSkill(jobseeker_skill_id=23, isOpenToWork=False, skill_id=skill15, user_id=user5)
uskill23.save()
uskill24 = JobSeekerSkill(jobseeker_skill_id=24, isOpenToWork=True, skill_id=skill16, user_id=user5)
uskill24.save()
uskill26 = JobSeekerSkill(jobseeker_skill_id=26, isOpenToWork=False, skill_id=skill20, user_id=user5)
uskill26.save()

pub_3=Publication(publication_id=7,publication_name="CGAL: computing genome assembly likelihoods",publication_link="https://ieeexplore.ieee.org/abstract/document/8115623",user_id=user5,venue="Genome Biology, 14",publication_year="2013-05-09")
pub_3.save()

js_4=JobseekerCertificate(jobseeker_certificate_id=14,certificate_id=lic_1,user_id=user5)
js_4.save()
js_5=JobseekerCertificate(jobseeker_certificate_id=15,certificate_id=lic_2,user_id=user5)
js_5.save()
js_5=JobseekerCertificate(jobseeker_certificate_id=16,certificate_id=lic_3,user_id=user5)
js_5.save()
js_6=JobseekerCertificate(jobseeker_certificate_id=17,certificate_id=lic_6,user_id=user5)
js_6.save()
js_7=JobseekerCertificate(jobseeker_certificate_id=18,certificate_id=lic_7,user_id=user5)
js_7.save()

job_exp4 = JobExperience(jobexperience_id=11, experience_name="Security Junior Intern", organization_name="Dohatec", from_year="2019",
                         to_year="2021", user_id=user5)
job_exp4.save()


user6 = Jobseeker(user_id=20, name="Syeda Rukaiya Hossain", email="1705019@ugrad.cse.buet.ac.bd", password=pas_temp, thana="Lalbag",
                  district="Dhaka", division="Dhaka", father_name="Pintu Akter",
                  mother_name="Soma Begum", date_of_birth="1998-01-21",
                  self_desc="I am studying in CSE, BUET. I am good at programming. CSE is my first love and my one and only passion.",
                  nationality="Bangladeshi", nid_number="997268", field="Research and Development", propic="https://firebasestorage.googleapis.com/v0/b/csrecruitz-fd59e.appspot.com/o/images%2Frand_pp.png?alt=media&token=d51fec8d-bc95-4290-a1b1-09601abde54f",
                  resume="resumes_input/nakshi.docx")
user6.save()

proj_4=Project(project_id=12,project_name="IntDesk",project_link="https://github.com/adrita1999/csRecruitZ",project_short_desc="This is our 4-1 term project. It is a website for taking preparation for interviews.",user_id=user6,language="Python, NodeJS, ReactJS, MongoDB")
proj_4.save()
proj_4=Project(project_id=13,project_name="Uber",project_link="https://github.com/adrita1999/csRecruitZ",project_short_desc="This is our 2-2 term project. It is a replication of Uber.",user_id=user6,language="Python, Django, HTML")
proj_4.save()


uskill27 = JobSeekerSkill(jobseeker_skill_id=27, isOpenToWork=True, skill_id=skill9, user_id=user6)
uskill27.save()
uskill28 = JobSeekerSkill(jobseeker_skill_id=28, isOpenToWork=False, skill_id=skill2, user_id=user6)
uskill28.save()
uskill29 = JobSeekerSkill(jobseeker_skill_id=29, isOpenToWork=True, skill_id=skill5, user_id=user6)
uskill29.save()
uskill30 = JobSeekerSkill(jobseeker_skill_id=30, isOpenToWork=False, skill_id=skill19, user_id=user6)
uskill30.save()

pub_3=Publication(publication_id=8,publication_name="Comprehensive characterization of amino acid positions in protein structures reveals molecular effect of missense variants",publication_link="https://ieeexplore.ieee.org/abstract/document/8115623",user_id=user6,venue="Proceedings of the National Academy of Sciences of the United States of America, 2020",publication_year="2020-05-09")
pub_3.save()
pub_3=Publication(publication_id=9,publication_name="CRISPRpred(SEQ): A Sequence-Based Method for sgRNA On Target Activity Prediction Using Traditional Machine Learning",publication_link="https://ieeexplore.ieee.org/abstract/document/8115623",user_id=user6,venue="BMC Bioinformatics",publication_year="2021-05-01")
pub_3.save()

js_4=JobseekerCertificate(jobseeker_certificate_id=19,certificate_id=lic_3,user_id=user6)
js_4.save()
js_5=JobseekerCertificate(jobseeker_certificate_id=20,certificate_id=lic_4,user_id=user6)
js_5.save()
js_5=JobseekerCertificate(jobseeker_certificate_id=21,certificate_id=lic_5,user_id=user6)
js_5.save()
js_6=JobseekerCertificate(jobseeker_certificate_id=22,certificate_id=lic_6,user_id=user6)
js_6.save()


job_exp4 = JobExperience(jobexperience_id=12, experience_name="Software Developer", organization_name="Dohatec", from_year="2016",
                         to_year="2018", user_id=user6)
job_exp4.save()
job_exp4 = JobExperience(jobexperience_id=13, experience_name="Executive Software Developer", organization_name="Dohatec", from_year="2019",
                         to_year="2021", user_id=user6)
job_exp4.save()





user7 = Jobseeker(user_id=21, name="Joydip", email="iamjOysa1.0@gmail.com", password=pas_temp, thana="Azimpur",contact_no="01871866053",
                  district="Dhaka", division="Dhaka", father_name="Md. Abu Zafar Talukder",
                  mother_name="Shahina Beethi", date_of_birth="1997-10-31",
                  self_desc="I am a CSE graduate from MIT. I am sincere and I love to explore new frameworks. Deep learning and Simulation is my field of interest",
                  nationality="Bangladeshi", nid_number="045678", field="DevOps", pref_sal="70000",
                  pref_job_ntr="Full-time", pref_org_type="NGO", propic="https://firebasestorage.googleapis.com/v0/b/csrecruitz-fd59e.appspot.com/o/images%2Frand_pp.png?alt=media&token=d51fec8d-bc95-4290-a1b1-09601abde54f",
                  resume="resumes_input/nakshi.docx")
user7.save()
proj=Project(project_id=14,project_name="CricInfo",project_link="https://github.com/adrita1999/ishtishon",project_short_desc="This is our 2-2 term project. It is a replication of ESPN cricinfo",user_id=user7,language="Python, Flask, SQL")
proj.save()



uskill31 = JobSeekerSkill(jobseeker_skill_id=31, isOpenToWork=False, skill_id=skill19, user_id=user7)
uskill31.save()
uskill32 = JobSeekerSkill(jobseeker_skill_id=32, isOpenToWork=True, skill_id=skill8, user_id=user7)
uskill32.save()
uskill33 = JobSeekerSkill(jobseeker_skill_id=33, isOpenToWork=False, skill_id=skill9, user_id=user7)
uskill33.save()
uskill34 = JobSeekerSkill(jobseeker_skill_id=34, isOpenToWork=False, skill_id=skill1, user_id=user7)
uskill34.save()
uskill35 = JobSeekerSkill(jobseeker_skill_id=35, isOpenToWork=True, skill_id=skill12, user_id=user7)
uskill35.save()

pub_1=Publication(publication_id=10,publication_name="Statistical binning enables an accurate coalescent-based estimation of the avian tree",publication_link="https://ieeexplore.ieee.org/abstract/document/8115623",user_id=user7,venue="IBM international Conference",publication_year="2017-1-30")
pub_1.save()

js_1=JobseekerCertificate(jobseeker_certificate_id=23,certificate_id=lic_7,user_id=user7)
js_1.save()
js_2=JobseekerCertificate(jobseeker_certificate_id=24,certificate_id=lic_1,user_id=user7)
js_2.save()
js_3=JobseekerCertificate(jobseeker_certificate_id=25,certificate_id=lic_5,user_id=user7)
js_3.save()

job_exp1 = JobExperience(jobexperience_id=14, experience_name="DevOps Engineer", organization_name="Otto BD", from_year="2016",
                         to_year="2019", user_id=user7)
job_exp1.save()
job_exp2 = JobExperience(jobexperience_id=15, experience_name="DevOps Testing Professional", organization_name="Jenkins Ltd",
                         from_year="2019", to_year="2021", user_id=user7)
job_exp2.save()



emp1 = Employer(user_id=3, name="Optimizely", email="optimizely@gmail.com", password=pas_temp, district="Dhaka",
                division="Dhaka", org_type="NGO", establishment_year="2005")
emp1.save()
emp2 = Employer(user_id=4, name="Kona SL", email="kona@yahoo.com", password=pas_temp, district="Kishoreganj",
                division="Dhaka",
                org_type="NGO", establishment_year="2001")
emp2.save()
emp3 = Employer(user_id=5, name="Data Edge Ltd", email="dataedge@gmail.com", password=pas_temp, district="Sunamganj",
                division="Sylhet", org_type="NGO", establishment_year="1996")
emp3.save()
emp4 = Employer(user_id=6, name="Samsung", email="samsung@gmail.com", password="1234", district="Cox's Bazar",
                division="Chittagong", org_type="NGO", establishment_year="1981")
emp4.save()
emp5 = Employer(user_id=7, name="Intelligent Machines Limited", email="iml@gmail.com", password="1234",
                district="Rangpur", division="Rangpur", org_type="NGO", establishment_year="2015")
emp5.save()
emp6 = Employer(user_id=8, name="BEPRC", email="beprc@gmail.com", password="1234", district="Netrokona",
                division="Mymensingh",
                org_type="Government", establishment_year="1998")
emp6.save()
emp7 = Employer(user_id=9, name="Bangladesh Airforce", email="airbd@gmail.com", password="1234", district="Bogura",
                division="Rajshahi", org_type="Government", establishment_year="1975")
emp7.save()

emp8 = Employer(user_id=10, name="Brac", email="brac@edu.bd", password="1234", district="Dhaka",
                division="Dhaka", org_type="NGO", establishment_year="1975")
emp8.save()
emp9 = Employer(user_id=11, name="UIU", email="uiu@edu.com", password="1234", district="Dhaka",
                division="Dhaka", org_type="NGO", establishment_year="2000")
emp9.save()
emp10 = Employer(user_id=12, name="Samsung", email="samsungrj@gmail.com", password="1234", district="Rajshahi",
                division="Rajshahi", org_type="Private Firm", establishment_year="2001")
emp10.save()
emp11 = Employer(user_id=13, name="Bangladesh Airforce", email="airbdrj@gmail.com", password="1234", district="Rajshahi",
                division="Rajshahi", org_type="Government", establishment_year="1990")
emp11.save()
emp12 = Employer(user_id=14, name="Green University of Bangladesh", email="gubun@gmail.com", password="1234", district="Chittagong",
                division="Chittagong", org_type="Private Firm", establishment_year="2005")
emp12.save()
emp13 = Employer(user_id=15, name="Feni University (FU)", email="fu@gmail.com", password="1234", district="Chittagong",
                division="Chittagong", org_type="Government", establishment_year="2005")
emp13.save()
emp14 = Employer(user_id=16, name="boo2 Bangla", email="boo@gmail.com", password="1234", district="Sylhet",
                division="Sylhet", org_type="Private Firm", establishment_year="2010")
emp14.save()


jobpost1 = NewJobpost(jobpost_id=1, employer_id=emp1, title="Senior Software Engineer",
                      category="Research and Development", post_date="2022-06-28", deadline_date="2022-09-28",
                      salary=55000, required_experience=5, vacancies=2,
                      job_context="We are looking for a Sr. Software Engineer who will able to produce scalable software solutions. Selected Candidate will be the part of a cross-functional team that’s responsible for the full software development life cycle, from conception to deployment. As a Sr. Software Engineer, Candidate should be comfortable around both front-end and back-end coding languages, development frameworks and third-party libraries. Candidate should also be a team player with a knack for visual design and utility.",
                      job_nature="Full-time",
                      job_responsibilities="Work with development teams and product managers to ideate software solutions. Design client-side and server-side architecture",
                      edu_requirement="M.Sc/ B.Sc in Computer Science & Engineering or relevant degree from any reputed University",
                      additional_requirements="Work experience as a Full Stack Developer or similar role.",
                      application_process=" Email your CV from MY BDJOBS account.")
jobpost1.save()
jskill1 = JobSkill(job_skill_id=1,jobpost_id=jobpost1,skill_id=skill1)
jskill1.save()
jskill2 = JobSkill(job_skill_id=2,jobpost_id=jobpost1,skill_id=skill4)
jskill2.save()
jobpost2 = NewJobpost(jobpost_id=2, employer_id=emp2, title="Software Developer", category="Research and Development",
                      post_date="2022-06-26", deadline_date="2022-09-26", salary=50000, required_experience=3,
                      vacancies=2,
                      job_context="We are looking for a .NET Software Engineer to join our development team. The selected software engineers will get a chance to work with the latest technology stacks, exercising industry-standard principles & best practices to build scalable, high performance & robust software solutions.",
                      job_nature="Full-time",
                      job_responsibilities=" Good knowledge and understanding of ASP.NET Web Services, Restful Web APIs, OData, Entity Framework, Asynchronous Programming in C#, LINQ, Lambdas, Func, Action, Routing, Model Binding, MSSQL, MongoDb, etc.",
                      edu_requirement="Bachelor of Science (BSc) in Computer Science & Engineering, Bachelor of Computer Application (BCA) in Computer Applications",
                      additional_requirements="Age at least 24 years",
                      application_process="*Photograph must be enclosed with the resume.")
jobpost2.save()
jskill3 = JobSkill(job_skill_id=3,jobpost_id=jobpost2,skill_id=skill2)
jskill3.save()
jskill4 = JobSkill(job_skill_id=4,jobpost_id=jobpost2,skill_id=skill9)
jskill4.save()
jskill5 = JobSkill(job_skill_id=5,jobpost_id=jobpost2,skill_id=skill13)
jskill5.save()
jskill6 = JobSkill(job_skill_id=6,jobpost_id=jobpost2,skill_id=skill14)
jskill6.save()
jobpost3 = NewJobpost(jobpost_id=3, employer_id=emp3, title="Junior Software Engineer",
                      category="Research and Development", post_date="2022-07-10", deadline_date="2022-08-10",
                      salary=50000, required_experience=3, vacancies=3,
                      job_context="AMBER GROUP invites applications for recruitment in the position:",
                      job_nature="Full-time",
                      job_responsibilities="Excellent working knowledge in Asp.Net, Asp.net MVC, WCF, Web API, LINQ, Entity Framework .Net Core",
                      edu_requirement="B.Sc in Computer Science or Software Engineering from any reputed university.",
                      additional_requirements="The applicants should have experience in the following business area(s): Software Company",
                      application_process=" Send your CV to resume@amber.com.bd")
jobpost3.save()
jskill7 = JobSkill(job_skill_id=7,jobpost_id=jobpost3,skill_id=skill4)
jskill7.save()
jobpost4 = NewJobpost(jobpost_id=4, employer_id=emp4, title="Software Programmer ( Intern )", category="Programming",
                      post_date="2022-06-26", deadline_date="2022-09-26", salary=6000, required_experience=2,
                      vacancies=2,
                      job_context="In your CV you should share your leetcode.com username and GitHub user name.",
                      job_nature="Full-time",
                      job_responsibilities="Developing robust & user friendly secured web applications for managing the interchange of data between the server and the users.",
                      edu_requirement="Computer Science (CS)/ Bachelor of Science (B.Sc)/ Computer Science & Engineering (CSE)/ Software Engineering (SE) or any other relevant field.",
                      additional_requirements="Freshers are also encouraged to apply.",
                      application_process="*Photograph must be enclosed with the resume.")
jobpost4.save()
jskill8 = JobSkill(job_skill_id=8,jobpost_id=jobpost4,skill_id=skill1)
jskill8.save()
jskill9 = JobSkill(job_skill_id=9,jobpost_id=jobpost4,skill_id=skill3)
jskill9.save()
jskill10 = JobSkill(job_skill_id=10,jobpost_id=jobpost4,skill_id=skill4)
jskill10.save()
jskill11 = JobSkill(job_skill_id=11,jobpost_id=jobpost4,skill_id=skill8)
jskill11.save()
jskill12 = JobSkill(job_skill_id=12,jobpost_id=jobpost4,skill_id=skill11)
jskill12.save()
jobpost5 = NewJobpost(jobpost_id=5, employer_id=emp5, title="Software Engineer (Android)", category="Research and Development",
                      post_date="2022-06-23", deadline_date="2022-07-23", salary=60000, required_experience=2,
                      vacancies=2,
                      job_context="We are looking for passionate Software Engineers in the Android platform having strong knowledge and proven experience of a minimum 2 years in developing native Android apps. The ideal candidate will be responsible for developing high-quality applications. They will also be responsible for designing and implementing testable and scalable code.",
                      job_nature="Full-time",
                      job_responsibilities="Analyze product requirements and propose solutions to them.",
                      edu_requirement="Bachelor's degree in Computer Science or related field.",
                      additional_requirements="Deep Knowledge of Object-Oriented Design and Implementation.",
                      application_process="Send your CV to career@braincraftapps.com")
jobpost5.save()
jskill13 = JobSkill(job_skill_id=13,jobpost_id=jobpost5,skill_id=skill5)
jskill13.save()
jskill14 = JobSkill(job_skill_id=14,jobpost_id=jobpost5,skill_id=skill10)
jskill14.save()
jobpost6 = NewJobpost(jobpost_id=6, employer_id=emp5, title="Software Engineer (Asp.net Core, Angular)",
                      category="DevOps",
                      post_date="2022-07-02", deadline_date="2022-09-02", salary=45000, required_experience=1,
                      vacancies=2,
                      job_context="As a Software Engineer, you will be working with the team on different client projects and internal products expanding different platforms. You will work on implementing new features while taking ownership of the product or service. You will be working in a collaborative team with a supporting atmosphere. You will be able to strengthen your area of expertise to have shared success.",
                      job_nature="Full-time",
                      job_responsibilities="Work on feature development for different client projects and internal products.",
                      edu_requirement="Bachelor of Science (BSc) in CSE",
                      additional_requirements="Minimum 1 year of hands-on experience in software development.",
                      application_process="Send your CV to contact@creativitix.com")
jobpost6.save()
jskill15 = JobSkill(job_skill_id=15,jobpost_id=jobpost6,skill_id=skill3)
jskill15.save()
jobpost7 = NewJobpost(jobpost_id=7, employer_id=emp2, title="Software Engineer", category="DevOps",
                      post_date="2022-06-28", deadline_date="2022-09-28", salary=40000, required_experience=1,
                      vacancies=2,
                      job_context="We are looking for a Software Engineer to build functional and efficient server-client applications in Python. Responsibilities include participating in all phases of the software development lifecycle and be a good team player. If you’re a seasoned developer with a love for back-end technologies, have keen eye for detail and have problem-solving skills then we’d like to meet you.",
                      job_nature="Full-time",
                      job_responsibilities="Build efficient back-end features in Python",
                      edu_requirement="Bachelor of Science (BSc) in CSE in any reputed university.",
                      additional_requirements="Experience with Python frameworks (e.g., Django, Flask, FastAPI)",
                      application_process="Apply online")
jobpost7.save()
jskill16 = JobSkill(job_skill_id=16,jobpost_id=jobpost7,skill_id=skill4)
jskill16.save()
jskill17 = JobSkill(job_skill_id=17,jobpost_id=jobpost7,skill_id=skill8)
jskill13.save()
jskill18 = JobSkill(job_skill_id=18,jobpost_id=jobpost7,skill_id=skill1)
jskill18.save()
jobpost8 = NewJobpost(jobpost_id=8, employer_id=emp1, title="Junior Software Engineer",
                      category="DevOps", post_date="2022-07-08", deadline_date="2022-09-08",
                      salary=55000, required_experience=5, vacancies=2,
                      job_context="We are looking for a Sr. Software Engineer who will able to produce scalable software solutions. Selected Candidate will be the part of a cross-functional team that’s responsible for the full software development life cycle, from conception to deployment. As a Sr. Software Engineer, Candidate should be comfortable around both front-end and back-end coding languages, development frameworks and third-party libraries. Candidate should also be a team player with a knack for visual design and utility.",
                      job_nature="Full-time",
                      job_responsibilities="Bachelor of Science (BSc) in CSE in any reputed university.",
                      edu_requirement="M.Sc/ B.Sc in Computer Science & Engineering or relevant degree from any reputed University",
                      additional_requirements="Work experience as a Full Stack Developer or similar role.",
                      application_process=" Email your CV from MY BDJOBS account.")
jobpost8.save()
jskill19 = JobSkill(job_skill_id=19,jobpost_id=jobpost8,skill_id=skill1)
jskill19.save()
jobpost9 = NewJobpost(jobpost_id=9, employer_id=emp2, title="Senior Software Engineer (PHP - Laravel, Codeigniter)",
                      category="Research and Development",
                      post_date="2022-06-26", deadline_date="2022-08-26", salary=30000, required_experience=3,
                      vacancies=4,
                      job_context="Technical Experience : Codeigniter, Laravel, jQuery, Ajax, Vue.js, Mysql.",
                      job_nature="Full-time",
                      job_responsibilities="Analysis, Coding, Problem Solving and Team Leading.",
                      edu_requirement="Bachelor of Science (BSc)",
                      additional_requirements="Should have experience to guide software engineer.",
                      application_process="*Photograph must be enclosed with the resume.")
jobpost9.save()

jskill20 = JobSkill(job_skill_id=20,jobpost_id=jobpost9,skill_id=skill15)
jskill20.save()
jskill21 = JobSkill(job_skill_id=21,jobpost_id=jobpost9,skill_id=skill16)
jskill21.save()
jskill22 = JobSkill(job_skill_id=22,jobpost_id=jobpost9,skill_id=skill17)
jskill22.save()
jskill23 = JobSkill(job_skill_id=23,jobpost_id=jobpost9,skill_id=skill18)
jskill23.save()

jobpost10 = NewJobpost(jobpost_id=10, employer_id=emp3, title="Senior Application Security Engineer",
                       category="Security", post_date="2022-07-10", deadline_date="2022-08-28",
                       salary=70000, required_experience=10, vacancies=4,
                       job_context="Job Grade: Senior Principal Officer to First Assistant Vice President",
                       job_nature="Full-time",
                       job_responsibilities="Perform Information Security Assessment of different ICT Systems, Services, Application and processes like Core Banking Applications, Payment Systems, Digital Banking Applications, Card Management System, SWIFT, Active Directory etc.",
                       edu_requirement="MSc/BSc in Computer Science, Information Systems, Information Technology or a related field from reputed University with No Third Division in academic records.",
                       additional_requirements="Minimum 10 year(s) working experience in relevant area",
                       application_process=" Apply online")
jobpost10.save()
jskill24 = JobSkill(job_skill_id=24,jobpost_id=jobpost10,skill_id=skill1)
jskill24.save()
jskill25 = JobSkill(job_skill_id=25,jobpost_id=jobpost10,skill_id=skill12)
jskill25.save()
jskill26 = JobSkill(job_skill_id=26,jobpost_id=jobpost10,skill_id=skill19)
jskill26.save()
jobpost11 = NewJobpost(jobpost_id=11, employer_id=emp4, title="Senior Software Engineer (Full Stack Java Developer)",
                       category="DevOps",
                       post_date="2022-06-29", deadline_date="2022-09-29", salary=4000, required_experience=1,
                       vacancies=5,
                       job_context="We are seeking an experienced, self-motivated Java engineer with 1+ years of experience in developing applications and 1+ technology experience.",
                       job_nature="Full-time",
                       job_responsibilities="Collaborates with the development team and initiates process improvements for new and existing systems.",
                       edu_requirement="Bachelor of Science (BSc) in CSE, IT, SE, Diploma in Engineering in Computer Science & Engineering",
                       additional_requirements="Requires 1+ years of hands-on experience in java and PL/SQL.",
                       application_process="*Photograph must be enclosed with the resume.")
jobpost11.save()
jskill27 = JobSkill(job_skill_id=27,jobpost_id=jobpost11,skill_id=skill5)
jskill27.save()
jskill28 = JobSkill(job_skill_id=28,jobpost_id=jobpost11,skill_id=skill10)
jskill28.save()
jskill29 = JobSkill(job_skill_id=29,jobpost_id=jobpost11,skill_id=skill20)
jskill29.save()
jobpost12 = NewJobpost(jobpost_id=12, employer_id=emp5, title=" Software Developer (Java) [MFSD- 20220616]",
                       category="Research and Development",
                       post_date="2022-06-23", deadline_date="2022-08-23", salary=45000, required_experience=1,
                       vacancies=2,
                       job_context="Developers need to compile detailed technical documentation and user assistance material, requiring excellent written communication.",
                       job_nature="Full-time",
                       job_responsibilities="Coding, testing and troubleshooting so that developed software performs as per requirements",
                       edu_requirement="Bachelor of Science (BSc) in CSE, Post Graduate Diploma (PGD) in Computer Science & Engineering",
                       additional_requirements="Age 25 to 40 years",
                       application_process="Apply online")
jobpost12.save()
jskill30 = JobSkill(job_skill_id=30,jobpost_id=jobpost12,skill_id=skill5)
jskill30.save()
jskill31 = JobSkill(job_skill_id=31,jobpost_id=jobpost12,skill_id=skill10)
jskill31.save()
jobpost13 = NewJobpost(jobpost_id=13, employer_id=emp1,
                       title="Senior Test Engineer/Test Engineer (Software), Capital Market Solutions",
                       category="Research and Development",
                       post_date="2022-07-05", deadline_date="2022-09-05", salary=65000, required_experience=2,
                       vacancies=2,
                       job_context="Test Engineer - We are seeking an experienced, self-motivated test engineer with 1+ years of experience in software testing and for Senior Test Engineer- Test engineer with 1+ years of experience in developing software and 3+ software testing experience. ",
                       job_nature="Full-time",
                       job_responsibilities="and internal products.",
                       edu_requirement="Bachelor of Science (BSc) in CSE",
                       additional_requirements="Minimum 1 year of hands-on experience in software development.",
                       application_process="Send your CV to contact@creativitix.com")
jobpost13.save()
jskill32 = JobSkill(job_skill_id=32,jobpost_id=jobpost13,skill_id=skill1)
jskill32.save()
jskill33 = JobSkill(job_skill_id=33,jobpost_id=jobpost13,skill_id=skill5)
jskill33.save()

jobpost14 = NewJobpost(jobpost_id=14, employer_id=emp5,
                       title="Senior Developer (Software)",
                       category="DevOps",
                       post_date="2022-06-30", deadline_date="2022-08-30", salary=50000, required_experience=3,
                       vacancies=3,
                       job_context="We are looking for a Software Engineer to build functional and efficient server-client applications in Python. Responsibilities include participating in all phases of the software development lifecycle and be a good team player. If you’re a seasoned developer with a love for back-end technologies, have keen eye for detail and have problem-solving skills then we’d like to meet you.",
                       job_nature="Full-time",
                       job_responsibilities="Automates test coverage per platform capabilities and requirements. Establishes and maintains continuous build and integration testing on applicable platforms and assists with manual system and integration testing efforts.",
                       edu_requirement="Bachelor of Computer Science & Engineering",
                       additional_requirements="Ability to communicate clearly and concisely, both orally and in writing.",
                       application_process="*Photograph must be enclosed with the resume.")
jobpost14.save()
jobpost15 = NewJobpost(jobpost_id=15, employer_id=emp8,
                       title="Lecturer",
                       category="Teaching",
                       post_date="2022-08-11", deadline_date="2022-09-11", salary=40000, required_experience=1,
                       vacancies=2,
                       job_context="Lecturer in CSE,ICT.",
                       job_nature="Part-time",
                       job_responsibilities="Assisting with various departmental duties and providing academic support to professors and other staff",
                       edu_requirement="PhD, Master's equivalent degree in relevant discipline and must have first class/division in all examinations.",
                       additional_requirements="Publications (Standard/ reputed journal) -Minimum 2-3",
                       application_process="Send your CV to brac@edu.bd ")
jobpost15.save()
jobpost16 = NewJobpost(jobpost_id=16, employer_id=emp9,
                       title="Professor",
                       category="Teaching",
                       post_date="2022-08-13", deadline_date="2022-09-13", salary=60000, required_experience=7,
                       vacancies=3,
                       job_context="Associate Professor/ Professor in CSE, ICT.",
                       job_nature="Part-time",
                       job_responsibilities="Teaching and supervising undergraduate and graduate students",
                       edu_requirement="PhD, Master's equivalent degree in relevant discipline and must have first class/division in all examinations.",
                       additional_requirements="Publications (Standard/ reputed journal) -Minimum 10-12",
                       application_process="Send your CV to uiu@edu.com ")
jobpost16.save()
jobpost17 = NewJobpost(jobpost_id=17, employer_id=emp10,
                       title="Senior IT Security Engineer",
                       category="Security",
                       post_date="2022-08-12", deadline_date="2022-09-12", salary=65000, required_experience=7,
                       vacancies=1,
                       job_context="Sumsung is one of the biggest MFIs in the country as well in the world with more than 25 thousand employees serving around 73 lakh clients across the country. Here all the applications are developed by in-house IT team.",
                       job_nature="Full-time",
                       job_responsibilities="Manage day-to-day IT security operations.Monitor and analyze data flow to identify and block malicious behaviors and activities.",
                       edu_requirement="B.Sc./ M.Sc. in CSE/ IT/ MIS/ Software Engineering/ ECE/ EEE or equivalent and relevant engineering degree. Certification on CEH/ CHFI (Preferred)",
                       additional_requirements="Age at most 40 years.Monitoring and analyzing network traffic, host-based security appliance logs and IDS alerts.xperience in working with applications such as Firewall Software, SIEM, IDS/IPS, PAM, DLP, VA & PT, WAF, Load Balancer etc. is preferred.",
                       application_process="Apply online ")
jobpost17.save()
jobpost18 = NewJobpost(jobpost_id=18, employer_id=emp1,
                       title="Network & IT Security.",
                       category="Security",
                       post_date="2022-08-10", deadline_date="2022-09-10", salary=60000, required_experience=8,
                       vacancies=2,
                       job_context="Optimizely is one of the leading ICT System Integration company in Bangladesh providing ICT solutions to its wide customer base in Bangladesh and abroad. Optimizely is looking for the position of `Trainer - Network & IT Security` to assist in its Voice, Network & IT Security Department.",
                       job_nature="Part-time",
                       job_responsibilities="Implementing, managing, monitoring, and upgrading security measures for the protection of the organization's data, systems, and networks.",
                       edu_requirement="B.Sc Engineering in CSE. Certification on CEH/ CHFI (Preferred)",
                       additional_requirements="Strong understanding of a complete ISP environment is required.In depth knowledge in routing, DNS, MAIL, DHCP, Proxy and Bandwidth management system.",
                       application_process="Apply online ")
jobpost18.save()
jobpost19 = NewJobpost(jobpost_id=19, employer_id=emp11,
                       title="Junior Programmer.",
                       category="Programming",
                       post_date="2022-08-13", deadline_date="2022-09-13", salary=45000, required_experience=1,
                       vacancies=2,
                       job_context="We are looking for Junior Programmers with high problem-solving & analytical capability with a minimum of 1-year experience.",
                       job_nature="Part-time",
                       job_responsibilities="Continuously discover, evaluate, and implement new technologies to maximize development efficiency.",
                       edu_requirement="Bachelor's degree in any discipline.",
                       additional_requirements="Good knowledge of Data Structure & Algorithms.150+ ACM problems solved (Mandatory Requirement).",
                       application_process="airbdrj@gmail.com ")
jobpost19.save()
jobpost20 = NewJobpost(jobpost_id=20, employer_id=emp12,
                       title="Teaching",
                       category="Teaching",
                       post_date="2022-08-28", deadline_date="2022-09-28", salary=50000, required_experience=1,
                       vacancies=3,
                       job_context="We are looking for competent Faculty Members in different disciplines. We encourage individuals, who are academically competent and dedicated to educational development, to apply to be a part of Green Family.",
                       job_nature="Part-time",
                       job_responsibilities="Act as a Lecturer in the department of CSE of GUB.",
                       edu_requirement="4 years Hons/ Master degree in CSE. At least 3 First Division/Class/A Grade",
                       additional_requirements="Candidates having Masters degree will get preference.",
                       application_process="gub@gmail.com ")
jobpost20.save()
jobpost21 = NewJobpost(jobpost_id=21, employer_id=emp13,
                       title="Lecturer",
                       category="Teaching",
                       post_date="2022-08-27", deadline_date="2022-09-27", salary=45000, required_experience=2,
                       vacancies=3,
                       job_context="LTO for the Computer Science & Engineering (CSE).",
                       job_nature="Part-time",
                       job_responsibilities="Assist students and faculty members to carry out their research work.ay have to perform additional responsibilities of the department;",
                       edu_requirement="4 years Hons/ Master degree in CSE.",
                       additional_requirements="Experienced candidates will be given preference.",
                       application_process="fu@gmail.com ")
jobpost21.save()
jobpost22 = NewJobpost(jobpost_id=22, employer_id=emp10,
                       title="Team Lead- Information Security",
                       category="Security",
                       post_date="2022-08-26", deadline_date="2022-09-26", salary=70000, required_experience=3,
                       vacancies=2,
                       job_context="Main Purpose of this job is ensure information security of the Group, Review computer and computer networked device / equipment’s configuration and recommend configuration based on CIS control.",
                       job_nature="Full-time",
                       job_responsibilities="Implementation of information security process, policy, solution to the entire organization.",
                       edu_requirement="B.Sc (Honors) in CSE, CSC, TE, ICE, ETE or related science faculty",
                       additional_requirements="at least 3 year as Managerial position.",
                       application_process="sumsung@gmail.com ")
jobpost22.save()
jobpost23 = NewJobpost(jobpost_id=23, employer_id=emp6,
                       title="Trainee Engineer, Network & IT Security",
                       category="Security",
                       post_date="2022-08-28", deadline_date="2022-09-28", salary=60000, required_experience=2,
                       vacancies=2,
                       job_context="BEPRC limited is looking for some suitable young Fresh Graduates as Trainee for the position of `Trainee - Network & IT Security` to assist in its Voice, Network & IT Security Department.",
                       job_nature="Full-time",
                       job_responsibilities="Implementing, managing, monitoring, and upgrading security measures for the protection of the organization's data, systems, and networks..",
                       edu_requirement="B.Sc Engineering in CSE.",
                       additional_requirements="Strong understanding of a complete ISP environment is required.",
                       application_process="beprc@gmail.com ")
jobpost23.save()

jobpost24 = NewJobpost(jobpost_id=24, employer_id=emp14,
                       title="Power App Developer Freelance for Projects",
                       category="Freelancing",
                       post_date="2022-08-27", deadline_date="2022-09-27", salary=50000, required_experience=2,
                       vacancies=2,
                       job_context="We manage IT projects of any kind in Netherlands. We frequently are asked for Power App development work and are seeking a freelance, work-from-the-home Power app developer to take on the project with our Bangladesh Project managers..",
                       job_nature="Part-time",
                       job_responsibilities="Develop according the specifications.Supply technical support after the developed application is live.",
                       edu_requirement="Diploma in English and IT.",
                       additional_requirements="Person with disability are encouraged to apply.",
                       application_process="boo@gmail.com ")
jobpost24.save()


jskill34 = JobSkill(job_skill_id=34,jobpost_id=jobpost14,skill_id=skill1)
jskill34.save()
jskill35 = JobSkill(job_skill_id=35,jobpost_id=jobpost14,skill_id=skill5)
jskill35.save()
jskill36 = JobSkill(job_skill_id=36,jobpost_id=jobpost1,skill_id=skill2)
jskill36.save()
question1 = Question(question_id=1, skill_id=skill2,
                     question_text="The library function exit( ) causes an exit from - ",
                     optionA="The program in which it occurs",
                     optionB="The function in which it occurs",
                     optionC="The block in which it occurs",
                     optionD="The loop in which it occurs",


                     mark=1,

                     answer="1",


                     time_limit="0:30")
question1.save()
question2 = Question(question_id=2, skill_id=skill2, question_text="In a linked list - ",
                     optionA=" Each link contains data or a pointer to data",
                     optionB="Links are stored in an array",
                     optionC="A array of pointers point to the link",
                     optionD=" Each link contains a pointer to the next link",


                     mark=1,

                     answer="4",


                     time_limit="0:30")
question2.save()
question3 = Question(question_id=3, skill_id=skill2,
                     question_text="In C++, which of the following can legitimately be passed to a function?",
                     optionA="A constant",
                     optionB="A variable",
                     optionC="A structure",
                     optionD="All of these",


                     mark=1,

                     answer="4",


                     time_limit="0:30")
question3.save()
question4 = Question(question_id=4, skill_id=skill2,
                     question_text="The dot operator connects which of the following two entities? ",
                     optionA=" Class object and member of that class",
                     optionB=" Class and member of that class",
                     optionC="Class object and a class",
                     optionD="Class member and class object",


                     mark=1,

                     answer="1",

                     time_limit="0:30")
question4.save()
question5 = Question(question_id=5, skill_id=skill2, question_text="A static function -  ",
                     optionA="Should be called when an object is destroyed",
                     optionB="Can be called using the class name and function",
                     optionC="Is closely connected with an individual object of a class",
                     optionD=" Is used when a dummy object must be created",


                     mark=1,

                     answer="2",

                     time_limit="0:30")
question5.save()
question6 = Question(question_id=6, skill_id=skill2, question_text="Which one of the following is a keyword?",
                     optionA="Size",
                     optionB="Key",
                     optionC="Jump",
                     optionD="Switch",
                     mark=1,
                     answer="4",
                     time_limit="0:30")
question6.save()
question7 = Question(question_id=7, skill_id=skill2, question_text="Which of the following is the correct syntax of including a user defined header files in C++?",
                     optionA="#include [userdefined]",
                     optionB="#include “userdefined”",
                     optionC="#include <userdefined.h>",
                     optionD="#include <userdefined>",
                     mark=1,
                     answer="2",
                     time_limit="0:30")
question7.save()
question8 = Question(question_id=8, skill_id=skill2, question_text="Which of the following is a correct identifier in C++?",
                     optionA="VAR_1234",
                     optionB="$var_name",
                     optionC="7VARNAME",
                     optionD="7var_name",
                     mark=2,
                     answer="1",
                     time_limit="0:45")
question8.save()
question9 = Question(question_id=9, skill_id=skill2, question_text="Which of the following approach is used by C++?",
                     optionA="Left-right",
                     optionB="Right-left",
                     optionC="Bottom-up",
                     optionD="Top-down",
                     mark=2,
                     answer="3",
                     time_limit="0:45")
question9.save()
question10 = Question(question_id=10, skill_id=skill2, question_text="What happens if the following C++ statement is compiled and executed?\n"
                                                                     "int *ptr = NULL;\n"
                                                                     "delete ptr;",
                     optionA="The program is not semantically correct",
                     optionB="The program is compiled and executed successfully",
                     optionC="The program gives a compile-time error",
                     optionD="The program compiled successfully but throws an error during run-time",
                     mark=2,
                     answer="2",
                     time_limit="0:45")
question10.save()
question11 = Question(question_id=11, skill_id=skill2, question_text="What is the difference between delete and delete[] in C++?",
                     optionA="delete is syntactically correct but delete[] is wrong and hence will give an error if used in any case",
                     optionB="delete is used to delete normal objects whereas delete[] is used to pointer objects",
                     optionC="delete is a keyword whereas delete[] is an identifier",
                     optionD="delete is used to delete single object whereas delete[] is used to multiple(array/pointer of) objects",
                     mark=1,
                     answer="4",
                     time_limit="0:30")
question11.save()
question12 = Question(question_id=12, skill_id=skill2, question_text="What happens if the following program is executed in C and C++?\n#include <stdio.h>\nint main(void){\nint new = 5;\nprintf(\"%d\", new); }",
                     optionA="Error in C and successful execution in C++",
                     optionB="Error in both C and C++",
                     optionC="Error in C++ and successful execution in C",
                     optionD="A successful run in both C and C++",
                     mark=2,
                     answer="3",
                     time_limit="0:45")
question12.save()
question13 = Question(question_id=13, skill_id=skill2, question_text="Which of the following type is provided by C++ but not C?",
                     optionA="double",
                     optionB="float",
                     optionC="int",
                     optionD="bool",
                     mark=1,
                     answer="4",
                     time_limit="0:30")
question13.save()
question14 = Question(question_id=14, skill_id=skill2, question_text="By default, all the files in C++ are opened in _________ mode.",
                     optionA="Binary",
                     optionB="VTC",
                     optionC="Text",
                     optionD="ISCII",
                     mark=1,
                     answer="3",
                     time_limit="0:30")
question14.save()
question15 = Question(question_id=15, skill_id=skill2, question_text="What is the size of wchar_t in C++?",
                     optionA="Based on the number of bits in the system",
                     optionB="2 or 4",
                     optionC="4",
                     optionD="2",
                     mark=2,
                     answer="1",
                     time_limit="0:45")
question15.save()
question16 = Question(question_id=16, skill_id=skill1, question_text="What will be the value of the following Python expression? 4 + 3 % 5",
                     optionA="7",
                     optionB="2",
                     optionC="4",
                     optionD="1",
                     mark=2,
                     answer="1",
                     time_limit="0:45")
question16.save()
question17 = Question(question_id=17, skill_id=skill1,
                      question_text="Which of the following character is used to give single-line comments in Python?",
                     optionA="//",
                     optionB="#",
                     optionC="!",
                     optionD="/*",
                     mark=2,
                     answer="2",
                     time_limit="0:45")
question17.save()
question18 = Question(question_id=18, skill_id=skill1, question_text=" What will be the output of the following Python code?\n"
                                                                     "i=1\n"
                                                                     "while True:\n"
                                                                     "if i%3 == 0:\n"
                                                                     "print(i)\n"
                                                                     "i+=1",
                     optionA="1 2 3",
                     optionB="error",
                     optionC="1 2",
                     optionD="none of the mentioned",
                     mark=2,
                     answer="2",
                     time_limit="0:45")
question18.save()
question19 = Question(question_id=19, skill_id=skill1, question_text="What is the order of precedence in python?",
                     optionA="Exponential, Parentheses, Multiplication, Division, Addition, Subtraction",
                     optionB="Exponential, Parentheses, Division, Multiplication, Addition, Subtraction",
                     optionC="Parentheses, Exponential, Multiplication, Division, Subtraction, Addition",
                     optionD="Parentheses, Exponential, Multiplication, Division, Addition, Subtraction",
                     mark=1,
                     answer="4",
                     time_limit="0:30")
question19.save()
question20 = Question(question_id=20, skill_id=skill1, question_text="What are the values of the following Python expressions?\n"
                                                                     " 2**(3**2)\n"
                                                                     "(2**3)**2\n"
                                                                     "2**3**2",
                     optionA="512, 64, 512",
                     optionB="512, 512, 512",
                     optionC="64, 512, 64",
                     optionD="64, 64, 64",
                     mark=2,
                     answer="1",
                     time_limit="0:45")
question20.save()
question21 = Question(question_id=21, skill_id=skill1, question_text="What will be the output of the following Python code snippet if x=1?\n"
                                                                     "x<<2",
                     optionA="4",
                     optionB="2",
                     optionC="1",
                     optionD="8",
                     mark=2,
                     answer="1",
                     time_limit="0:45")
question21.save()
question22 = Question(question_id=22, skill_id=skill1,
                     question_text=" Which of the following is the truncation division operator in Python?",
                     optionA="|",
                     optionB="//",
                     optionC=" /",
                     optionD=" %",
                     mark=1,
                     answer="2",
                     time_limit="0:30")
question22.save()
question23 = Question(question_id=23, skill_id=skill1,
                     question_text="Which of the following functions is a built-in function in python?",
                     optionA="factorial()",
                     optionB="print()",
                     optionC="seed()",
                     optionD="sqrt()",
                     mark=1,
                     answer="2",
                     time_limit="0:30")
question23.save()
question24 = Question(question_id=24, skill_id=skill1,
                     question_text="What will be the output of the following Python function?\n"
                                   "min(max(False,-3,-4), 2,7)",
                     optionA="-4",
                     optionB="-3",
                     optionC="2",
                     optionD="False",
                     mark=2,
                     answer="4",
                     time_limit="0:45")
question24.save()
question25 = Question(question_id=25, skill_id=skill1,
                     question_text="Which keyword is used for function in Python language?",
                     optionA="Function",
                     optionB="Def",
                     optionC="Fun",
                     optionD="Define",
                     mark=1,
                     answer="2",
                     time_limit="0:30")
question25.save()
question26 = Question(question_id=26, skill_id=skill1,
                     question_text="Which one of the following is not a keyword in Python language?",
                     optionA="pass",
                     optionB="eval",
                     optionC="assert",
                     optionD="nonlocal",
                     mark=1,
                     answer="2",
                     time_limit="0:30")
question26.save()
question27 = Question(question_id=27, skill_id=skill1,
                     question_text=" Which type of Programming does Python support?",
                     optionA="object-oriented programming",
                     optionB="structured programming",
                     optionC="functional programming",
                     optionD="all of the mentioned",
                     mark=1,
                     answer="4",
                     time_limit="0:30")
question27.save()


cut1=SkillMarkCutoff(cutoff_id=1,skill_id_id=2,cutoff_percentage=80,from_date="1999-02-06",to_date="2024-02-06")
cut1.save()
cut2=SkillMarkCutoff(cutoff_id=2,skill_id_id=1,cutoff_percentage=80,from_date="1999-02-06",to_date="2024-02-06")
cut2.save()
cut3=SkillMarkCutoff(cutoff_id=3,skill_id_id=3,cutoff_percentage=80,from_date="1999-02-06",to_date="2024-02-06")
cut3.save()
cut4=SkillMarkCutoff(cutoff_id=4,skill_id_id=4,cutoff_percentage=80,from_date="1999-02-06",to_date="2024-02-06")
cut4.save()
cut5=SkillMarkCutoff(cutoff_id=5,skill_id_id=5,cutoff_percentage=80,from_date="1999-02-06",to_date="2024-02-06")
cut5.save()
cut6=SkillMarkCutoff(cutoff_id=6,skill_id_id=6,cutoff_percentage=80,from_date="1999-02-06",to_date="2024-02-06")
cut6.save()
cut7=SkillMarkCutoff(cutoff_id=7,skill_id_id=7,cutoff_percentage=80,from_date="1999-02-06",to_date="2024-02-06")
cut7.save()
cut8=SkillMarkCutoff(cutoff_id=8,skill_id_id=8,cutoff_percentage=80,from_date="1999-02-06",to_date="2024-02-06")
cut8.save()
cut9=SkillMarkCutoff(cutoff_id=9,skill_id_id=9,cutoff_percentage=80,from_date="1999-02-06",to_date="2024-02-06")
cut9.save()
cut10=SkillMarkCutoff(cutoff_id=10,skill_id_id=10,cutoff_percentage=80,from_date="1999-02-06",to_date="2024-02-06")
cut10.save()
cut11=SkillMarkCutoff(cutoff_id=11,skill_id_id=11,cutoff_percentage=80,from_date="1999-02-06",to_date="2024-02-06")
cut11.save()
cut12=SkillMarkCutoff(cutoff_id=12,skill_id_id=12,cutoff_percentage=80,from_date="1999-02-06",to_date="2024-02-06")
cut12.save()
cut13=SkillMarkCutoff(cutoff_id=13,skill_id_id=13,cutoff_percentage=80,from_date="1999-02-06",to_date="2024-02-06")
cut13.save()
cut14=SkillMarkCutoff(cutoff_id=14,skill_id_id=14,cutoff_percentage=80,from_date="1999-02-06",to_date="2024-02-06")
cut14.save()
cut15=SkillMarkCutoff(cutoff_id=15,skill_id_id=15,cutoff_percentage=80,from_date="1999-02-06",to_date="2024-02-06")
cut15.save()
cut16=SkillMarkCutoff(cutoff_id=16,skill_id_id=16,cutoff_percentage=80,from_date="1999-02-06",to_date="2024-02-06")
cut16.save()
cut17=SkillMarkCutoff(cutoff_id=17,skill_id_id=17,cutoff_percentage=80,from_date="1999-02-06",to_date="2024-02-06")
cut17.save()
cut18=SkillMarkCutoff(cutoff_id=18,skill_id_id=18,cutoff_percentage=80,from_date="1999-02-06",to_date="2024-02-06")
cut18.save()
cut19=SkillMarkCutoff(cutoff_id=19,skill_id_id=19,cutoff_percentage=80,from_date="1999-02-06",to_date="2024-02-06")
cut19.save()
cut20=SkillMarkCutoff(cutoff_id=20,skill_id_id=20,cutoff_percentage=80,from_date="1999-02-06",to_date="2024-02-06")
cut20.save()
# jobapp1=JobApplication(application_id=1,apply_date="2022-08-25",apply_time="03:42:07",newjobpost_id=jobpost8,user_id=user1)
# jobapp1.save()
# jobapp2=JobApplication(application_id=2,apply_date="2022-08-25",apply_time="03:45:07",newjobpost_id=jobpost8,user_id=user2)
# jobapp2.save()
# jobapp3=JobApplication(application_id=3,apply_date="2022-08-25",apply_time="16:09:34",newjobpost_id=jobpost3,user_id=user1)
# jobapp3.save()
# jobapp4=JobApplication(application_id=4,apply_date="2022-08-25",apply_time="23:04:40",newjobpost_id=jobpost1,user_id=user1)
# jobapp4.save()
# jobapp5=JobApplication(application_id=5,apply_date="2022-08-25",apply_time="23:08:40",newjobpost_id=jobpost1,user_id=user2)
# jobapp5.save()
ass1=Assessment(assessment_id=1,marks_obtained=8,date="2022-08-26",jobseeker_skill_id=uskill4)
ass1.save()
ass2=Assessment(assessment_id=2,marks_obtained=7,date="2022-08-26",jobseeker_skill_id=uskill5)
ass2.save()
ass3=Assessment(assessment_id=3,marks_obtained=7,date="2022-08-26",jobseeker_skill_id=uskill1)
ass3.save()
ass4=Assessment(assessment_id=4,marks_obtained=8,date="2022-08-26",jobseeker_skill_id=uskill6)
ass4.save()
ass5=Assessment(assessment_id=5,marks_obtained=8,date="2022-08-26",jobseeker_skill_id=uskill3)
ass5.save()
ass6=Assessment(assessment_id=6,marks_obtained=6,date="2022-08-26",jobseeker_skill_id=uskill2)
ass6.save()
ass7=Assessment(assessment_id=7,marks_obtained=7,date="2022-08-26",jobseeker_skill_id=uskill7)
ass7.save()

ass8=Assessment(assessment_id=8,marks_obtained=7,date="2022-08-26",jobseeker_skill_id=uskill8)
ass8.save()
ass9=Assessment(assessment_id=9,marks_obtained=8,date="2022-08-26",jobseeker_skill_id=uskill9)
ass9.save()
ass10=Assessment(assessment_id=10,marks_obtained=8,date="2022-08-26",jobseeker_skill_id=uskill10)
ass10.save()
ass11=Assessment(assessment_id=11,marks_obtained=9,date="2022-08-26",jobseeker_skill_id=uskill11)
ass11.save()
ass12=Assessment(assessment_id=12,marks_obtained=7,date="2022-08-26",jobseeker_skill_id=uskill12)
ass12.save()


job_short1=JobShortlist(jobshortlist_id=1,user_id_id=1,newjobpost_id_id=1)
job_short1.save()
job_short2=JobShortlist(jobshortlist_id=2,user_id_id=1,newjobpost_id_id=2)
job_short2.save()
job_short3=JobShortlist(jobshortlist_id=3,user_id_id=1,newjobpost_id_id=4)
job_short3.save()
job_short4=JobShortlist(jobshortlist_id=4,user_id_id=1,newjobpost_id_id=5)
job_short4.save()
job_short5=JobShortlist(jobshortlist_id=5,user_id_id=2,newjobpost_id_id=1)
job_short5.save()
job_short6=JobShortlist(jobshortlist_id=6,user_id_id=2,newjobpost_id_id=3)
job_short6.save()
job_short7=JobShortlist(jobshortlist_id=7,user_id_id=2,newjobpost_id_id=9)
job_short7.save()
job_short8=JobShortlist(jobshortlist_id=8,user_id_id=1,newjobpost_id_id=6)
job_short8.save()
job_short9=JobShortlist(jobshortlist_id=9,user_id_id=1,newjobpost_id_id=7)
job_short9.save()
job_short10=JobShortlist(jobshortlist_id=10,user_id_id=1,newjobpost_id_id=8)
job_short10.save()






