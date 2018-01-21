import React, { Component } from 'react'
//import MarketRow from './market_row'
//import MarketItem from './market_item'
import AssetRow from './asset_row'
import { Row, Glyphicon } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as assets_actions from './../actions'
import uuid from 'uuid/v1'
import NumberFormat from 'react-number-format'
import history from './../../main/history'
import LineChart from './line_chart'
import axios from 'axios'


const styles = {
  arrow_up: {
    color: 'green'
  },
  arrow_down: {
    color: 'red'
  },
  line_chart_width: {
    width: '300px'
  }
}

class AssetsRow extends Component {

  constructor(props){
    super(props)
    this.state = {
      style: styles,
      chart_data: []
    }
    //this.state = {containerWidth: 0, col_nb: 3}
  }


  componentDidMount () {
    this.retrieve_ohcl(this.props.asset.symbol)
  }

  retrieve_ohcl = (symbol) => {
    // histohour ==> 7 last days with 3 hours step
    // histoday ==> 7 last months with 3 days step
    // histominute ==> 3 last hours with 3 minutes step
    if(symbol === 'MIOTA'){
      symbol = 'IOT'
    }
    let limit = 180
    axios.get('https://min-api.cryptocompare.com/data/histohour?tsym=USD&limit=' + limit + '&fsym=' + symbol, {responseType: 'json'})
      .then((response) => {
        let res = response.data
        let json_arr = res["Data"]
        let arr = []
        json_arr.forEach((item) => {
          let obj = {
            date: new Date(item.time * 1000),
            open: item.open,
            high: item.high,
            low: item.low,
            close: item.close,
            volume: item.volumeto + item.volumefrom
          }
          arr.push(obj)
        })
        this.setState({chart_data: arr})
      })
      .catch((error) => {
        if(error.response.status === 429){
          return false
        }
        if(error.response.status === 400){
          //if(intent_nb < 4){
          //  intent_nb = intent_nb + 1
          //  this.retrieve_ohcl(market, intent_nb)
          //}
        }
      })
  }

  componentWillUnmount(){
  }

  navigateToShowAsset = () => {
    history.push('/' + this.props.asset.symbol)
  }


  render(){

    return(
      <tr className="asset_row" onClick={this.navigateToShowAsset}>
				<td><span>{this.props.asset.rank}</span></td>
        <td><span><img src={this.props.asset.logo_path_thumb} />&nbsp;&nbsp;{this.props.asset.name} ({this.props.asset.symbol})</span></td>
        <td><NumberFormat value={this.props.asset.price_usd || 0} displayType={'text'} thousandSeparator={" "} prefix={'$'} decimalScale={2} /></td>
				<td><NumberFormat value={this.props.asset.volume_usd_24h || 0} displayType={'text'} thousandSeparator={" "} prefix={'$'} decimalScale={1} /></td>
        <td><NumberFormat value={this.props.asset.market_cap_usd || 0} displayType={'text'} thousandSeparator={" "} prefix={'$'} decimalScale={1} /></td>
        <td><NumberFormat value={this.props.asset.available_supply || 0} displayType={'text'} thousandSeparator={" "} decimalScale={1} /> {this.props.asset.symbol}</td>
        <td>{this.props.asset.percent_change_24h > 0 ? (<Glyphicon style={this.state.style.arrow_up} glyph="arrow-up" />) : (<Glyphicon style={this.state.style.arrow_down} glyph="arrow-down" />)}{this.props.asset.percent_change_24h > 0 ? '+' + this.props.asset.percent_change_24h : this.props.asset.percent_change_24h}</td>
        <td style={this.state.style.line_chart_width}>
          { this.state.chart_data.length > 0 ?
            <LineChart data={this.state.chart_data} />
            :
            <div className="loader-row"></div>
          }
        </td>
			</tr>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    assets: state.AssetsReducer.assets,
    current_page: state.AssetsReducer.current_page,
    is_assets_loading: state.AssetsReducer.is_assets_loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(assets_actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetsRow)
