import React from 'react'
import { Free, Busy, Chosen } from './Rooms'
// import history from '../history '
import { GuideContainer, GuideParagraph, GuideSpan, GuideDiv } from '../styles'
import { connect } from 'react-redux'

class Guide extends React.Component {
    render(){
    return (
        <div>
            <GuideContainer>
                <div>
                    {
                        this.props.user === null 
                            ?
                            <GuideParagraph>
                                Log in to <b>make reservations</b>.
                            </GuideParagraph>
                            : null
                    }
                    <GuideParagraph>
                        <b>9"</b> means 9:00-9:59.
                    </GuideParagraph>
                    {
                        this.props.user !== null 
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
                        <Free guide={true} />
                        <GuideSpan>
                            The red room is <b>FREE</b> now.
                        </GuideSpan>
                    </GuideDiv>
                    <GuideDiv>
                        <Busy guide={true} />
                        <GuideSpan>
                            The red room is <b> RESERVED </b> now.
                        </GuideSpan>
                    </GuideDiv>
                    {
                        this.props.user !== null 
                            ?
                            <GuideDiv>
                                <Chosen guide={true} />
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
} }

const mapStateToProps = state => ({user:state.user})

export default Guide = connect(mapStateToProps, { })(Guide)