import './css/SignUpForm.css'
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { Link, Redirect } from 'react-router-dom';
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import { registerAccount } from './actions'


class SignUpForm extends React.Component {
  state = {
    passwordType: 'password',
    password: '',
    confirmPassword: '',
  }

  renderError = ({ error, touched, active }) => {
    return (error && touched && !active) 
      ? 
        { err: true, txt: <div className="error"> {error} </div>}
      : 
        { err: false, txt: null }
  }

  renderInput = (formProps) => {
    return (
      <div className='input-container'>
        <TextField {...formProps.input}
          id="outlined-dense"
          label={formProps.label}
          placeholder = {formProps.input.name === 'email' ? 'email@name.tld' : 'pA$$_W0rd' } 
          margin="dense"
          variant="outlined"
          type={formProps.input.name === 'email' ? 'email' : this.state.passwordType } 
          className='field'
          error={this.renderError(formProps.meta).err}
        />
        {this.renderError(formProps.meta).txt}
      </div>
    );
  }

  onSubmit = (formValues) => {
    console.log('SENT', formValues)
    this.props.registerAccount(formValues.email.toLowerCase(), formValues.password)
  }

  onCheckboxClick = () => {
    this.setState({ passwordType: this.state.passwordType === 'password' ? 'text' : 'password' })
  }

  checkReg = (err, acc) => {
    console.log(err ? err : null)
    console.log(acc ? acc : null)
  }

  render() {

    this.checkReg( this.props.registrationError, this.props.newAccountCreated)
    // console.log('PROPS: ', this.props)

    console.log(window.history)

    return (
      <main className='main-signup'>
        <CssBaseline />
        <Paper className='paper'>
          <form className='container' autoComplete="off" onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <div className='signup-title'>
              CREATE YOUR ACCOUNT
            </div>
            <Field
              name='email'
              component={this.renderInput}
              label="Enter email"
          
            />
            <Field
              name='password'
              component={this.renderInput}
              label="Enter password"
              value={this.state.password}
              onChange={(e) => { this.setState({ password: e.target.value }) }}
            />
            <Field
              name='confirmPassword'
              component={this.renderInput}
              label="Confirm password"
              value={this.state.confirmPassword}
              onChange={(e) => { this.setState({ confirmPassword: e.target.value }) }}
            />
            <div style={{ marginRight: "8.5em", marginBottom: '1.5em' }}>
              <Checkbox
                onClick={() => { this.onCheckboxClick() }}
                value="checkedB"
                color="primary"
              />
              <span style={{ fontSize: '1.1em', color: 'gray' }}>Show password</span>
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Create account
            </Button>
          </form>
          <div className='link-container'>
            <Link to="/">
              <p className='link'>Return to Home page</p>
            </Link>
          </div>
        </Paper>
      </main>
    );
  }
}


const validate = (formValues) => {
  const errors = {};

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

  return errors;
}

const mapStateToProps = (state) => ({
  registrationError: state.registrationError,
  newAccountCreated: state.newAccountCreated
});

SignUpForm = connect(
  mapStateToProps,
  {registerAccount}
)(SignUpForm)

export default reduxForm({
  form: 'signUpForm',
  validate
})(SignUpForm);




