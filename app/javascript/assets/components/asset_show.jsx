import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { TypeChooser } from "react-stockcharts/lib/helper"
import CandleChart from './candle_chart'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as assets_actions from './../actions'
import { Glyphicon, Button } from 'react-bootstrap'

class AssetShow extends Component {

  constructor(props){
    super(props)
    // this.state = {
    //   time_scale: '7d'
    // }
  }

  componentDidMount(){
    //this.getMarket(this.props.match.params.market)
    //this.retrieve_ohcl(this.props.match.params.symbol)
    this.props.retrieve_assets_ohcl_candle(this.props.match.params.symbol, this.props.selected_time_range)
  }

  // getMarket = (market) => {
  //   axios.get("/api/v1/public/markets/" + market, {responseType: 'json'})
  //     .then((response) => {
  //       this.setMarket(response.data.market)
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     });
  // }

  //setMarket = (chart_data) => {
  //  this.setState({asset_chart: chart_data})
  //}


  // retrieve_ohcl = (symbol) => {
  //   // histohour ==> 7 last days with 3 hours step
  //   // histoday ==> 7 last months with 3 days step
  //   // histominute ==> 3 last hours with 3 minutes step
  //   let limit = 300
  //   axios.get('https://min-api.cryptocompare.com/data/histominute?tsym=USD&limit=' + limit + '&fsym=' + symbol, {responseType: 'json'})
  //     .then((response) => {
  //       let res = response.data
  //       let json_arr = res["Data"]
  //       let arr = []
  //       json_arr.forEach((item) => {
  //         let obj = {
  //           date: new Date(item.time * 1000),
  //           open: item.open,
  //           high: item.high,
  //           low: item.low,
  //           close: item.close,
  //           volume: item.volumeto + item.volumefrom
  //         }
  //         arr.push(obj)
  //       })
  //       this.setState({asset_chart: arr})
  //     })
  //     .catch((error) => {
  //       if(error.response.status === 429){
  //         return false
  //       }
  //       if(error.response.status === 400){
  //         //if(intent_nb < 4){
  //         //  intent_nb = intent_nb + 1
  //         //  this.retrieve_ohcl(market, intent_nb)
  //         //}
  //       }
  //     })
  // }

  one_month_scale = () => {
    this.props.retrieve_assets_ohcl_candle(this.props.match.params.symbol, '1m')
    this.props.set_selected_time_range('1m')
    //this.setState({time_scale: '1m'})
  }

  seven_days_scale = () => {
    this.props.retrieve_assets_ohcl_candle(this.props.match.params.symbol, '7d')
    this.props.set_selected_time_range('7d')
    //this.setState({time_scale: '7d'})
  }

  one_day_scale = () => {
    this.props.retrieve_assets_ohcl_candle(this.props.match.params.symbol, '1d')
    this.props.set_selected_time_range('1d')
    //this.setState({time_scale: '1d'})
  }

  six_hours_scale = () => {
    this.props.retrieve_assets_ohcl_candle(this.props.match.params.symbol, '6h')
    this.props.set_selected_time_range('6h')
    //this.setState({time_scale: '6h'})
  }

  render(){
    let assets_chart_data = this.props.assets_chart_data[this.props.match.params.symbol] === undefined ?
                      [] :
                      this.props.assets_chart_data[this.props.match.params.symbol]
    if (assets_chart_data.length === 0) {
			return (
        <div className="loader"><Glyphicon glyph="btc" /><Glyphicon glyph="eur" /><Glyphicon glyph="usd" /></div>
      )
		}
    return(
      <div className='candle-chart'>
        <h2 className='text-center'>{this.props.match.params.symbol}-USD</h2>
        <header className="asset_show_header">
          <Button type="submit" value="none" className={this.props.selected_time_range === '1m' ? 'btn active' : 'btn'} onClick={this.one_month_scale}>1 Month</Button>&nbsp;
          <Button type="submit" value="none" className={this.props.selected_time_range === '7d' ? 'btn active' : 'btn'} onClick={this.seven_days_scale}>7 Days</Button>&nbsp;
          <Button type="submit" value="none" className={this.props.selected_time_range === '1d' ? 'btn active' : 'btn'} onClick={this.one_day_scale}>1 Day</Button>&nbsp;
          <Button type="submit" value="none" className={this.props.selected_time_range === '6h' ? 'btn active' : 'btn'} onClick={this.six_hours_scale}>6 Hours</Button>
        </header>
        <CandleChart data={assets_chart_data} />
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    assets_chart_data: state.AssetsReducer.assets_chart_data,
    selected_time_range: state.AssetsReducer.selected_time_range
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(assets_actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetShow)
