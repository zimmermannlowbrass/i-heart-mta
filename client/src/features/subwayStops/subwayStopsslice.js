import { subwaystops } from "../exampleData.js"
import { selectSearchRoute } from '../searchRoute/searchRouteSlice.js'

// reducer and initial state
const initialSubwayStops = []
export const subwayStopReducer = (subwayStops = initialSubwayStops, action) => {
    switch (action.type) {
        case 'subwayStops/loadStops':
            return action.payload
        default:
            return subwayStops
    }        
}

// action types

// this is now a selector
// export const filterSubwayStops = (route) => {
//     return {
//         type: 'subwayStops/filterSubwayStops',
//         payload: route
//     }
// }

export const loadData = () => {
    return {
      type: 'subwayStops/loadStops',
      payload: subwaystops
    }
  }
  

// selectors
export const selectAllSubwayStops = state => state.subwayStops

export const selectFilteredSubwayStops = state => {
    const allSubwayStops = selectAllSubwayStops(state)
    const searchRoute = selectSearchRoute(state)
    return allSubwayStops.filter(subwaystop => subwaystop.route === searchRoute)
  }
