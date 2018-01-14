import React, { Component } from 'react'
import MarketChart from './market_chart'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as markets_actions from './../actions'

class MarketChartIndex extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    let val = this.props.charts_data[this.props.market.name]
    if(val === undefined)
      this.props.retrieve_ohcl(this.props.market, 0)
  }

  render() {
    let charts_data = this.props.charts_data[this.props.market.name] === undefined ?
                      [] :
                      this.props.charts_data[this.props.market.name]

    if (charts_data.length === 0) {
			return (
        <div className="loader-small"></div>
      )
		}
		return (
			<MarketChart data={charts_data} />
		)
	}

}



const mapStateToProps = (state) => {
  return {
    charts_data: state.MarketsReducer.charts_data
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(markets_actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketChartIndex)
