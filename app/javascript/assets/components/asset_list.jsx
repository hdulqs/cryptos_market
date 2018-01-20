import React, { Component } from 'react'
//import MarketRow from './market_row'
//import MarketItem from './market_item'
import AssetRow from './asset_row'
import { Row, Table, FormControl } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as assets_actions from './../actions'
import uuid from 'uuid/v1'


class AssetList extends Component {

  constructor(props){
    super(props)
    //this.state = {containerWidth: 0, col_nb: 3}
  }


  componentDidMount () {

  }

  componentWillUnmount(){
  }

  search_market = (event) => {
    //if(event.target.value.length > 0){
    //this.props.set_markets_loading(true)
    //this.props.market_search(event.target.value)
    //}
    //let filtered_markets = this.filterList(event)
    //this.setState({markets: filtered_markets})
  }

  //filterList = (event) => {
  //  let updatedList = this.props.markets
  //  updatedList = updatedList.filter((item) => {
  //    return item.name.toLowerCase().search(
  //      event.target.value.toLowerCase()) !== -1
  //  })
  //  return updatedList
  //}

  render(){

    return(
      <Table responsive condensed hover>
    		<thead>
    			<tr>
    				<th>Rank</th>
            <th>Name</th>
            <th>Price </th>
    				<th>24h Volume</th>
            <th>Market Cap</th>
            <th>Available Supply</th>
            <th>Percent Change 1h</th>
            <th>Percent Change 24h</th>
            <th>Percent Change 7d</th>
    			</tr>
    		</thead>
    		<tbody>
        {
          this.props.assets.map((asset) =>
            <AssetRow key={uuid()} asset={asset}></AssetRow>
          )
        }
        </tbody>
      </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(AssetList)
