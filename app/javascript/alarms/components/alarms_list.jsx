import React, { Component } from 'react'
import AlarmRow from './alarm_row'
import { Row, Table, FormControl } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as assets_actions from './../actions'
import uuid from 'uuid/v1'

const styles = {

}


export default class AlarmsList extends Component {

  constructor(props){
    super(props)
    this.state = {
      style: styles
    }
  }


  render(){

    return(
      <Table responsive condensed hover>
    		<thead>
    			<tr>
            <th></th>
            <th>Asset </th>
    				<th>Min Limit</th>
            <th>Max Limit</th>
            <th>Is Active</th>
            <th>Created At</th>
            <th>Toggle Activation</th>
            <th>Edit</th>
            <th>Remove</th>
    			</tr>
    		</thead>
    		<tbody>
        {
          this.props.alarms.map((alarm) =>
            <AlarmRow alarm={alarm} key={uuid()} />
          )
        }
        </tbody>
      </Table>
    )
  }
}
