import React from 'react';
import { connect } from 'react-redux';
import UpperBar from './components/UpperBar';
import Title from './components/Title'
import { 
    Doughnut, 
    Bar 
} from 'react-chartjs-2';
import { 
    fetchTickets, 
    fetchHalls, 
    determineReservedSlots 
} from './actions';
import { 
    calculateReservedSlots, 
    convertToUKdate, 
    convertTimeIntoMonth, 
    calculateTimeUsedPerMonth 
} from './functions'
import { 
    ChartPeriodSelect, 
    ChartSelectContainer, 
    ChartTitle, 
    DoughnutChartContainer, 
    BarChartContainer 
} from './styles'; 


class Charts extends React.Component {
    state= { period: 'day'}
    
    componentWillMount(){
        if (this.props.halls === null) {this.props.fetchHalls()}
        if (this.props.tickets === null) {this.props.fetchTickets()}
        if (this.props.slots === null) {
            this.props.determineReservedSlots(calculateReservedSlots(this.props.tickets, this.props.halls, this.props.date))
        }
        this.calculatePercentage(this.props.halls, this.props.slots);
    }

    calculatePercentage = (halls, slots) => {
        let percentage = []
        halls.forEach(element => {
            let arr = slots.filter(i => i.slice(25, 28) === element.colour)
            percentage.push(arr.length) 
        });
        this.setState({ datasets : percentage  })
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.date !== this.props.date ) {
            this.calculatePercentage(this.props.halls, nextProps.slots)   
        }
        if (nextProps.slots !== this.props.slots ) {
            this.calculatePercentage(this.props.halls, nextProps.slots)   
        }
    }

    handleSelectChange = selectedOption => {
        this.setState({ period: selectedOption.value });
    }

    render() {
        const { selectedOption } = this.state.period;
        const options = [
            { value: 'day', label: 'day' },
            { value: 'month', label: 'month' },
          ];

        const DoghnutChartData = {
            labels: this.props.halls.map (i => i.title),
            datasets: [{
                data: this.state.datasets.map(i => i),
                backgroundColor: [
                'rgba(108, 92, 231, 0.9)',
                'rgba(19, 55, 11, 0.8)',
                'rgba(178, 34, 34, 0.9)',
                'rgba(18, 11, 120, 0.9)',
                ],
                hoverBackgroundColor: [
                'rgba(108, 92, 231, 1)',
                'rgba(19, 55, 11, 0.9)',
                'rgba(178, 34, 34, 1)',
                'rgba(18, 11, 120, 1)',
                ]
            }]
        };

        const BarChartData = {
            labels: this.props.halls.map (i => i.title),
          datasets: [
            {
              label: 'reserved hours per month',
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255,99,132,0.4)',
              hoverBorderColor: 'rgba(255,99,132,1)',
              data: calculateTimeUsedPerMonth(this.props.date, this.props.tickets, this.props.halls)
            }
          ]
        }

        return(
            <div>
                <UpperBar />
                <Title />                
                <ChartSelectContainer>
                    Choose the period
                    <ChartPeriodSelect value={selectedOption} options={options} menuPlacement='top' onChange={this.handleSelectChange} />
                </ChartSelectContainer>
                <DoughnutChartContainer period={this.state.period}>
                    <ChartTitle>
                        Halls Use on <b>{(convertToUKdate(this.props.date).slice(0, -7))}</b> 
                    </ChartTitle>
                    <Doughnut data={DoghnutChartData} width={100} height={200} options={{ maintainAspectRatio: false }} />
                </DoughnutChartContainer>
                <BarChartContainer period={this.state.period}>
                    <ChartTitle>
                        Total sum of reserved hours in <b>{(convertTimeIntoMonth(this.props.date))}</b> 
                    </ChartTitle>
                    <Bar data={BarChartData} width={100} height={50} options={{maintainAspectRatio: false}} />
                </BarChartContainer>
            </div>
        );    
    }
} 

const mapStateToProps = (state) => {
    return {
        tickets: state.tickets,
        halls: state.halls,
        date: state.dateInput,
        slots: state.reservedSlots,
    }
}

export default connect(mapStateToProps, {fetchTickets, fetchHalls, determineReservedSlots, })(Charts)