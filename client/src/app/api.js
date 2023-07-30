export const fetchTrips = async () => {
    const trips = await fetch('trips')
    return trips.json()
  }

export const fetchSubwayStops = async () => {
    const subwaystops = await fetch('subwaystops')
    return subwaystops.json()
}


