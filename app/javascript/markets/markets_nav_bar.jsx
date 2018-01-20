import React, { Component } from 'react'
import { Navbar, FormGroup, FormControl, Button, NavItem, Nav } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as markets_actions from './actions'

class MarketsNavBar extends Component {

  search_market = (event) => {
    let value = ''
    if(event.target.value === 'none'){
      value = event.target.parentElement.getElementsByClassName('form-control')[0].value
    }else {
      value = event.target.value
    }
    this.props.set_markets_loading(true)
    this.props.market_search(value)
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
      					<FormControl type="text" placeholder="Search Market" onChange={this.search_market} />
      				</FormGroup>{' '}
      				<Button type="submit" value="none" onClick={this.search_market}>Search</Button>
      			</Navbar.Form>

    		</Navbar.Collapse>
  	  </Navbar>
    )
  }
}

//export default MarketsNavBar


const mapStateToProps = (state) => {
  return {
    markets: state.MarketsReducer.markets,
    current_page: state.MarketsReducer.current_page,
    is_markets_loading: state.MarketsReducer.is_markets_loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(markets_actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketsNavBar)
