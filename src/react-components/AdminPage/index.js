import React from "react";
import Button from "@material-ui/core/Button";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import "./styles.css";

class AdminPage extends React.Component {

  render() {
    return (
      <div>
        <h3> Total User Count: <span id="userCount"></span></h3>
        <div className="addButton">
          <Button>Login</Button>
        </div>
        <TableContainer component={Paper}>
          <Table className="table" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Edit User</TableCell>
                <TableCell align="right">Remove User</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.rows.map(row => (
                <TableRow key={row.name}>
                  <TableCell align="right">{row.type}</TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right"><Button>Edit</Button></TableCell>
                  <TableCell align="right"><Button>Remove</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

    );
  }
}

export default AdminPage;
