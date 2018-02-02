import React, { Component } from 'react'
import Cable from 'actioncable'
import axios from 'axios'
import { Grid, Glyphicon, Form, FormGroup, Col, FormControl, ControlLabel, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as sessions_actions from './../actions'
import history from './../../main/history'

class SignInContainer extends Component {

  constructor(props){
    super(props)
    this.state = {
      sessions: {
        email: '',
        password: ''
      }
    }
  }

  componentDidMount(){
    if(localStorage.session === "true"){
      history.push('/')
    }
  }

  email_form_update = (event) => {
    this.setState({sessions: {email: event.target.value, password: this.state.sessions.password}})
  }

  password_form_update = (event) => {
    this.setState({sessions: {password: event.target.value, email: this.state.sessions.email}})
  }

  sessions_form_submit = (event) => {
    event.preventDefault()
    this.props.submit_form_sessions(this.state.sessions)
    //console.log(this.state.sessions)
  }


  render() {

    return(
      <Grid fluid={true}>
        <br/>
        <h2 className='text-center'>Login</h2>

        <p className='text-center sessions_error'>{this.props.errors.code} {this.props.errors.message}</p>

        <Form horizontal>

          <FormGroup controlId="formHorizontalEmail">
            <Col sm={3}> </Col>
            <Col sm={6}> <hr/> </Col>
            <Col sm={3}> </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalEmail">
            <Col sm={3}> </Col>
            <Col sm={6}> <FormControl type="email" placeholder="Email" value={this.state.email} onChange={this.email_form_update} /> </Col>
            <Col sm={3}> </Col>
            </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col sm={3}> </Col>
            <Col sm={6}> <FormControl type="password" placeholder="Password" value={this.state.password} onChange={this.password_form_update} /> </Col>
            <Col sm={3}> </Col>
          </FormGroup>

          <FormGroup>
            <Col sm={3}> </Col>
            <Col sm={6}> <Button className='btn btn-block btn-success' type="submit" onClick={this.sessions_form_submit}>Sign in</Button> </Col>
            <Col sm={3}> </Col>
          </FormGroup>

        </Form>

      </Grid>
    )
  }

}
const mapStateToProps = (state) => {
  return {
    jwt: state.SessionsReducer.jwt,
    session: state.SessionsReducer.session,
    user: state.SessionsReducer.user,
    errors: state.SessionsReducer.errors
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(sessions_actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer)
