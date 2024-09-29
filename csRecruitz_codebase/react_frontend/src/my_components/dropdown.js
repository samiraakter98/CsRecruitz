import * as React from 'react';
import  {Component} from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import "./nakshi.css";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


export default class Dropdown_my extends Component {
    state={
        locations:this.props.values,
        title:this.props.title,
        default_val:this.props.default_val,
    };
    render() {
        return (
            <div>
                <div className="filter_title_bg_div">
                    <h6>{this.props.title}</h6>
                </div>

                <Box sx={{ width:263,marginTop:2}}>
                  <FormControl fullWidth size="small" >
                    <InputLabel id="demo-simple-select-label">Division</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Division"
                      defaultValue={this.state.default_val}
                      style={{ height: 38,fontSize:15,paddingTop:4}}
                    >
                        {this.state.locations.map(location => (
                            <MenuItem value={location.value} sx={{fontSize:12,width:'100%'}}>{location.value}</MenuItem>
                          ))}
                    </Select>
                  </FormControl>
                </Box>

            </div>

    )
    }

}
