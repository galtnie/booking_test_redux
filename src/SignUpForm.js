import React from 'react';
import { Field, reduxForm} from 'redux-form';
// import { connect } from 'react-redux';
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { Link, Redirect } from 'react-router-dom';
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';


const styles = theme => ({
    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
    //   marginLeft: theme.spacing.unit * 3,
    //   marginRight: theme.spacing.unit * 3,
    //   [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
    //     width: 400,
    //     marginLeft: 'auto',
    //     marginRight: 'auto',
    //   },
    },
    paper: {
    //   marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    //   padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    container: {
      display: "flex",
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: "wrap"
    },
    textField: {
    //   marginLeft: theme.spacing.unit,
    //   marginRight: theme.spacing.unit,
      width: '25em'
    },
    dense: {
      marginTop: 16
    },
    menu: {
      width: 200
    }
  });
























class SignUpForm extends React.Component {
 
    renderEmailInput(formProps) {
        return (
             <TextField { ...formProps.input } 
                id="outlined-required"  // "outlined-error"
                margin="dense" 
                variant="outlined"
                placeholder="Placeholder"  
                label={formProps.label}
                type="email"
            />          
        );
    }
  
    renderPasswordInput(formProps) {
        return (
             <TextField { ...formProps.input } 
             error = {false}
                id="outlined-required"   // "outlined-error"
                margin="normal"
                variant="outlined"  
                
                label={formProps.label}
                type="password" // text
            />          
        );
    }

    // <TextField                                   THE SAME AS ABOBE BUT WITHOUT ES6
            //  onChange={formProps.input.onChange} 
            //  value={formProps.input.value}
            // />

    onSubmit(formValues) {
        console.log(formValues)
    }


    
    render () {
        const { classes } = this.props;
        return (
            <main className={classes.main}>

            <CssBaseline />
            <Paper className={classes.paper} >
              <form className={classes.container} autoComplete="off" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <p style={{ fontSize: "1.25em" }}>
                  CREATE YOUR ACCOUNT
            </p>


                <Field name='email' component={this.renderEmailInput} label="Enter email" placeholder="Placeholder"/>
                <Field name='password' component={this.renderPasswordInput} label="Enter password" />
                <Field name='confirmPassword' component={this.renderPasswordInput} label="Confirm password"/>
                
                {/* <TextField
        error
        id="outlined-error"
        label="Error"
        defaultValue="Hello World"
        className={classes.textField}
        margin="normal"
        variant="outlined"
      /> */}

                       <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                // onClick={this.handleSubmit.bind(this)}
                >
                Create account
        </Button>

            </form>
            <Link to="/">
              <p style={{ marginTop: "1.5em", color: 'darkblue', textDecoration: 'underline' }} >Return to Home page</p>
            </Link>
          </Paper>
        </main>


        );
    }
}


const validate = (formValues) => {
    const errors = {};

    if(!formValues.email) {
        errors.email = 'You must enter email'
    }

    if(!formValues.password) {
        errors.password = 'You must enter password'
    }

    if(!formValues.confirmPassword) {
        errors.confirmPassword = 'You must confirm password'
    }

    return errors;
}


export default reduxForm({
    form: 'signUpForm',
    validate
})( withStyles(styles)(SignUpForm));












//     renderError({error, touched}) {
//         if (touched && error) {
//             return (
//                 <div className='ui error message'>
//                     <div className='header'>{error}</div>
//                 </div>
//             );
//         }
//     }

//     renderInput = ({input, label, meta}) => {  // formProps
//         const className = `field ${meta.error && meta.touched ? 'error' : ''}`
//         return (
//             <div className={className}>
//                 <label>{label}</label>
//                 <input {...input} autoComplete='off' />              {/*   ...formProps.input */}
//                     {/* onChange={formProps.input.onChange} 
//                     value={formProps.input.value} */}
//                 {this.renderError(meta)}
//             </div>
//         ); 
//     }  








//     render() {
//         return (
//             <div>

//                 <form
//                     // onSubmit={this.props.handleSubmit(this.onSubmit)}
//                     className='ui form error'
//                 >
//                     <Field name='title' component={this.renderInput} label='Enter Title' />
//                     <Field name='description' component={this.renderInput} label='Enter Description' />
//                     <button className='ui button primary'>Submit</button>
//                 </form>

//                 SignUpForm
//             </div>
//         );
//     }

// }



// const validate = (formValues) => {
//     const errors = {};

//     if (!formValues.title) {
//         errors.title = 'You must enter a title';
//     }

//     if (!formValues.description) {
//         errors.description = 'You must enter a description';
//     }

//     return errors;
// };

// const formWrapped = reduxForm({
//     form: 'signUpForm',
//     validate
//   })(SignUpForm);


//   export default connect(null,{  })(formWrapped);               // import {createStream} from '../../actions';



