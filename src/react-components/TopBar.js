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

import {withRouter} from "react-router-dom"

const studentNav = ['Home', 'Assignments', 'Groups', 'Practice', 'Log Out'];
const profNav = ['Home', 'Make Quiz', 'Generate Problems', 'Groups', 'Log Out'];

class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  openDrawer = () => {
    this.setState({isOpen: true});
  };

  navigate = (text) => {
    let newPage = "/";
    if (text === "Home") {
      if (this.props.type === "student") {
        newPage = "/student"
      }
      else {
        newPage = "/professor"
      }
    } else if (text === "Assignments") {
      if (this.props.type === "professor"){
        newPage = "/student/quiz"
      }
    } else if (text === "Groups") {
      newPage = "/professor/groups"
    } else if (text === "Practice") {
      newPage = "/student/gen"
    } else if (text === "Assign Quiz") {
      newPage = "/professor/quiz"
    } else if (text === "Generate Problems") {
      newPage = "/professor/gen"
    } else if (text === "Log Out") {
      newPage = "/"
    }

		this.props.history.push({
			pathname: newPage,
			state: {
				type: this.props.type,
				name: this.props.name,
				email: this.props.email,
				username: this.props.username,
				password: this.props.password
			}
		})
	}

	closeDrawer = () => {
		this.setState({isOpen: false});
	};

	render() {
		return (
			<div>
				<AppBar position="static">
					<Toolbar>
						<IconButton edge="start" onClick={this.openDrawer} color="inherit" aria-label="menu">
							<MenuIcon/>
						</IconButton>
						<h3>Phonogenesis</h3>
					</Toolbar>
				</AppBar>

				<Drawer variant="persistent" anchor="left" open={this.state.isOpen}>
					<IconButton onClick={this.closeDrawer}>
						<ChevronRightIcon/>
					</IconButton>
					<Divider/>
					<List>
						{(this.props.type === "student" ? studentNav : profNav).map((text, index) => (
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

export default withRouter(TopBar);
