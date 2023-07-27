export const filterSubwayStops = (route) => {
    return {
        type: 'subwayStops/filterSubwayStops',
        payload: route
    }
}


const initialSubwayStops = []
export const subwayStopReducer = (subwayStops = initialSubwayStops, action) => {
    switch(action.type) {
        case 'subwayStops/filterSubwayStops':
            return subwayStops
        default:
            return subwayStops
    }        
}
