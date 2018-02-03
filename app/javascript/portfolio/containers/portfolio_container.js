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
import Overview from './../components/overview'
import PortfolioPieChart from './../components/portfolio_pie_chart'

class PortfolioContainer extends Component {

  constructor(props){
    super(props)
    this.state = {
      show_add_asset_modal: false
    }
  }

  componentDidMount(){
    //console.log(this.props.jwt)
    if(localStorage.jwt && localStorage.jwt.length){
      this.props.fetch_portfolio_assets(localStorage.jwt)
    }else{
      history.push('sign_in')
    }
  }

  close_asset_modal = () => {
    this.setState({show_add_asset_modal: false})
  }

  open_asset_modal = () => {
    this.setState({show_add_asset_modal: true})
  }

  render() {

    let assets_chart_data = this.props.assets_chart_data[this.props.selected_portfolio_asset] === undefined ?
      []
      :
      this.props.assets_chart_data[this.props.selected_portfolio_asset]

    return(
      <Grid fluid={true}>

        <Modal show={this.state.show_add_asset_modal} onHide={this.close_asset_modal}>
          <Modal.Header closeButton>
            <Modal.Title>Add new Asset to Portfolio</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Text in a modal</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button className='btn btn-danger' onClick={this.close_asset_modal}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Row className="portfolio-chart-row">
          <Col xs={12} md={12}>
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
          <Col xs={12} md={6}>
            <PortfolioList />
            <Button className='btn btn-info' onClick={this.open_asset_modal}>Add Asset</Button>
          </Col>
          <Col xs={12} md={6}>
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
    assets_chart_data: state.AssetsReducer.assets_chart_data
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, portfolio_actions, assets_actions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioContainer)
