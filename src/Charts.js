import React from 'react';
import { connect } from 'react-redux';
import UpperBar from './components/UpperBar';
import Title from './components/Title'

class Charts extends React.Component {
    state= {}

    render() {
        return(
            <div>
            <UpperBar />
            <Title />
            CHARTS
            </div>
        );    
    }
} 



export default connect(null, {})(Charts)