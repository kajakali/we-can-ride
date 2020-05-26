import React, {Component} from 'react';

import {connect} from 'react-redux';


class Calendar extends Component {

  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
    this.props.dispatch({type: 'FETCH_FOUR_WEEKS_SHIFTS'});
  }

  render() {
    return (
      <>
        <h1>Calendar</h1>
        <p>here is the user info, use it to compare with all the shifts</p>
        {JSON.stringify(this.props.state.user)}
        <p>this is the page where the calendar will be</p>
        {JSON.stringify(this.props.state.shift.fourWeeksShifts)}
      </>
    )
  }
}

const mapStateToProps = state => ({
    state
  });

export default connect(mapStateToProps)(Calendar);
