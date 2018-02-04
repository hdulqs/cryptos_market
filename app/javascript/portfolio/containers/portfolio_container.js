import React, { Component } from 'react'
import Cable from 'actioncable'
import axios from 'axios'
import PortfolioList from './../components/portfolio_list'
import { Grid, Glyphicon, Row, Col, Modal, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as portfolio_actions from './../actions'
import * as assets_actions from './../../assets/actions'
import store from './../../main/store'
import history from './../../main/history'
import CandleChart from './../components/candle_chart'
import AssetOverview from './../components/asset_overview'
import PortfolioPieChart from './../components/portfolio_pie_chart'
import AddAssetModal from './../components/add_asset_modal'


class PortfolioContainer extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    if(localStorage.jwt && localStorage.jwt.length){
      this.props.fetch_portfolio_assets(localStorage.jwt)
    }else{
      history.push('sign_in')
    }
  }

  open_asset_modal = () => {
    this.props.set_show_add_asset_modal(true)
  }

  render() {

    let assets_chart_data = this.props.assets_chart_data[this.props.selected_portfolio_asset] === undefined ?
      []
      :
      this.props.assets_chart_data[this.props.selected_portfolio_asset]

    return(
      <Grid fluid={true}>

        { this.props.is_add_asset_modal_visible && <AddAssetModal /> }

        <Row className="portfolio-chart-row">
          <Col xs={12} md={2} sm={2}>
            <AssetOverview />
          </Col>
          <Col xs={12} md={10} sm={10}>
            {
              assets_chart_data.length === 0 ?
                <div className="loader-small"></div>
                :
                <div className='candle-chart'>
                  <h2 className='text-center'>{this.props.selected_portfolio_asset} - USD</h2>
                  <CandleChart data={assets_chart_data} />
                </div>
            }
          </Col>
        </Row>

        <Row className="show-grid">
          <Col xs={12} md={8} sm={8}>
            <PortfolioList />
            <Button className='btn btn-info' onClick={this.open_asset_modal}>Add Asset</Button>
          </Col>
          <Col xs={12} md={4} sm={4}>
            <PortfolioPieChart />
          </Col>
        </Row>

      </Grid>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    jwt: state.SessionsReducer.jwt,
    portfolio_assets: state.PortfolioReducer.portfolio_assets,
    selected_portfolio_asset: state.PortfolioReducer.selected_portfolio_asset,
    assets_chart_data: state.AssetsReducer.assets_chart_data,
    is_add_asset_modal_visible: state.PortfolioReducer.is_add_asset_modal_visible
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, portfolio_actions, assets_actions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioContainer)
