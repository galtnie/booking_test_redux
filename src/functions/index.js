export function composeSlotId(chosenDate, hour, colour) {         
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

            let theDay = (date) ? new Date(date) : new Date()
            let dayChosenStart = (new Date(new Date(new Date(new Date(theDay).setHours(0)).setMinutes(0)).setSeconds(0)).setMilliseconds(0)) - 5
            let dayChosenEnd = (new Date(new Date(new Date(new Date(theDay).setHours(23)).setMinutes(59)).setSeconds(59)).setMilliseconds(999)) + 5

            if ((fromTime <= dayChosenStart && toTime >= dayChosenStart) ||         
                (fromTime >= dayChosenStart && toTime <= dayChosenEnd) ||
                (fromTime <= dayChosenEnd && toTime >= dayChosenEnd)) {

                    let hall = halls.find((element) => {                  
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


export function checkIfSlotReserved(reservedSlots, id) { 
    return reservedSlots.find(function(element){
        return element.slice(0, 28) === id 
    })
}


export function checkIfSlotSelected(selectedSlots, id) {   
    return selectedSlots.find(function(element){
        return element.slice(0, 28) === id 
    })
}


export function prepareSelectedSlotsRendering(slots_id, halls, user) {

    let orderListToUniteAdjacent = []
        for (let i = 0; i < slots_id.length; i++) {
            let order = {
                hall_id: halls.find((element) => element.colour === slots_id[i].slice(-3))._id,               
                from: Date.parse(`20${slots_id[i].slice(9, 11)}-${slots_id[i].slice(7, 9)}-${slots_id[i].slice(5, 7)}T${slots_id[i].slice(16, 18)}:00:00`),
                to: Date.parse(`20${slots_id[i].slice(9, 11)}-${slots_id[i].slice(7, 9)}-${slots_id[i].slice(5, 7)}T${slots_id[i].slice(16, 18)}:59:00`),
            }
            orderListToUniteAdjacent.push(order)
        }
  
    let ticketsHallsArray = []
        for (let i = 0; i < orderListToUniteAdjacent.length; i++) {
            let ifNewHallArrayIsNeeded = true

            if (ticketsHallsArray.length === 0) {
                let sameHallTicketsArray = []                                           
                sameHallTicketsArray.push(orderListToUniteAdjacent[i])           
                ticketsHallsArray.push(sameHallTicketsArray)
                ifNewHallArrayIsNeeded = false
            } else {
                for (let j = 0; j < ticketsHallsArray.length; j++) {
                    if (ticketsHallsArray[j][0].hall_id === orderListToUniteAdjacent[i].hall_id) {       
                        ticketsHallsArray[j].push(orderListToUniteAdjacent[i])                        
                        ifNewHallArrayIsNeeded = false
                    }
                }
            }
            if (ifNewHallArrayIsNeeded) {
                let sameHallTicketsArray = []                                         
                sameHallTicketsArray.push(orderListToUniteAdjacent[i])          
                ticketsHallsArray.push(sameHallTicketsArray)
            }
        }

        let finalArray 

        (function uniteAdjacentTickets(ticketsHallsArray){
            let doItAgain = false

            ticketsHallsArray.forEach((sameHallTicketsArray) => {
                for (let i = 0; i < sameHallTicketsArray.length; i++) {
                    for (let j = 0; j < sameHallTicketsArray.length; j++) {

                        if ((sameHallTicketsArray[j].from - sameHallTicketsArray[i].to) < 300000 &&
                            (sameHallTicketsArray[j].from - sameHallTicketsArray[i].to) > 0) {

                            let newTicket = {
                                from: sameHallTicketsArray[i].from,
                                to: sameHallTicketsArray[j].to,
                                hall_id: sameHallTicketsArray[i].hall_id,
                            }

                            if (i > j) {
                                sameHallTicketsArray.splice(i, 1)
                                sameHallTicketsArray.splice(j, 1, newTicket)
                            }
                            else {
                                sameHallTicketsArray.splice(j, 1)
                                sameHallTicketsArray.splice(i, 1, newTicket)
                            }
                            doItAgain = true
                            break;
                        }
                        else if ((sameHallTicketsArray[i].from - sameHallTicketsArray[j].to) < 300000 &&
                            (sameHallTicketsArray[i].from - sameHallTicketsArray[j].to) > 0) {

                            let newTicket = {
                                from: sameHallTicketsArray[j].from,
                                to: sameHallTicketsArray[i].to,
                                hall_id: sameHallTicketsArray[i].hall_id,
                            }

                            if (i > j) {
                                sameHallTicketsArray.splice(i, 1)
                                sameHallTicketsArray.splice(j, 1, newTicket)
                            }
                            else {
                                sameHallTicketsArray.splice(j, 1)
                                sameHallTicketsArray.splice(i, 1, newTicket)
                            }
                            doItAgain = true
                            break;
                        }
                    }
                }
            })

            if (doItAgain) {
                uniteAdjacentTickets(ticketsHallsArray)
            } else {
                let arrayWithUnitedAdjacentTickets = []
                ticketsHallsArray.forEach(i => i.forEach(ii => {
                    ii.title = "untitled" 
                    ii.user_id = user._id                                                   
                    arrayWithUnitedAdjacentTickets.push(ii)
                }))
                finalArray = arrayWithUnitedAdjacentTickets
            }
        })(ticketsHallsArray)
        
        return finalArray
}

export function convertMlsToyyyymmddThhmm (mls) {
    return new Date(
        new Date(mls)
          .toString()
          .split("GMT")[0] + " UTC"
      )
        .toISOString()
        .split(":00.")[0]
}

export function convertYyyymmddThhmmToMls (time) {
    return Date.parse(new Date(time))
}

export function convertToUKdate (time) {
    const timeOptionsForRendering = {
        day: 'numeric',
        weekday: 'long',
        year: 'numeric',
        month: 'long', 
        hour: 'numeric', 
        minute: 'numeric',
    }
    return new Intl.DateTimeFormat('en-GB', timeOptionsForRendering).format(time)    
}

export function convertTimeIntoMonth(time){
    let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return monthNames[new Date(time).getMonth()]
}

export function convertMlsToYYYYmmDD(time, format) {
 
        let t = new Date(time);
        let tf = function (i) { return (i < 10 ? '0' : '') + i };
        return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
            switch (a) {
                case 'yyyy':
                    return tf(t.getFullYear());
                case 'MM':
                    return tf(t.getMonth() + 1);
                case 'mm':
                    return tf(t.getMinutes());
                case 'dd':
                    return tf(t.getDate());
                case 'HH':
                    return tf(t.getHours());
                case 'ss':
                    return tf(t.getSeconds());
                default:
                    return null;
            }
        })
}

export function convertYYYYmmDDToMls(date) { 
    return new Date(new Date(new Date().setFullYear(date.slice(0, 4))).setMonth(Number(date.slice(5, 7))-1)).setDate(date.slice(8))
}

export function calculateTimeUsedPerMonth(time, tickets, halls){    
    let month = new Date(time).getMonth()
    let start = new Date(new Date(new Date(new Date(new Date(time).setDate(1)).setHours(0)).setMinutes(0)).setSeconds(0)).setMilliseconds(0)
    let end = new Date(start).setMonth(month + 1)
    let sortedTicketsPerHalls = []

    for (let i = 0; i < halls.length; i++){
        sortedTicketsPerHalls.push({
            hall_id: halls[i]._id,
            tickets: []
        })
    }
    for (let i = 0; i < tickets.length; i++){
        for (let j = 0; j < sortedTicketsPerHalls.length; j++) {
            if (tickets[i].hall_id === sortedTicketsPerHalls[j].hall_id) {
                sortedTicketsPerHalls[j].tickets.push(tickets[i])
            } 
        }
    }
    let newArr = []
    for (let j = 0; j < sortedTicketsPerHalls.length; j++) {           
        newArr[j] = sortedTicketsPerHalls[j].tickets.filter(i => i.to > start)
    }
    for (let j = 0; j < newArr.length; j++) {           
        sortedTicketsPerHalls[j].tickets = newArr[j]
    }
    for (let j = 0; j < sortedTicketsPerHalls.length; j++) {           
        newArr[j] = sortedTicketsPerHalls[j].tickets.filter(i => i.from < end)
    }
    for (let j = 0; j < newArr.length; j++) {           
        sortedTicketsPerHalls[j].tickets = newArr[j]
    }
    for (let j = 0; j < sortedTicketsPerHalls.length; j++) {
      for(let i = 0; i < sortedTicketsPerHalls[j].tickets.length; i++) {
        if (sortedTicketsPerHalls[j].tickets[i].from < start) {
          sortedTicketsPerHalls[j].tickets[i].from = start
        }
        if (sortedTicketsPerHalls[j].tickets[i].to > end) {
            sortedTicketsPerHalls[j].tickets[i].to = end
        }
    }}
    newArr = []
    for (let j = 0; j < sortedTicketsPerHalls.length; j++) {
        sortedTicketsPerHalls[j].totalHours = 0
        for(let i = 0; i < sortedTicketsPerHalls[j].tickets.length; i++) {
            sortedTicketsPerHalls[j].totalHours += (sortedTicketsPerHalls[j].tickets[i].to - sortedTicketsPerHalls[j].tickets[i].from)
        }
        sortedTicketsPerHalls[j].totalHours /= 3600000
        newArr.push(Math.round(sortedTicketsPerHalls[j].totalHours))
    }
     return newArr
} 

export function getUniqueId(){
 return '_' + Math.random().toString(36).substr(2, 9);
}