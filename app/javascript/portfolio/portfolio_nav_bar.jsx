import React, { Component } from 'react'
import { Navbar, FormGroup, FormControl, Button, NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as sessions_actions from './../sessions/actions'
import * as markets_actions from './../markets/actions'
import axios from 'axios'
import NumberFormat from 'react-number-format'
import history from './../main/history'

class PortfolioNavBar extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    if(this.props.markets_infos['total_24h_volume_usd'] === undefined){
      this.props.fetch_markets_infos()
    }
  }

  logout = () => {
    this.props.do_reset_local_storage_session()
  }

  navigate_to = (path) => {
    history.push(path)
  }

  render(){
    return (
      <Navbar inverse fluid>
    		<Navbar.Header>
    			<Navbar.Brand>
    				<a href="/">Cryptos Market</a>
    			</Navbar.Brand>
    			<Navbar.Toggle />
    		</Navbar.Header>
    		<Navbar.Collapse>

          <Nav>
            <NavItem eventKey={1} onClick={() => this.navigate_to('')}>
              Assets
            </NavItem>
            <NavItem eventKey={2} onClick={() => this.navigate_to('asset-pairs')}>
              Markets
            </NavItem>
            <NavItem eventKey={3} onClick={() => this.navigate_to('exchanges')}>
              Exchanges
            </NavItem>
            <NavItem active={true} eventKey={4} onClick={() => this.navigate_to('portfolio')}>
            Portfolio
            </NavItem>
            <NavItem eventKey={5} onClick={() => this.navigate_to('alarms')}>
              Alarms
            </NavItem>
            <NavItem eventKey={5} onClick={() => this.navigate_to('about')}>
              About
            </NavItem>
          </Nav>

          <Nav pullRight>

            { this.props.user.email === undefined ?

              <NavItem eventKey={6} onClick={() => this.navigate_to('sign_in')}>
                Login
              </NavItem>

              :

              <NavDropdown className='navbar-right' eventKey={6} title={this.props.user.email} id="basic-nav-dropdown">
                <MenuItem eventKey={6.1}>Edit Account</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={6.2} onClick={this.logout}>Logout</MenuItem>
              </NavDropdown>

            }

          </Nav>

          <Navbar.Text pullRight className='global-market-infos'>
            <span className='global-market-info-line-2'>
              Market Cap : {' '}
              <NumberFormat value={this.props.markets_infos['total_market_cap_usd'] || 0} displayType={'text'} thousandSeparator={" "} prefix={'$'} decimalScale={1} />
            </span>
            <span className='global-market-info-line-1'>
              24h Volume : {' '}
              <NumberFormat value={this.props.markets_infos['total_24h_volume_usd'] || 0} displayType={'text'} thousandSeparator={" "} prefix={'$'} decimalScale={1} />
            </span>
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
    is_assets_loading: state.AssetsReducer.is_assets_loading,
    markets_infos: state.MarketsReducer.markets_infos
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, sessions_actions, markets_actions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioNavBar)
