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

const styles = {
  arrow_up: {
    color: 'green'
  },
  arrow_down: {
    color: 'red'
  }
}

class AssetsRow extends Component {

  constructor(props){
    super(props)
    this.state = {
      style: styles
    }
    //this.state = {containerWidth: 0, col_nb: 3}
  }


  componentDidMount () {

  }

  componentWillUnmount(){
  }

  navigateToShowAsset = () => {
    history.push('/' + this.props.asset.symbol)
  }


  render(){

    return(
      <tr className="asset_row" onClick={this.navigateToShowAsset}>
				<td>{this.props.asset.rank}</td>
        <td>{this.props.asset.name} ({this.props.asset.symbol})</td>
        <td><NumberFormat value={this.props.asset.price_usd || 0} displayType={'text'} thousandSeparator={" "} prefix={'$'} decimalScale={2} /></td>
				<td><NumberFormat value={this.props.asset.volume_usd_24h || 0} displayType={'text'} thousandSeparator={" "} prefix={'$'} decimalScale={1} /></td>
        <td><NumberFormat value={this.props.asset.market_cap_usd || 0} displayType={'text'} thousandSeparator={" "} prefix={'$'} decimalScale={1} /></td>
        <td><NumberFormat value={this.props.asset.available_supply || 0} displayType={'text'} thousandSeparator={" "} decimalScale={1} /> {this.props.asset.symbol}</td>
        <td>{this.props.asset.percent_change_1h > 0 ? (<Glyphicon style={this.state.style.arrow_up} glyph="arrow-up" />) : (<Glyphicon style={this.state.style.arrow_down} glyph="arrow-down" />)}{this.props.asset.percent_change_1h > 0 ? '+' + this.props.asset.percent_change_1h : this.props.asset.percent_change_1h}</td>
        <td>{this.props.asset.percent_change_24h > 0 ? (<Glyphicon style={this.state.style.arrow_up} glyph="arrow-up" />) : (<Glyphicon style={this.state.style.arrow_down} glyph="arrow-down" />)}{this.props.asset.percent_change_24h > 0 ? '+' + this.props.asset.percent_change_24h : this.props.asset.percent_change_24h}</td>
        <td>{this.props.asset.percent_change_7d > 0 ? (<Glyphicon style={this.state.style.arrow_up} glyph="arrow-up" />) : (<Glyphicon style={this.state.style.arrow_down} glyph="arrow-down" />)}{this.props.asset.percent_change_7d > 0 ? '+' + this.props.asset.percent_change_7d : this.props.asset.percent_change_7d}</td>
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
