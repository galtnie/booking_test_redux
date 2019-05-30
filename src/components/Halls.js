import '../css/Halls.css'
import React from 'react';
import CircularProgress from './CircularProgress';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';


class Halls extends React.Component {

    render() {
        return (
                this.props.halls
                ?
                <div className='all-halls-contrainer'>
                    {this.props.halls.map((i, index) => {
                        return (
                            <div key={index} >
                                 <Card className={`card ${i.colour}-hall`}>    
                                    <div  className={`hall-title-contrainer ${i.colour}-hall`}>  
                                        <h3>
                                            {i.title}
                                        </h3>
                                    </div>
                                    <CardMedia className='media' image={i.imageURL} />
                                    <CardContent className={`${i.colour}-hall`}>  
                                        {i.description}
                                    </CardContent>
                                </Card>
                            </div>
                        )
                    })}
                </div>
                :
                <div className="ciruclar-progress-container">
                    <CircularProgress />
                </div>        
        );
    }
}


const mapStateToProps = (state) => {
    return { halls: state.halls, colours: state.colours };
};
export default connect(mapStateToProps, {})(Halls);