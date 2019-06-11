import styled from 'styled-components';
import Button from "@material-ui/core/Button";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`

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