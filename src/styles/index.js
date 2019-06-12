import styled from 'styled-components';
import Button from "@material-ui/core/Button";
import Select from 'react-select'; 
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import  Carousel  from  'semantic-ui-carousel-react';

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

export const DateInputContainer = styled.div`
    padding-right: 1em; 
    display: flex !important;
    flex-direction: row !important;
    justify-content: center;
    @media only screen and (max-width: 480px) {
        margin-left: 1em;
    }
`;

export const DateInput = styled.input`
    width: 10.5em !important;
    padding: 0.2em !important;
    line-height: 1em;
    background: #FBFBFF; 
`;

export const SearchIconContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 0.5em;
`;

export const SearchIcon = styled.i`
    color: #FBFBFF;
    cursor: pointer;
`;

export const GuideContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    color: #7D6B91;
    padding-top: 2em;
    padding-bottom: 1em;
    margin-left: 0.5em;
    margin-right: 0.5em;
    flex-wrap: wrap;
`;

export const GuideParagraph = styled.p`
    font-size: 1.2em;
    margin-left: 0.5em;
    margin-right: 0.5em;
    margin-top: 0;
    margin-bottom: 0;
    color: #272838;
`;

export const GuideSpan = styled.span`
    font-size: 1.2em;
    margin-left: 0.5em;
    margin-right: 0.5em;
    margin-top: 0;
    margin-bottom: 0;
    color: #272838;
`;

export const GuideDiv = styled.div`
    display: flex; 
    flex-direction: row;
    align-items: center;
    margin-left: 0.5em;
`;

export const TitleDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    color: #7D6B91;
    padding-top: 3em;
    padding-bottom: 2em;
    margin-left: 0.5em;
    margin-right: 0.5em;
    @media only screen and (max-width: 480px) {
        margin-top: 5em;
        color: #748CAB;
        padding-top: 2em;
        padding-bottom: 1em;
    }
`;

export const TitleLine = styled.div`
    color: #7D6B91 !important;
    font-size: 2em !important;
    font-weight: bold;
    @media only screen and (max-width: 480px) {
        color: #748CAB !important;
    }
`;

export const HallsMain = styled.div`
    display: flex;
    flex-direction: row;
    flex-flow: wrap;
    justify-content: space-around; 
`;

export const HallCard = styled(Card)`
    max-width: 400;
    margin: 0.2em;
    width: 18.5em;
`;

export const HallTitleContainer = styled.div`
    height: 4em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.2em;
    font-weight: bold;
    background: ${({colour}) => 
        colour === 'blu' ? 'rgb(18, 11, 120)' :
        colour === 'red' ? 'rgb(178,34,34)' :
        colour === 'gre' ? 'rgba(19, 55, 11, 0.9)' :
        colour === 'vio' ? 'rgba(108, 92, 231, 0.9)' : null
    };    
    color: ${({colour}) =>
        colour === 'blu' ? 'rgba(206, 221, 252, 1)' :
        colour === 'red' ? 'rgb(252, 200, 208)' :
        colour === 'gre' ? 'rgba(216, 255, 206, 1)' :
        colour === 'vio' ? 'rgba(255,  245,  255, 1)' : null
    }; 
`;

export const HallCardContent = styled(CardContent)`
    font-weight: bold;
    padding-bottom: 1.4em !important;
    padding: 1.4em !important;
    text-align: center;
    background: ${({colour}) => 
        colour === 'blu' ? 'rgb(18, 11, 120)' :
        colour === 'red' ? 'rgb(178,34,34)' :
        colour === 'gre' ? 'rgba(19, 55, 11, 0.9)' :
        colour === 'vio' ? 'rgba(108, 92, 231, 0.9)' : null
    }; 
    color: ${({colour}) =>
        colour === 'blu' ? 'rgba(206, 221, 252, 1)' :
        colour === 'red' ? 'rgb(252, 200, 208)' :
        colour === 'gre' ? 'rgba(216, 255, 206, 1)' :
        colour === 'vio' ? 'rgba(255,  245,  255, 1)' : null
    };  
`;

export const HallCardMedia = styled(CardMedia)`
        height: 0;
        padding-top: 56.25%; 
`;

export const HallCarousel = styled(Carousel)`
    background-color: #ECF0F1 !important;
`;