import React, { Component } from 'react'
import { Navbar, FormGroup, FormControl, Button, NavItem, Nav } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import axios from 'axios'
import NumberFormat from 'react-number-format'

export default class ExchangesNavBar extends Component {

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
            <NavItem eventKey={3} href="/exchanges">
              Exchanges
            </NavItem>
            <NavItem eventKey={4} href="/about">
              About
            </NavItem>
          </Nav>

          <Navbar.Text pullRight className='global-market-infos'>
              <span className='global-market-info-line-2'>
              Total Market Cap : {' '}
              <NumberFormat value={this.state.global_market_infos['total_market_cap_usd'] || 0} displayType={'text'} thousandSeparator={" "} prefix={'$'} decimalScale={1} />
              </span>
              <span className='global-market-info-line-1'>
              24H Volume : {' '}
              <NumberFormat value={this.state.global_market_infos['total_24h_volume_usd'] || 0} displayType={'text'} thousandSeparator={" "} prefix={'$'} decimalScale={1} />
              </span>
          </Navbar.Text>

    		</Navbar.Collapse>
  	  </Navbar>
    )
  }
}
