import React, { Component } from 'react'
import PortfolioRow from './portfolio_row'
import { Row, Table, FormControl } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as assets_actions from './../../assets/actions'
import uuid from 'uuid/v1'
import NumberFormat from 'react-number-format'

const styles = {

}


class Overview extends Component {

  constructor(props){
    super(props)
    this.state = {
      style: styles,
      //time_scale: '7d'
    }
  }

  componentDidMount(){

  }

  render(){

    let total = this.props.portfolio_assets.map((asset) => {
        return parseFloat(asset.amount) * parseFloat(asset.asset_info.price_usd)
    }).reduce((pv,cv)=>{
       return pv + (parseFloat(cv)||0);
    },0)

    return(
      <section>
        <h2 className='text-center'>Overview</h2>
        <hr/>
        <h4 className='text-center'>Total balance : <NumberFormat value={total || 0} displayType={'text'} thousandSeparator={" "} suffix={' USD'} decimalScale={2} /></h4>
        <h4 className='text-center'>Assets Number : {this.props.portfolio_assets.length}</h4>
      </section>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    portfolio_assets: state.PortfolioReducer.portfolio_assets
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(assets_actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Overview)
