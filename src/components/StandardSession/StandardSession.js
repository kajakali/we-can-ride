import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import  moment  from 'moment';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CreateSessionButton from './CreateSessionButton';
import AddLessonButton from './AddLessonButton';
import AssignVolunteerButton from './AssignVolunteerButton';
import AddRoleButton from './AddRoleButton';
import DeleteLessonButton from './DeleteLessonButton';
import PublishSesssionButton from './PublishSessionButton';


import DeleteRole from './DeleteRole';
import PublishSessionButton from './PublishSessionButton';

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
    display: 'inline-block',
  },
  day: {
    color: theme.palette.secondary,
  }
});



class StandardSession extends Component {
  
  state = {
    session: '',
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'});
    this.props.dispatch({type: 'FETCH_SESSIONS'});
  }
  componentDidUpdate (prevProps, prevState) {
    //if the page just loaded, set the top session in the reducer as the current session
    if ((this.state.session == '') && this.props.state.session.allSessions[0]){
      this.setState({
        session: this.props.state.session.allSessions[0]
      })
    }
    //if we just added/deleted a session, set the top session in the reducer as the current session
    if (prevProps.state.session.allSessions.length !== this.props.state.session.allSessions.length){
      this.setState({
        session: this.props.state.session.allSessions[0]
      })
    }
    //if we picked a different session, fetch the lessons that are associated with that session
    if(prevState.session !== this.state.session){
      this.props.dispatch({ type: 'FETCH_SESSION_LESSONS', payload: {session_id: this.state.session.id}})
    }
  }




  render() {
    const {classes} = this.props;
    const weekdays = [
      {name: 'Sunday', reducer: this.props.state.session.slots.sunday, number: 0},
      {name: 'Monday', reducer: this.props.state.session.slots.monday, number: 1},
      {name: "Tuesday", reducer: this.props.state.session.slots.tuesday, number: 2},
      {name: 'Wednesday', reducer: this.props.state.session.slots.wednesday, number: 3},
      {name: 'Thursday', reducer: this.props.state.session.slots.thursday, number: 4},
      {name: 'Friday', reducer: this.props.state.session.slots.friday, number: 5},
      {name: 'Saturday', reducer: this.props.state.session.slots.saturday, number: 6},
    ];
    return (
      <>
        <h1>Standard Session</h1>
        <Grid container>
          <Grid item>
            {/**this is the button to add new lessons, visible when the session isn't published */}
            {this.state.session.ready_to_publish === true
            ?
            <div>can't add lessons to a published session right now</div>
            :  
            <AddLessonButton session_id={this.state.session.id}/>
            }
          </Grid>
          <Grid item>
            {/**here's the place to select a session from all the sessions in the database */}
            <InputLabel htmlFor="session">Session</InputLabel>
            <Select
              value={this.state.session}
              onChange={this.handleChange}
              inputProps={{
                name: 'session',
                id: 'select-session',
               }}
            >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {this.props.state.session.allSessions.map(item => (
            <MenuItem key={item.id} value={item}>{item.start_date} {item.session_type}</MenuItem>
            ))}
            </Select>
          </Grid>
          <Grid item>
            {/**here's the button to create a new session */}
            <CreateSessionButton/>
          </Grid>
        </Grid>
        

        
        <Grid 
          container
          className={classes.root}
          spacing={4}
          direction='row'
          justify='flex-start'
          alignItems='stretch'
          style={{minHeight: '100vh'}}
        >
          <Grid item xs={12} className={classes.day}>
            {/**here we make the weekdays */}
            {weekdays.map( day => (
              <Paper className={classes.paper}>
                {day.name}
                {/**here's where we get the lessons in a day */}
                {this.props.state.session.slots.lessons && this.props.state.session.slots.lessons.map( lesson => (
                  <>
                  {(lesson.weekday === day.number) && 
                  <Box className={classes.slot} key={lesson.id}>
                    <Box>
                      {lesson.start_of_lesson} - {lesson.end_of_lesson}
                      {/**here's where we get the information about each lesson */}
                      {day.reducer && day.reducer.map( slot => (
                        <>
                        {(slot.lesson_id === lesson.lesson_id) &&
                        <Box id={slot.lesson_id}>
                          {slot.title}:
                          {slot.expected_user == null
                          ?
                          <Box>

                            <AssignVolunteerButton slot_id={slot.slot_id}/>
                            <DeleteRole slot_id={slot.slot_id}/>
                          </Box>
                          :
                          <Box id={slot.expected_user}>
                            {slot.first_name} {slot.last_name}
                            <DeleteRole slot_id={slot.slot_id}/>
                           </Box>
                          }
                        </Box>
                        }
                        </>
                      ))}
                      {/**here's the button to add a role */}
                      <AddRoleButton lesson_id={lesson.lesson_id}/>
                      {/**here's the button to delete a lesson */}
                      <DeleteLessonButton lesson_id={lesson.lesson_id} />
                    </Box>
                  </Box>}
                  </>
                ))
                }

              </Paper>
            ))}
          </Grid>
        </Grid>
        {this.state.session.ready_to_publish === false &&
          <PublishSessionButton session_id={this.state.session.id}/>
        }

      
      </>
    )
  }
}

const mapStateToProps = state => ({
    state
  });

export default withStyles(styles)(connect(mapStateToProps)(StandardSession));
