import '../css/Guide.css'
import React from 'react'
import { RedFree, RedBusy, RedChosen } from './Rooms'
import history from '../history'
import { GuideContainer, GuideParagraph, GuideSpan, GuideDiv } from '../styles'

export default function Guide() {
    return (
        <div>
            <GuideContainer>
                <div>
                    {
                        (history.location.pathname !== "/booking") ?
                            <GuideParagraph>
                                Log in to <b>make reservations</b>.
                            </GuideParagraph>

                            : null
                    }
                    <GuideParagraph>
                        <b>9"</b> means 9:00-9:59.
                    </GuideParagraph>
                    {
                        (history.location.pathname === "/booking")
                            ?
                            <span>
                                <GuideParagraph>
                                    Having selected the slots to book
                            </GuideParagraph>
                                <GuideParagraph>
                                    click <b>PAYMENT</b> button.
                            </GuideParagraph>
                            </span>
                            : null
                    }

                </div>
                <div>
                    <GuideDiv>
                        <RedFree guide={true} />
                        <GuideSpan>
                            The red room is <b>FREE</b> now.
                        </GuideSpan>
                    </GuideDiv>
                    <GuideDiv>
                        <RedBusy guide={true} />
                        <GuideSpan>
                            The red room is <b> RESERVED </b> now.
                        </GuideSpan>
                    </GuideDiv>
                    {
                        (history.location.pathname === "/booking")
                            ?
                            <GuideDiv>
                                <RedChosen guide={true} /> 
                                <GuideSpan> 
                                    The red room is <b>SELECTED</b>, but not reserved yet. 
                                </GuideSpan>
                            </GuideDiv>
                            : null
                    }
                </div>
            </GuideContainer>
        </div>
    );
} 