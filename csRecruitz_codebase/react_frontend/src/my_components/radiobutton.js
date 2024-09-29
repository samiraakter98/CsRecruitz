import * as React from 'react';
import  {Component} from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import "./nakshi.css";

const boxSX = {
  "&:hover": {
    border: "1px solid #00FF00",
    color: 'gray',
    backgroundColor: 'lightblue'
  },
};
var jsonData = {
    "category":"",
    "filtername":"",
    "redir_from_home":"false"
  }
export default function Radiobutton(props) {
  const [value, setValue] = React.useState('');
  const [categories, setCategories] = React.useState(props.values);
  const [title, setTitle] = React.useState(props.title);
  const [default_val, setDefaultVal] = React.useState(props.default_val);
  const [filtername, setFiltername] = React.useState(props.filtername);

  const handleChange = (event) => {
      // console.log("change")
      if(filtername==="cat")
      {
          console.log("change")
          console.log(event.target.value)
          jsonData.category=event.target.value
          jsonData.filtername=filtername
          fetch('http://127.0.0.1:8000/searchinput/', {  // Enter your IP address here
             method: 'POST',
             headers:{
             'Content-Type': 'application/json',
             },
             mode: 'cors',
             body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
          })
          // window.location.href="/joblist"
      }
    setValue(event.target.value);
  }
  function handleClick(event) {
    if (event.target.value === value) {
      setValue("");
      if(filtername==="cat")
      {
          console.log("click")
          console.log("")
          jsonData.category=""
          jsonData.filtername=filtername
          fetch('http://127.0.0.1:8000/searchinput/', {  // Enter your IP address here
             method: 'POST',
             headers:{
             'Content-Type': 'application/json',
             },
             mode: 'cors',
             body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
          })
      }
    }
  }

  return (
          <div>
                <div className="filter_title_bg_div">
                    <h6>{title}</h6>
                </div>

                <FormControl >
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={value}
                        onChange={handleChange}>
                          {categories.map(category => (
                              <FormControlLabel value={category.value} control={<Radio sx={{'& .MuiSvgIcon-root': {fontSize: 18,},}} onClick={handleClick}/>} label={<span className="radio_btn_option">{category.value}</span>}/>
                          ))}
                      </RadioGroup>
                    </FormControl>
            </div>
  );
}



//defaultValue={this.state.default_val}
//value="Teaching"