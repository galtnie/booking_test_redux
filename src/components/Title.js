import React from 'react'
import { TitleDiv, TitleLine } from '../styles'

export default class Title extends React.Component{
    render() {
        return(
            <TitleDiv>
                <TitleLine> 
                    Conference Venue Booking
                </TitleLine>
            </TitleDiv>
        );
    }
}