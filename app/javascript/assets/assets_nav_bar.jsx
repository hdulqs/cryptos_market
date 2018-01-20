import React, { Component } from 'react'
import { Navbar, FormGroup, FormControl, Button, NavItem, Nav } from 'react-bootstrap'

const AssetsNavBar = () => {
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
    					<FormControl type="text" placeholder="Search Asset" />
    				</FormGroup>{' '}
    				<Button type="submit">Search</Button>
    			</Navbar.Form>

  		</Navbar.Collapse>
	  </Navbar>
  )
}

export default AssetsNavBar
