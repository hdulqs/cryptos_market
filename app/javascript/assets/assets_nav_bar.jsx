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
      					<FormControl type="text" placeholder="Search Asset" onChange={this.search_asset} />
      				</FormGroup>{' '}
      				<Button type="submit" value="none" onClick={this.search_asset}>Search</Button>
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
