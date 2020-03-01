import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider'

import {Redirect} from "react-router-dom"

class TopBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: null,
      studentNav: ['Home', 'Assignments', 'Groups', 'Practice'],
      profNav: ['Home', 'Assign Quiz', 'Generate Problems'],
      isOpen: false,
    }
  }

  openDrawer = () => {
    this.setState({isOpen: true});
  }

  closeDrawer = () => {
    this.setState({isOpen: false});
  }

  navigate = (text) => {
    let newPage;
    console.log(this.props.user)
    if (text === "Home") {
      if (this.props.user.type === "student") {
        newPage = "/student"
      }
      else {
        newPage = "/professor"
      }
    } else if (text === "Assignments") {
      newPage = "/student/quiz"
    } else if (text === "Groups") {
      newPage = "/"
    } else if (text === "Practice") {
      newPage = "/student/gen"
    } else if (text === "Assign Quiz") {
      newPage = "/professor/quiz"
    } else if (text === "Generate Problems") {
      newPage = "/professor/gen"
    }
    console.log(text)
    this.setState({redirect: newPage})

  }

  render() {
    if (this.state.redirect) {
        return <Redirect to={{
            pathname: this.state.redirect,
            user: this.props.user
        }}/>
    }

    return(
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" onClick={this.openDrawer} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <h3>Phonogenesis</h3>
          </Toolbar>
        </AppBar>

        <Drawer variant="persistent" anchor="left" open={this.state.isOpen}>
          <IconButton onClick={this.closeDrawer}>
            <ChevronRightIcon />
          </IconButton>
          <Divider />
          <List>
            {(this.props.user.type === "student" ? this.state.studentNav : this.state.profNav).map((text, index) => (
              <ListItem button onClick={() => this.navigate(text)} key={text}>
                <ListItemText primary={text}/>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
    )
  }
}

export default TopBar;
