export function test(){
    console.log('test')
    return 'hey'
}


export function composeSlotId(chosenDate, hour, colour) {         // elaborate the function so that i can use it from 'while', i need a possibility to add the 'date' i need
    const fullDate = (chosenDate) ? new Date(chosenDate) : new Date()
    const date = fullDate.getDate()
    const keyDate = date.toString().length === 2 ? date : "0" + date;
    const keyMonth = (fullDate.getMonth() + 1).toString().length === 2 ? (fullDate.getMonth() + 1) : "0" + (fullDate.getMonth() + 1);
    const keyYear = fullDate.getYear().toString().slice(1);
    const idHour = String(hour).length === 1 ? "0" + hour : hour;
    return (`date:${keyDate}${keyMonth}${keyYear}hour:${idHour}colour:${colour}`);
}


export function calculateReservedSlots(tickets, halls, date) {
    let reservedSlots = []

    for (let i = 0; i < tickets.length; i++) {
        let fromTime = new Date(tickets[i].from)
        let toTime = new Date(tickets[i].to)
        const title = tickets[i].title

        if (toTime < new Date().setHours(0)) { continue }

        else if (fromTime !== toTime && fromTime < toTime) {
            fromTime = new Date(new Date(new Date(fromTime.setMilliseconds(0)).setSeconds(0)).setMinutes(0))
            toTime = new Date(new Date(new Date(toTime.setMilliseconds(0)).setSeconds(0)).setMinutes(0))

            // console.log('tickets time FROM: ', fromTime)
            // console.log('tickets time TO: ', toTime)

            let theDay = (date) ? new Date(date) : new Date()
            let dayChosenStart = (new Date(new Date(new Date(new Date(theDay).setHours(0)).setMinutes(0)).setSeconds(0)).setMilliseconds(0)) - 5
            let dayChosenEnd = (new Date(new Date(new Date(new Date(theDay).setHours(23)).setMinutes(59)).setSeconds(59)).setMilliseconds(999)) + 5

            if ((fromTime <= dayChosenStart && toTime >= dayChosenStart) ||         // sort out the tickets that are related to the chosen date
                (fromTime >= dayChosenStart && toTime <= dayChosenEnd) ||
                (fromTime <= dayChosenEnd && toTime >= dayChosenEnd)) {
  

                let hall = halls.find((element) => {                   // get the colour by hall_id
                    return element._id === tickets[i].hall_id
                })

                if (fromTime <= toTime) {
                    do{
                        const slotID = `${composeSlotId(fromTime, fromTime.getHours(), hall.colour)}title:${title}`
                        reservedSlots.push(slotID);
                        fromTime.setHours(fromTime.getHours() + 1)
                    }while(fromTime <= toTime)
                }
            }
        }
    }
    return reservedSlots
}


export function checkSlot(reservedSlots, id) {   
    return reservedSlots.find(function(element){
        return element.slice(0, 28) === id 
    })
}