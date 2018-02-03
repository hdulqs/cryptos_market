import React, { Component } from 'react'
import AssetRow from './asset_row'
import { Row, Table, FormControl } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as assets_actions from './../actions'
import uuid from 'uuid/v1'

const styles = {

}


class AssetList extends Component {

  constructor(props){
    super(props)
    this.state = {
      style: styles,
      time_scale: '7d'
    }
  }



  //filterList = (event) => {
  //  let updatedList = this.props.markets
  //  updatedList = updatedList.filter((item) => {
  //    return item.name.toLowerCase().search(
  //      event.target.value.toLowerCase()) !== -1
  //  })
  //  return updatedList
  //}

  one_month_scale = () => {
    this.props.assets.forEach((asset) => {
      this.props.retrieve_assets_ohcl(asset.symbol, '1m')
    })
    this.setState({time_scale: '1m'})
  }

  seven_days_scale = () => {
    this.props.assets.forEach((asset) => {
      this.props.retrieve_assets_ohcl(asset.symbol, '7d')
    })
    this.setState({time_scale: '7d'})
  }

  one_day_scale = () => {
    this.props.assets.forEach((asset) => {
      this.props.retrieve_assets_ohcl(asset.symbol, '1d')
    })
    this.setState({time_scale: '1d'})
  }

  six_hour_scale = () => {
    this.props.assets.forEach((asset) => {
      this.props.retrieve_assets_ohcl(asset.symbol, '6h')
    })
    this.setState({time_scale: '6h'})
  }

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
            <th>24h Change</th>
            <th>
              <span className={this.state.time_scale === '1m' ? 'scale_link active_scale' : 'scale_link'} onClick={this.one_month_scale}>1m</span>&nbsp;&nbsp;&nbsp;
              <span className={this.state.time_scale === '7d' ? 'scale_link active_scale' : 'scale_link'} onClick={this.seven_days_scale}>7d</span>&nbsp;&nbsp;&nbsp;
              <span className={this.state.time_scale === '1d' ? 'scale_link active_scale' : 'scale_link'} onClick={this.one_day_scale}>1d</span>&nbsp;&nbsp;&nbsp;
              <span className={this.state.time_scale === '6h' ? 'scale_link active_scale' : 'scale_link'} onClick={this.six_hour_scale}>6h</span>
            </th>
    			</tr>
    		</thead>
    		<tbody>
        {
          this.props.assets.map((asset) =>
            <AssetRow time_scale={this.state.time_scale} key={uuid()} asset={asset}></AssetRow>
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
