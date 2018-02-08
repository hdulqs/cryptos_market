import React, { Component } from 'react'
import Cable from 'actioncable'
import axios from 'axios'
import { Grid, Glyphicon, Table } from 'react-bootstrap'
import ExchangeRow from './../components/exchange_row'
import uuid from 'uuid/v1'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as exchanges_actions from './../actions'

class ExchangesContainer extends Component {

  constructor(props){
    super(props)
    // this.state = {
    //   exchanges: []
    // }
  }

  componentDidMount(){
    // this.fetch_exchanges()
    this.props.fetch_exchanges()
  }

  // fetch_exchanges = () => {
  //   axios.get('/api/v1/public/exchanges', {responseType: 'json'})
  //     .then((response) => {
  //       this.setState({exchanges: response.data.exchanges})
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }


  render() {

    return(
      <Grid fluid={true}>
        <br/>
        <Table responsive condensed hover>
      		<thead>
      			<tr>
      				<th>Id</th>
              <th>Name</th>
              <th>Base Api Url</th>
              <th>Markets Nb</th>
              <th>Watched Markets Nb</th>
      				<th>Last Ticker Update</th>
      			</tr>
      		</thead>
      		<tbody>
          {
            this.props.exchanges.map((exchange) =>
              <ExchangeRow key={uuid()} exchange={exchange}></ExchangeRow>
            )
          }
          </tbody>
        </Table>
      </Grid>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    exchanges: state.ExchangesReducer.exchanges
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(exchanges_actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangesContainer)
