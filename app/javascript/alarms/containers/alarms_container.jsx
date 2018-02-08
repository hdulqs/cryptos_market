import React, { Component } from 'react'
import Cable from 'actioncable'
import axios from 'axios'
import { Grid, Glyphicon, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CreateAlarmModal from './../components/create_alarm_modal'
import * as alarms_actions from './../actions'
import AlarmsList from './../components/alarms_list'
class AlarmsContainer extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    if(localStorage.jwt && localStorage.jwt.length){
      this.props.fetch_user_alarms(localStorage.jwt)
    }else{
      history.push('sign_in')
    }
  }

  open_create_alarm_modal = () => {
    this.props.set_show_create_alarm_modal(true)
  }


  render() {
    return(
      <Grid fluid={true}>
        <h2 className='text-center'>Alarms</h2>
        { this.props.is_create_alarm_modal_visible && <CreateAlarmModal /> }
        { this.props.alarms.length ?
            <AlarmsList alarms={this.props.alarms} />
            :
            <p className='text-center'>You don't have any Alarm yet.</p>
        }
        <Button className='btn btn-info btn-block' type="submit" onClick={this.open_create_alarm_modal}>Create a New Alarm</Button>
      </Grid>
    )
  }

}



const mapStateToProps = (state) => {
  return {
    jwt: state.SessionsReducer.jwt,
    is_create_alarm_modal_visible: state.AlarmsReducer.is_create_alarm_modal_visible,
    alarms: state.AlarmsReducer.alarms
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(alarms_actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AlarmsContainer)