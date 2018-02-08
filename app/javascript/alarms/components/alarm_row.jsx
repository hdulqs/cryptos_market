import React, { Component } from 'react'
import { Row, Glyphicon } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as alarms_actions from './../actions'
import uuid from 'uuid/v1'
import NumberFormat from 'react-number-format'
import history from './../../main/history'
import axios from 'axios'


const styles = {
  green: {
    color: 'green'
  },
  red: {
    color: 'red'
  }
}

class AlarmRow extends Component {

  constructor(props){
    super(props)
    this.state = { style: styles }
  }


  navigateToShowAsset = () => {
    //history.push('/' + this.props.alarm.asset_symbol)
  }

  toggle_activation = () => {
    this.props.toggle_alarm_activation(this.props.alarm.asset_symbol)
  }

  destroy_alarm = () => {
    this.props.destroy_alarm(this.props.alarm.asset_symbol)
  }

  edit_alarm = () => {

  }

  render(){
    return(
      <tr className="asset_row" onClick={this.navigateToShowAsset}>
        <td></td>
        <td><span>{this.props.alarm.asset_symbol}</span></td>
        <td><NumberFormat value={this.props.alarm.min_limit || 0} displayType={'text'} thousandSeparator={" "} prefix={'$'} decimalScale={1} /></td>
        <td><NumberFormat value={this.props.alarm.max_limit || 0} displayType={'text'} thousandSeparator={" "} prefix={'$'} decimalScale={1} /></td>
        <td>
          {
            this.props.alarm.is_active ?
              <span style={this.state.style.green}><Glyphicon glyph="ok-circle" /></span>
              :
              <span style={this.state.style.red}><Glyphicon glyph="remove-circle" /></span>
          }
        </td>
        <td><span>{this.props.alarm.has_min_limit ? 'true' : 'false'}</span></td>
        <td><span>{this.props.alarm.has_max_limit ? 'true' : 'false'}</span></td>
        <td><span>{this.props.alarm.created_at}</span></td>
        <td>
          {
            this.props.alarm.is_active ?
              <span onClick={this.toggle_activation}>Desactivate</span>
              :
              <span onClick={this.toggle_activation}>Activate</span>
          }
        </td>
        <td><Glyphicon glyph="cog" onClick={this.edit_alarm} /></td>
        <td><Glyphicon glyph="trash" onClick={this.destroy_alarm} /></td>
			</tr>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    //is_create_alarm_modal_visible: state.AlarmsReducer.is_create_alarm_modal_visible,
    //alarms: state.AlarmsReducer.alarms
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(alarms_actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AlarmRow)
