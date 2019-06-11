import '../css/Halls.css'
import React from 'react';
import CircularProgress from './CircularProgress';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import  Carousel  from  'semantic-ui-carousel-react';


class Halls extends React.Component {


    prepareSlides(){
        let elements = []
            this.props.halls.forEach((i, index) => {
                let slide = {
                    render: () => {
                        return(                        
                        <div key={index+'key'}>
                            <Card className={`card ${i.colour}-hall`}>
                                <div className={`hall-title-contrainer ${i.colour}-hall`}>
                                    <h3>
                                        {i.title}
                                    </h3>
                                </div>
                                <CardMedia className='media' image={i.imageURL} />
                                <CardContent className={`${i.colour}-hall`}>
                                    <b>{i.description}</b>
                                </CardContent>
                            </Card>
                        </div>);
                    }
                }
                elements.push(slide)
            })
        return elements
    }




    render() {


        return (
                this.props.halls
                ?
                
                    (window.screen.width > 480) 
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
                                            <b>{i.description}</b>
                                        </CardContent>
                                    </Card>
                                </div>
                            )
                        })}
                    </div>
                    :
                    <Carousel
                    elements  =  {  this.prepareSlides()  }
                    duration  ={3000}
                    animation  ='slide left'
                    showNextPrev  =  {true}
                    showIndicators  ={false}
                />



                
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




