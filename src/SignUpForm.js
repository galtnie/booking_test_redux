import './css/SignUpForm.css'
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import { Link, Redirect } from 'react-router-dom'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import CssBaseline from '@material-ui/core/CssBaseline'
import history from './history'
import axios from 'axios'

class SignUpForm extends React.Component {
  state = {
    password: '',
    confirmPassword: '',
    serverError: null,
    passwordIsMasked: true
  }

  renderError = ({ error, touched, active }) => {
    return error && touched && !active
      ? { err: true, txt: <div className='error'> {error} </div> }
      : { err: false, txt: null }
  }

  renderInput = formProps => {
    return (
      <div className='input-container'>
        <TextField
          {...formProps.input}
          //id='outlined-dense'
          label={formProps.label}
          placeholder={
            formProps.input.name === 'email' ? 'email@name.tld' : 'pA$$_W0rd'
          }
          margin='dense'
          variant='outlined'
          type={
            formProps.input.name === 'email' ? 'email' : (this.state.passwordIsMasked ? 'password' : 'text')
          }
          className='field'
          error={this.renderError(formProps.meta).err}
        />
        {this.renderError(formProps.meta).txt}
      </div>
    )
  }

  onSubmit = formValues => {
    axios.post(
        'https://web-ninjas.net/signUp',
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
        { data: {
            email: formValues.email.toLowerCase(),
            password: formValues.password
        }}
      )
      .then(() =>{
        history.push('/login')
      })
      .catch(e => {
       if (e.response.data.errors.errors.email && e.response.data.errors.errors.email.kind === 'unique') {
          this.setState({ serverError: 'This e-mail is already used on this website.'})
          setTimeout(()=>{ this.setState({ serverError: null}) }, 4000)
       }
      })
  }

  togglePasswordMask = () => {
    this.setState(prevState => ({
      passwordIsMasked: !prevState.passwordIsMasked,
    }));
  }

  render () {
    return (
      <main className='main-signup'>
        <CssBaseline />
        <Paper className='paper'>
          <form className='container' autoComplete='off' onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <div className='signup-title'>CREATE YOUR ACCOUNT</div>
            <Field name='email' component={this.renderInput} label='Enter email' />
            <Field
              name='password'
              component={this.renderInput}
              label='Enter password'
              value={this.state.password}
              onChange={e => {this.setState({ password: e.target.value }) }}
            />
            <Field
              name='confirmPassword' 
              component={this.renderInput}
              label='Confirm password'
              value={this.state.confirmPassword}
              onChange={e => {this.setState({ confirmPassword: e.target.value }) }}
            />
            <div style={{ marginRight: '8.5em',  }}> 
              <label style={{ fontSize: '1.1em', color: 'gray' }}>
                <Checkbox onClick={this.togglePasswordMask} value='checkedB' color='primary' />
                Show password
              </label>
            </div>
            <div className='server-error' name='server-error' style={{height: '2em', width: '21em', color:'red', fontWeight:'bold'}}>
                  <span>{this.state.serverError} </span>
            </div>
            <Button type='submit' variant='contained' color='primary'>
              Create account
            </Button>
          </form>
          <div className='link-container'>
            <Link to='/'>
              <p className='link'>Return to Home page</p>
            </Link>
          </div>
        </Paper>
      </main>
    )
  }
}

const validate = formValues => {
  const errors = {}
  if (!formValues.email) {
    errors.email = 'You must enter email'
  }

  if (!formValues.password) {
    errors.password = 'You must enter password'
  } else if (formValues.password.length < 6) {
    errors.password = 'The password must contain at least 6 characters'
  }

  if (!formValues.confirmPassword) {
    errors.confirmPassword = 'You must confirm password'
  } else if (formValues.password !== formValues.confirmPassword) {
    errors.confirmPassword = 'The password and its confirmation do not match'
  }

  return errors
}

const mapStateToProps = state => ({
  registrationError: state.registrationError,
  newAccountCreated: state.newAccountCreated
})

SignUpForm = connect(mapStateToProps, {})(SignUpForm)

export default reduxForm({
  form: 'signUpForm',
  validate
})(SignUpForm)
