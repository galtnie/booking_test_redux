import React from 'react'
import { compose } from 'redux';
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup'
import history from './history'
import axios from 'axios'
import { connect } from 'react-redux'
import { createNewUserAccount, eraseNewUserAccount, storeUser } from './actions'
import { Redirect } from 'react-router-dom'
import { LoginError, ReturnHomeLink } from './styles'
import styles from './styles/LoginMUIstyles'

class SignInForm extends React.Component {
  
  componentDidMount() {
    console.log(window.location.pathname)
        
      }
  
  
  componentWillUnmount() {
    if (localStorage.getItem('user')) {
      let data = localStorage.getItem('user')
      this.props.storeUser(JSON.parse(data))
      localStorage.removeItem('user')
    }    
  }
  render() {
    const {
      values,
      errors,
      touched,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit,
      classes
    } = this.props  

    return (
      (!this.props.user)
      ?
      <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Form className={classes.form} onSubmit={handleSubmit}>
          <FormControl margin='normal' fullWidth>
            <InputLabel htmlFor='email'>Email Address</InputLabel>
            <Field
              component={Input}
              id='email'
              name='email'
              autoComplete='email'
              autoFocus
              placeholder='email@name.tld'
              error={Boolean(errors.email) && touched.email}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
              <LoginError>
                {touched.email && errors.email && <p>{errors.email}</p>}
              </LoginError>
          </FormControl>

          <FormControl margin='normal' fullWidth>
            <InputLabel htmlFor='password'>Password</InputLabel>
            <Field
              component={Input}
              name='password'
              type='password'
              id='password'
              error={Boolean(errors.password) && touched.password}
              placeholder='pA$$_W0rd'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <LoginError>
              {touched.password && errors.password && <p>{errors.password}</p>}
            </LoginError>
          </FormControl>

          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />

          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            disabled={isSubmitting}
          >
            Sign in
          </Button>
        </Form>
        <Link to='/'>
          <ReturnHomeLink>
            Return to Home page
          </ReturnHomeLink>
        </Link>
      </Paper>
    </main>
      :
      <Redirect to='/booking' />     
    )
  }
}

const mapStateToProps = state => ({
  newUserAccount: state.newUserAccount,
  user: state.user
})

export default compose(
  connect(mapStateToProps, { eraseNewUserAccount, createNewUserAccount, storeUser }),
  withFormik({
    mapPropsToValues: ({newUserAccount}) => {           
      let email = newUserAccount   
      return ({
        email: email || '',
        password: ''
      })
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required('Email is required')
        .email('Email must be valid'),
      password: Yup.string()
        .required('Password is required')
    }),
    handleSubmit: (values, { resetForm, setErrors, setSubmitting }) => {
      setSubmitting(true)
      axios.post(
        'https://web-ninjas.net/signIn',
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
        {
          data: {
            email: values.email.toLowerCase(),
            password: values.password
          }
        }
      )
        .then(res => localStorage.setItem("user", JSON.stringify(res.data)))
        .then(()=> {
          if (window.location.pathname.includes('/booking_test_redux')){
            history.push('/booking_test_redux/booking')
          } else {
            history.push('/booking')
          }        
        })
        .catch(err => {
          if (err.response) { setErrors({ email: err.response.data.message }) }
          setSubmitting(false)
        })
    }
  })
)(withStyles(styles)(SignInForm))


