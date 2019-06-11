import styled from 'styled-components';
import Button from "@material-ui/core/Button";
import Select from 'react-select'; 
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

export const PaymentButton = styled(Button)`
    && {
        width: 50%;
        margin-bottom: 2em !important;
        position: inherit !important;
    }
    &&:hover {
        color: 	#4183c4;
    }
    @media only screen and (max-width: 480px) {
        && {
            background-color: #070600;
        }
        &&:hover {
            background-color: #070600;
            color: 	#4183c4;
        }
    }
`;

export const ChartPeriodSelect = styled(Select)`
    width: 10em;
    margin-left: 1em;
    justify-content: center;
`;

export const ChartSelectContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    flex-wrap: wrap;
    font-size: 1.2em;
    margin-left: 1em;
    margin-top: 1em;
`;

export const ChartTitle = styled.div`
    text-align: center;
    font-size: 1.5em;
    margin-top: 2em;
    margin-bottom: 1em;
`;

export const DoughnutChartContainer = styled.div`
    display: ${props => props.period === 'day' ? 'flex' : 'none'};
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const BarChartContainer = styled.div`
    display: ${props => props.period === 'day' ? 'none' : 'flex'};
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const LoginError = styled.div`
    color: red;
`;

export const ReturnHomeLink = styled.p`
    margin-top: 1.5em;
    color: darkblue;
    text-decoration: underline;
    font-size: 1.2em;
    padding-bottom: 0.5em;
`;

export const SignupMain = styled.div`
    display: block;  /* Fix IE 11 issue. */
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgb(207, 207, 207);
`;

export const SingupPaper = styled(Paper)`
    height: 45em;
    width: 32em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const SingupFormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
`;

export const SignupTitle = styled.div`
    font-size: 1.5em; 
    font-weight: bold;
    margin-bottom: 1em;
    color: #7D6B91;
`;

export const SignupCheckboxContainer = styled.div`
    margin-right: 8.5em;
`;

export const SignupCheckboxLabel = styled.label`
    font-size: 1.1em;
    color: gray;
`;

export const SignupServerError = styled.div`
    height: 2em;
    width: 21em;
    color: red;
    font-weight: bold;
`;

export const SignupLinkContainer = styled.div`
    margin-top: 1em;
`;

export const SignupErrorContainer = styled.div`
    color: red;
    font-weight: bold;
    font-size: 1.1em;
    padding-left: 1em;
    padding-top: 0.1em;
`;

export const SignupInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 7em;   
`;

export const SignupTextField = styled(TextField)`
    width: 18em;
`;

export const ConfirmContainer = styled.div`
    position: fixed;
    background: #E8F1F2;
    color: #13293D;
    top: 2em;
    padding: 2em;
    border-radius: 1em;
    overflow-y: auto;
    max-height: 90%;
    max-width: 90%;
    border: 1em solid #2185D0;
`;

export const ConfirmTitle = styled.h2`
    color: #945600;
`;

export const ConfirmTicketContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap; 
    width: 100%;
`;

export const ConfirmTitleInput = styled.input`
    background: #E8F1F2;
    color: #13293D;
    border: 0.1em solid #2185D0;
    line-height: 18px;
`;

export const ConfirmClickBttnNote = styled.h3`
    color: #945600;
`;

export const ConfirmBttnsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const CircularProgressContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const CurrentDateContainer = styled.div`
    font-family: sans-serif;
    font-size: 1.3em; 
`;