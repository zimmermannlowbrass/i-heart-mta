const initialRoute = ''

const searchRouteReducer = (route = initialRoute, action) => {
  switch (action.type) {
    case 'searchRoute/setSearchRoute':
      return action.payload;
    case 'searchRouteTerm/clearSearchRoute':
      return '';
    default:
      return route;
  }
}

export function setSearchRoute(route) {
  return {
    type: 'searchRoute/setSearchRoute',
    payload: route
  }
}

export function clearSearchRoute() {
  return {
    type: 'searchRouteTerm/clearSearchRoute',
    payload: null
  }
}

export const selectSearchRoute = (state) => state.searchRoute;

export default searchRouteReducer