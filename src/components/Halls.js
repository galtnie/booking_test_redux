import React from 'react';
import CircularProgress from './CircularProgress';
import { connect } from 'react-redux';

class Halls extends React.Component {
    
    componentDidMount() {
        // FETCH HALLS
    }

    render() {
        return (
            this.props.renderHalls 
            ? 
            this.props.renderHalls
            :
            <div className="ciruclar-progress-container">
                <CircularProgress />
            </div>
        );
    }
}


const mapStateToProps = (state) => {
	return { renderHalls: state.renderHalls };
};
export default connect(mapStateToProps, { })(Halls);