import React, {Component} from "react";
import './Personal.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {Container} from "react-bootstrap";
import SignInModal from './signinmodal';
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Form from "react-bootstrap/Form";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import {Navigate} from "react-router-dom";
import Loader from "./loader";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p:4,
  backdrop:false,
  show:true,
    borderRadius:5,
    border:0,
    overflow:'hidden'
};

var jsonData = {
    "email":"",
    "password":"",

  }
class Nab_emp extends Component {
    state={
        signinopen:false,
        userORemp:"Employer",
        email:"",
        logged_in:"",
        password:"",
        DetailsLoaded2:false,
        redirect:false,
    }


    constructor(props) {
    super(props);

    this.handleClick=this.handleClick.bind(this);
    this.handleClickLogin=this.handleClickLogin.bind(this);
    this.handleClose=this.handleClose.bind(this);
    this.handleChangeUser=this.handleChangeUser.bind(this);
    this.SignOut=this.SignOut.bind(this);
    this.DashBoard=this.DashBoard.bind(this);
    this.Register=this.Register.bind(this);
   }
   componentDidMount() {
       // const { id } = useParams()
       // console.log(id)

       fetch(
"http://127.0.0.1:8000/first_module/jobseeker/get_info/",{
        method:"GET"
            })
            .then((res) => res.json())
            .then((json) => {
                this.setState({DetailsLoaded2: true})
                if(json.response ==="No") {
                    this.state.logged_in=false

                }
                else {
                    this.state.logged_in=true
                }
                // console.log(json.response)
                // console.log(this.state.logged_in)

            })
   }

    handleClick() {
        this.setState({signinopen: true})
        console.log(this.state.signinopen)
   }
   SignOut() {

       console.log(this.state.logged_in)
       fetch('http://127.0.0.1:8000/first_module/jobseeker/get_info/', {  // Enter your IP address here

      method: 'POST',
        headers:{
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
    })
       //this.state.logged_in=!this.state.logged_in
       this.setState({"logged_in":!this.state.logged_in})
      window.location.href="/"
   }

    handleremail= (event) => {
      const value = event.target.value
      console.log(value)
      this.state.email=value

      jsonData.email=value
    }

    handlerpass= (event) => {
      const value = event.target.value
      console.log(value)
      this.state.password=value

      jsonData.password=value
    }
   handleClickLogin() {
        fetch('http://127.0.0.1:8000/first_module/jobseeker/matchuser/', {  // Enter your IP address here

        method: 'POST',
        headers:{
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
    })
      if(this.state.userORemp === "Jobseeker"){
          window.location.href="/"
      }
      else {
          window.location.href="/emp"
      }
   }
   Register() {

         if(this.state.userORemp === "Jobseeker") {
             window.location.href="/register"
         }
         else window.location.href="/register_emp"
   }

      handleClose() {
      this.setState({'signinopen':false})
      console.log(this.state.signinopen)
      }

      handleChangeUser(event) {
        console.log(event.target.value)
        this.setState({'userORemp':event.target.value})

      }
      DashBoard() {

        if(this.state.logged_in) {
            window.location.href="/dashboard"
        }
          else {
               alert("Please Log in First to View Dashboard")
               console.log("hereee")
              //window.location.href="/"

        }
      }

    render() {
        if ( !this.state.DetailsLoaded2) return <Loader/>
        return (
            <React.Fragment>
                            <Navbar  expand="lg" sticky="top" style={{
                height:80,
                width:"100%",
                background:"#F1FFE8",
                boxShadow:"0px 0px 5px 1px #93BF7A"
            }}>
             <Container>
    <Navbar.Brand href="/emp" className="navBrand" style={{
        marginLeft:-55,
        fontSize:38,
        fontWeight:"bold",
        color:"#410390"
    }}>csRecruitZ</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Nav  style={{
        marginLeft:940,
        marginRight:-120
    }}>
        <Nav.Link href="/emp" style={{
                 color:"#410390",
                 marginRight:8

        }} className="navHover">Home</Nav.Link>


        {/*}} className="navHover">Notifications</Nav.Link>*/}
        <Nav.Link href="/" style={{
                 color:"#410390",
                 marginRight:8

        }} className="navHover">Contact Us</Nav.Link>

         <Nav.Link style={{
                 color:"#410390",
                 marginRight:8

        }} className="navHover" onClick={this.SignOut}>Sign Out</Nav.Link>


      </Nav>
    </Navbar.Collapse>
  </Container>
             </Navbar>

            </React.Fragment>

        )
    }
}

export default Nab_emp;

// <div id="modal" className="signinmodal">
//            <h1>hi</h1>
//        </div>

        // BackdropProps={{ invisible: true }}