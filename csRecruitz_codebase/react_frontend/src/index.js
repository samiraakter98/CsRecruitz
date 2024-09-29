import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Route,BrowserRouter,Routes} from "react-router-dom";
import Personal from "./my_components/Personal";
import Professional from "./my_components/Professional";

import Joblist from "./my_components/jobpostlist";
import Jobdetails from "./my_components/jobdetails";
import Register from "./my_components/Register";
import Register_2 from "./my_components/Register_2";
import Register_3 from "./my_components/Register_3";
import Register_4 from "./my_components/Register_4";
import RegisterEmp from "./my_components/Register_emp"
import Appliedjoblist from "./my_components/appliedjoblist";
import Companylist from "./my_components/companylist";
import Job_1 from "./my_components/jobposting1";
import Job_2 from "./my_components/jobposting2";
import Job_3 from "./my_components/jobposting3";
import Home from "./my_components/Home";
import EmpHome from "./my_components/emp_home";
import EmpProfile from "./my_components/emp_profile";
import Quiz from "./my_components/Quiz"
import Applicantlist from "./my_components/applicantlist";
import Tag from "./my_components/Tag.js"
import "bootstrap/dist/css/bootstrap.min.css";
import Shortlistedjoblist from "./my_components/shortlistedjoblist";
import Quizresult from "./my_components/quizresult";
import ExperienceEdit from './my_components/ExperienceEdit';
import EditSkill from './my_components/EditSkill';
import UserProfile from './my_components/UserProfile';
import UserProfessional from './my_components/UserProfessional';
import JobseekerPreview from "./my_components/JobseekerPreview";
import JobseekerPreviewEmp from "./my_components/JobseekerPreviewEmp";
import EditProject from './my_components/EditProject';
import EditLicense from './my_components/EditLicense';


import EditPublication from './my_components/EditPublication';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Personal />} />
        <Route path="/professional" element={< Professional/>} />
        <Route path="/joblist" element={< Joblist/>} />
        <Route path="/register" element={< Register/>} />
        <Route path="/register2" element={< Register_2/>} />
        <Route path="/register3" element={< Register_3/>} />
        <Route path="/register4" element={< Register_4/>} />
        <Route path="/register_emp" element={< RegisterEmp/>} />
        <Route path="/job1" element={< Job_1/>} />
        <Route path="/job2" element={< Job_2/>} />
        <Route path="/job3" element={< Job_3/>} />
        <Route path="/jobdetails" element={< Jobdetails/>} />
        <Route path="/applied" element={<Appliedjoblist/>} />
        <Route path="/shortlisted" element={<Shortlistedjoblist/>} />
        <Route path="/quiz" element={< Quiz/>} />
        <Route path="/quizresult" element={< Quizresult/>} />
        <Route path="/tag" element={< Tag/>} />
        <Route path="/companylist" element={< Companylist/>} />
        <Route path="/emp" element={< EmpHome/>} />
        <Route path="/empprofile" element={< EmpProfile/>} />
        <Route path="/applicants" element={< Applicantlist/>} />
        <Route path="/experienceEdit" element={< ExperienceEdit/>} />
        <Route path="/editproject" element={< EditProject/>} />
        <Route path="/editlicense" element={< EditLicense/>} />
        <Route path="/editpublication" element={< EditPublication/>} />
        <Route path="/editskill" element={< EditSkill/>} />
        <Route path="/userprofile" element={< UserProfile/>} />
        <Route path="/userprofessional" element={< UserProfessional/>} />
        <Route path="/userPrev" element={< JobseekerPreview/>} />
        <Route path="/empprev" element={< JobseekerPreviewEmp/>} />


    </Routes>
  </BrowserRouter>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
