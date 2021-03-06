import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  slot: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.light,
    width: '200px'
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    display: 'inline-block'
  }
});


class PublishSessionButton extends Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = (blob) => {
    if (blob === 'publish') {
      //send the data to the server to publish the session, which means to create shifts for the whole 
      //length of the session for each role for each lesson and assign the person who will be expected to them
      this.props.dispatch({ type: 'PUBLISH_SESSION', payload: { session_id: this.props.session_id } });
    }
    this.setState({ open: false });
  };

  render() {
    return (
      <>
        <Button color='secondary' variant='contained' onClick={this.handleClickOpen} >Publish Session</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Publish Session</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you would like to publish this session? Once you do, you won't be able to edit the roles and lessons
    </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
    </Button>
            <Button onClick={() => this.handleClose('publish')} color="primary">
              Publish Session
    </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}

const mapStateToProps = state => ({
  state
});

export default withStyles(styles)(connect(mapStateToProps)(PublishSessionButton));
