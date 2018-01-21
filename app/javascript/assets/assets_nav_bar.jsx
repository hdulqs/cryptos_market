import React, { Component } from 'react'
import { Navbar, FormGroup, FormControl, Button, NavItem, Nav } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as assets_actions from './actions'

class AssetsNavBar extends Component {

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
              Coins
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
