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
class Navb extends Component {
    state={
        signinopen:false,
        userORemp:"Jobseeker",
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
    <Navbar.Brand href="/" className="navBrand" style={{
        marginLeft:-55,
        fontSize:38,
        fontWeight:"bold",
        color:"#410390"
    }}>csRecruitZ</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Nav  style={{
        marginLeft:855,
        marginRight:-120
    }}>
        <Nav.Link href="/" style={{
                 color:"#410390",
                 marginRight:8

        }} className="navHover">Home</Nav.Link>
        <Nav.Link style={{
                 color:"#410390",
                 marginRight:8

        }} className="navHover" onClick={this.DashBoard}>Dashboard</Nav.Link>
        {/*<Nav.Link  style={{*/}
        {/*         color:"#410390",*/}
        {/*         marginRight:8*/}

        {/*}} className="navHover">Notifications</Nav.Link>*/}
        <Nav.Link href="/" style={{
                 color:"#410390",
                 marginRight:8

        }} className="navHover">Contact Us</Nav.Link>
        {!this.state.logged_in && <Nav.Link style={{
                 color:"#410390",
                 marginRight:8

        }} className="navHover" onClick={this.handleClick}>Sign In</Nav.Link>}
        {this.state.logged_in && <Nav.Link style={{
                 color:"#410390",
                 marginRight:8

        }} className="navHover" onClick={this.SignOut}>Sign Out</Nav.Link>}


      </Nav>
    </Navbar.Collapse>
  </Container>
             </Navbar>


        <div>
      <Modal
        open={this.state.signinopen}
        onClose={this.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{background:"rgba(0,0,0,0)"}}
      >
        <Box sx={style}>
            <div style={{display:"inline",position:'absolute',width:'49%'}}>
                <Typography id="modal-modal-title" variant="h5" component="h2" style={{color:"#410390",fontWeight:"bold",paddingTop:'3px'}}>
                Log In
              </Typography>
            </div>
            <div style={{display:"inline",position:'absolute',width:'49%',left:'54%'}}>
                <ToggleButtonGroup
                  color="primary"
                  value={this.state.userORemp}
                  exclusive
                  onChange={this.handleChangeUser}
                   size="small"
                >
                  <ToggleButton value="Jobseeker" style={{fontWeight:'bold'}}>Jobseeker</ToggleButton>
                  <ToggleButton value="Employer" style={{fontWeight:'bold'}}>Employer</ToggleButton>
            </ToggleButtonGroup>
            </div>


            <Form style={{marginTop:'80px',marginBottom:'20px'}}>
                <InputLabel id="demo-simple-select-label" style={{fontSize:'14px'}}>E-mail</InputLabel>
                <input required style={{width:'98%', padding:'7px',marginBottom:14,borderRadius:'5px',borderWidth:1}} type="text"  onChange={this.handleremail}></input>

                <InputLabel id="demo-simple-select-label" style={{fontSize:'14px'}}>Password</InputLabel>
                <input required style={{width:'98%', padding:'7px',marginBottom:14,borderRadius:'5px',borderWidth:1}} type="password"  onChange={this.handlerpass}></input>
            </Form>

            <div style={{display:"inline",position:'absolute',width:'49%'}}>
                    <a href=""><Typography id="modal-modal-description" sx={{ mt: 2,color:"#3C6DE5" }}>
            Forgot Password?
                    </Typography></a>
            </div>
            <div style={{display:"inline",position:'absolute',width:'49%',left:'47%'}}>
                <button className='btn btn-success' style={{marginTop:"6px",width:'45%'}} onClick={this.handleClickLogin}>Log In</button>
            </div>


            <div style={{height:'auto',marginTop:"110px",background:"#3C6DE5",marginLeft:"-33px",marginRight:'-33px',marginBottom:'-43px',paddingLeft:'20px',paddingTop:'3px',paddingBottom:'12px',borderBottomLeftRadius:5,borderBottomRightRadius:5}}>
                <Typography id="modal-modal-description" sx={{ mt: 2,color:"#ffffff",marginLeft:'30%' }}>
                    Do not have an account?
                  </Typography>
                <button style={{marginTop:"10px",width:'80%',height:'40px',marginLeft:'8%',marginBottom:'30px',background:'#FFFFFF',border:0,borderRadius:5,color:'#410390',fontWeight:'bold'}} onClick={this.Register}>Create a new account</button>
            </div>

        </Box>
      </Modal>
    </div>

            </React.Fragment>

        )
    }
}

export default Navb;

// <div id="modal" className="signinmodal">
//            <h1>hi</h1>
//        </div>

        // BackdropProps={{ invisible: true }}