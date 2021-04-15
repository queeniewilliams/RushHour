import React, { useEffect, useState } from 'react'
import Geocodio from 'geocodio-library-node'
import { GEOCODIO_KEY } from '../globals'

const AddParking = (props) => {
  const geocoder = new Geocodio(`${GEOCODIO_KEY}`)

  useEffect(() => {
    props.getMyParkings()
  }, [])
  const getLocation = () => {
    if (!navigator.geolocation) {
      props.setStatus('Geolocation is not supported by your browser')
    } else {
      props.setStatus('Locating...')
      navigator.geolocation.getCurrentPosition(
        (position) => {
          props.setStatus(null)
          props.setLat(position.coords.latitude)
          props.setLng(position.coords.longitude)
          // props.setCoordinates([
          //   position.coords.longitude,
          //   position.coords.latitude
          // ])
        },
        () => {
          props.setStatus('Unable to retrieve your location')
        }
      )
    }
  }

  // geocoder
  //   .geocode(props.address)
  //   .then((response) => {
  //     console.log(response.results[0].location)
  //     props.setLat(response.results[0].location.lat)
  //     props.setLng(response.results[0].location.lng)
  //   })
  //   .catch((err) => {
  //     console.error(err)
  //   })
  // console.log(props)
  return (
    <div>
      <form onSubmit={props.submitParking}>
        <input type="time" name="time" value="time" />
        <br></br>
        <button onClick={getLocation}>Get Location</button>
        <p>{props.status}</p>
        {props.lat && <p>Latitude: {props.lat}</p>}
        {props.lng && <p>Longitude: {props.lng}</p>}
      </form>
      {/* <form>
        <input
          name="address"
          value={props.address}
          onChange={props.handleAddressChange}
        />
      </form> */}
      {props.myParkings.map((each) => (
        <div>
          <p>{each.longitude}</p>
          <p>{each.latitude}</p>
          <button onClick={() => props.deleteParking(each.id)}>delete</button>
        </div>
      ))}
    </div>
  )
}

export default AddParking
