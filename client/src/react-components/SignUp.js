import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {signUp, handleTextFieldChange} from '../actions/user'
import {withRouter} from "react-router-dom"

import "./SignUp.css";

class SignUp extends React.Component {
  state = {
    username: "",
    password: "",
    name: "",
    email: "",
    type: "",
    isOpen: false,
    type: "",
    anchorEl: null,
  }


  changeSelected(event) {
    this.setState({
      type: event.currentTarget.textContent.toLowerCase(),
      isOpen: false,
      anchorEl: null
    })
  }

  render() {
    const state = this.state;

    return(
      <div>
        <div className="signUpForm">
          <div className="formList">
            <div className="form">
                <TextField
                  id="username"
                  label="Username"
                  onChange={(e) => handleTextFieldChange(e, this)}
                />
            </div>

            <div className="form">
              <TextField
                id="password"
                label="Password"
                onChange={(e) => handleTextFieldChange(e, this)}
              />
            </div>

            <div className="form">
              <TextField
                id="name"
                label="Name"
                onChange={(e) => handleTextFieldChange(e, this)}
              />
            </div>

            <div className="form">
              <TextField
                id="email"
                label="Email"
                onChange={(e) => handleTextFieldChange(e, this)}
              />
            </div>

            <div className="form">
              <div className="typeButton">
                <List component="nav">
                   <ListItem
                     button
                     onClick={(e) => {
                       this.setState({anchorEl: e.currentTarget})
                     }}
                   >
                     <ListItemText primary={state.type === "student" ? "Student" : (state.type === "professor" ? "Professor":"Account Type")}/>
                   </ListItem>
                 </List>
              </div>
               <div className="menu">
                 <Menu
                   id="lock-menu"
                   keepMounted
                   open={Boolean(state.anchorEl)}
                   anchorEl={state.anchorEl}
                   onClose={() => this.setState({anchorEl: null})}
                 >
                     <MenuItem
                       key={"student"}
                       selected={"student" === state.type}
                       onClick={(e) => this.changeSelected(e)}
                     >
                     Student
                     </MenuItem>
                     <MenuItem
                       key={"professor"}
                       selected={"professor" === state.type}
                       onClick={(e) => this.changeSelected(e)}
                     >
                     Professor
                     </MenuItem>
                 </Menu>
               </div>

            </div>
          </div>

          <div className="signUpButton">
            <Button onClick={() => signUp(this, state)}>Sign Up</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(SignUp)
