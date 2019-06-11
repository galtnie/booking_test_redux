import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import axios from 'axios'
import { createNewUserAccount } from './actions'
import history from './history'
import { 
  SignupMain,
  SingupPaper,
  SingupFormContainer,
  SignupTitle,
  SignupCheckboxContainer,
  SignupCheckboxLabel,
  SignupServerError,
  SignupLinkContainer,
  ReturnHomeLink,
  SignupErrorContainer,
  SignupInputContainer,
  SignupTextField
} from './styles'

class SignUpForm extends React.Component {
  state = {
    signUpEmail: '',
    signUpPassword: '',
    confirmPassword: '',
    serverError: null,
    passwordIsMasked: true,
  }
  renderError = ({ error, touched, active }) => {
    return error && touched && !active ? <SignupErrorContainer> {error} </SignupErrorContainer> : null
  }
  renderInput = formProps => {
    return (
      <SignupInputContainer>
        <SignupTextField
          {...formProps.input}
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
          error={Boolean(this.renderError(formProps.meta))}
        />
        {this.renderError(formProps.meta)}
      </SignupInputContainer>
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
      .then(() => {
        this.props.createNewUserAccount(formValues.email)
      })
      .then(()=>history.push('/login'))
      .catch(e => {
       if (e.response && e.response.data.errors.errors.email.kind === 'unique') {
          this.setState({ serverError: 'This e-mail is already used on this website.'}) 
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
      (!this.props.user) 
        ?
      <SignupMain>
        <CssBaseline />
        <SingupPaper>
          <SingupFormContainer autoComplete='off' onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <SignupTitle>
              CREATE YOUR ACCOUNT
            </SignupTitle>
            <Field 
              name='email' 
              component={this.renderInput} 
              label='Enter email'
              value={this.state.signUpEmail}
              onChange={e => {
                this.setState({ signUpEmail: e.target.value }) 
                this.state.serverError !== null && this.setState({ serverError: null})
              }} 
            />
            <Field
              name='password'
              component={this.renderInput}
              label='Enter password'
              value={this.state.signUpPassword}
              onChange={e => {this.setState({ signUpPassword: e.target.value }) }}
            />
            <Field
              name='confirmPassword' 
              component={this.renderInput}
              label='Confirm password'
              value={this.state.confirmPassword}
              onChange={e => {this.setState({ confirmPassword: e.target.value }) }}
            />
            <SignupCheckboxContainer> 
              <SignupCheckboxLabel>
                <Checkbox onClick={this.togglePasswordMask} value='checkedB' color='primary' />
                Show password
              </SignupCheckboxLabel>
            </SignupCheckboxContainer>
            <SignupServerError name='server-error'>
                  <span>{this.state.serverError} </span>
            </SignupServerError>
            <Button type='submit' variant='contained' color='primary'>
              Create account
            </Button>
          </SingupFormContainer>
          <SignupLinkContainer>
            <Link to='/'>
              <ReturnHomeLink>
                Return to Home page
              </ReturnHomeLink>
            </Link>
          </SignupLinkContainer>
        </SingupPaper>
      </SignupMain>
        : 
      <Redirect to='/booking' />
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

const mapStateToProps = state => ({user:state.user})

SignUpForm = connect(mapStateToProps, { createNewUserAccount })(SignUpForm)

export default reduxForm({
  form: 'signUpForm',
  validate
})(SignUpForm)
