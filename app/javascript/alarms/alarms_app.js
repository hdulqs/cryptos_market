
import React, { Component } from 'react'
import AlarmsContainer from './containers/alarms_container'
import AlarmsNavBar from './alarms_nav_bar'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class AlarmsApp extends Component {
  render(){
    return (
      <nav>
        <AlarmsNavBar user={this.props.user} />
        <AlarmsContainer />
      </nav>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    session: state.SessionsReducer.session,
    jwt: state.SessionsReducer.jwt,
    user: state.SessionsReducer.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators([], dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AlarmsApp)
