import React, { Component } from 'react'
import { Navbar, FormGroup, FormControl, Button, NavItem, Nav } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as assets_actions from './actions'
import axios from 'axios'
import NumberFormat from 'react-number-format'

class AssetsNavBar extends Component {

  constructor(props){
    super(props)
    this.state = {
      global_market_infos: {}
    }
  }

  componentDidMount(){
    this.fetch_global_infos()
  }

  fetch_global_infos = () => {
    axios.get('https://api.coinmarketcap.com/v1/global/', {responseType: 'json'})
      .then((response) => {
        this.setState({global_market_infos: response.data})
      })
      .catch((error) => {
        console.log(error)
      })
  }

  search_asset = (event) => {
    let value = ''
    if(event.target.value === 'none'){
      value = event.target.parentElement.getElementsByClassName('form-control')[0].value
    }else {
      value = event.target.value
    }
    this.props.set_assets_loading(true)
    this.props.asset_search(value)
  }

  key_press_search_asset = (event) => {
    if(event.charCode === 13){
      this.search_asset(event)
    }
  }

  reset_search_asset = (event) => {
    let value = ''
    this.props.set_assets_loading(true)
    this.props.asset_search(value)
    event.target.parentElement.getElementsByClassName('form-control')[0].value = ''
  }

  render(){
    return (
      <Navbar inverse>
    		<Navbar.Header>
    			<Navbar.Brand>
    				<a href="/">Cryptos Market</a>
    			</Navbar.Brand>
    			<Navbar.Toggle />
    		</Navbar.Header>
    		<Navbar.Collapse>

          <Nav>
            <NavItem eventKey={1} href="/">
              Assets
            </NavItem>
            <NavItem eventKey={2} href="/asset-pairs">
              Markets
            </NavItem>
          </Nav>

    			<Navbar.Form pullRight>
    				<FormGroup>
    					<FormControl type="text" placeholder="Search Asset" onKeyPress={this.key_press_search_asset} />
    				</FormGroup>{' '}
    				<Button type="submit" value="none" className='btn btn-info' onClick={this.search_asset}>Search</Button>&nbsp;
    				<Button type="submit" value="none" className='btn btn-danger' onClick={this.reset_search_asset}>Reset</Button>
    			</Navbar.Form>

          <Navbar.Text pullRight className='global-market-infos'>
              <div className='global-market-info-line-2'>
              Total Market Cap : {' '}
              <NumberFormat value={this.state.global_market_infos['total_market_cap_usd'] || 0} displayType={'text'} thousandSeparator={" "} prefix={'$'} decimalScale={1} />
              </div>
              <div className='global-market-info-line-1'>
              24H Volume : {' '}
              <NumberFormat value={this.state.global_market_infos['total_24h_volume_usd'] || 0} displayType={'text'} thousandSeparator={" "} prefix={'$'} decimalScale={1} />
              </div>
          </Navbar.Text>

    		</Navbar.Collapse>
  	  </Navbar>
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

export default connect(mapStateToProps, mapDispatchToProps)(AssetsNavBar)
