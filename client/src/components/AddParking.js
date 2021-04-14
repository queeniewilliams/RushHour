import React, { useEffect, useState } from 'react'

const AddParking = (props) => {
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
  console.log(props)
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
