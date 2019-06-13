import React from 'react';
import CircularProgress from './CircularProgress';
import { connect } from 'react-redux';
import { getUniqueId } from '../functions'
import { 
  HallsMain, 
  HallCard, 
  HallCardContent,
  HallTitleContainer,
  HallCardMedia,
  CircularProgressContainer,
  HallCarousel,
} from '../styles';
import '../styles/styles.css';

class Halls extends React.Component {
    prepareSlides(){
        let elements = []
            this.props.halls.forEach((i, index) => {
                let slide = {
                    render: () => {
                        return(                        
                        <div key={getUniqueId()}>
                                <HallCard colour={i.colour} key={getUniqueId()} >    
                                    <HallTitleContainer colour={i.colour} key={getUniqueId()} >  
                                        {i.title}
                                    </HallTitleContainer>
                                    <HallCardMedia image={i.imageURL} key={getUniqueId()} />
                                    <HallCardContent colour={i.colour} key={getUniqueId()} >  
                                        {i.description}
                                    </HallCardContent>
                                </HallCard>
                        </div>);
                    }
                }
                elements.push(slide)
            })
            console.log(elements)
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
                                <div key={getUniqueId()} >
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
                    elements = {  this.prepareSlides()  }
                    duration = {3000}
                    animation = 'slide left'
                    showNextPrev = {true}
                    showIndicators = {false}
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




