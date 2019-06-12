import React from 'react';
import CircularProgress from './CircularProgress';
import { connect } from 'react-redux';
import { 
  HallsMain, 
  HallCard, 
  HallCardContent,
  HallTitleContainer,
  HallCardMedia,
  CircularProgressContainer,
  HallCarousel,
} from '../styles';

class Halls extends React.Component {
    prepareSlides(){
        let elements = []
            this.props.halls.forEach((i, index) => {
                let slide = {
                    render: () => {
                        return(                        
                        <div key={index+'key'}>
                                <HallCard colour={i.colour}>    
                                    <HallTitleContainer colour={i.colour}>  
                                        {i.title}
                                    </HallTitleContainer>
                                    <HallCardMedia image={i.imageURL} />
                                    <HallCardContent colour={i.colour}>  
                                        {i.description}
                                    </HallCardContent>
                                </HallCard>
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
                    window.screen.width > 480 
                        ?
                        <HallsMain>
                        {this.props.halls.map((i, index) => {
                            return (
                                <div key={index} >
                                     <HallCard colour={i.colour}>    
                                        <HallTitleContainer colour={i.colour}>  
                                          {i.title}
                                        </HallTitleContainer>
                                        <HallCardMedia image={i.imageURL} />
                                        <HallCardContent colour={i.colour}>  
                                            {i.description}
                                        </HallCardContent>
                                    </HallCard>
                                </div>
                            )
                        })}
                    </HallsMain>
                    :
                    <HallCarousel
                    elements  =  {  this.prepareSlides()  }
                    duration  ={3000}
                    animation  ='slide left'
                    showNextPrev  =  {true}
                    showIndicators  ={false}
                />
                :
                <CircularProgressContainer>
                    <CircularProgress />
                </CircularProgressContainer>        
        );
    }
}


const mapStateToProps = (state) => {
    return { halls: state.halls, colours: state.colours };
};
export default connect(mapStateToProps, {})(Halls);




