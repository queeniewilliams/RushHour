import React, { useState, Fragment, useEffect } from 'react'
import ReactMap, { Marker, Popup } from 'react-map-gl'
import Geocodio from 'geocodio-library-node'
import { GEOCODIO_KEY } from '../globals'

const AddParking = (props) => {
  const geocoder = new Geocodio(`${GEOCODIO_KEY}`)
  const [update, setUpdate] = useState({
    lng: props.lng,
    lat: props.lat
  })
  const handleUpdate = (target) => {
    setUpdate({ ...update, [target.name]: target.value })
  }
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
        },
        () => {
          props.setStatus('Unable to retrieve your location')
        }
      )
    }
  }

  geocoder
    .geocode(props.address)
    .then((response) => {
      console.log(response.results[0].location)
      props.setLat(response.results[0].location.lat)
      props.setLng(response.results[0].location.lng)
    })
    .catch((err) => {
      console.error(err)
    })
  console.log(props)
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: 34,
    longitude: -118,
    zoom: 8
  })
  const [selectedParking, setSelectedParking] = useState(null)
  useEffect(() => {
    const listener = (e) => {
      if (e.key === 'Escape') {
        setSelectedParking(null)
      }
    }
    window.addEventListener('keydown', listener)
    return () => {
      window.removeEventListener('keydown', listener)
    }
  })
  return (
    // <div>
    <ReactMap
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/queeniew329/cknayeur00b3d17mrmpewxjni"
      onViewportChange={(viewport) => setViewport(viewport)}
      maxZoom={100}
      minZoom={1.6}
    >
      <form onSubmit={props.submitParking}>
        <button onClick={getLocation}>Get Location</button>
        <p>{props.status}</p>
        {props.lat && <p>Latitude: {props.lat}</p>}
        {props.lng && <p>Longitude: {props.lng}</p>}
      </form>
      <form onSubmit={props.submitParking}>
        <input
          name="address"
          value={props.address}
          onChange={props.handleAddressChange}
        />
        <input type="submit" />
      </form>
      {props.myParkings
        ? props.myParkings.map((each, index) => (
            <Fragment key={index}>
              <Marker longitude={each.longitude} latitude={each.latitude}>
                <img
                  src="https://i.ibb.co/HGny0DC/parking-sign-2526.png"
                  width="50px"
                  onClick={(e) => {
                    e.preventDefault()
                    setSelectedParking(each)
                    props.setLng(each.longitude)
                    props.setLat(each.latitude)
                  }}
                />
              </Marker>
              {selectedParking ? (
                <Popup
                  longitude={selectedParking.longitude}
                  latitude={selectedParking.latitude}
                  closeOnClick={false}
                  onClose={() => {
                    setSelectedParking(null)
                  }}
                >
                  <p>Time:</p>
                  <p>Distance:</p>
                  <button>open in google map</button>
                  <form>
                    <input name="coordinate" />
                    <input type="submit">Edit</input>
                  </form>
                  <button
                    onClick={() => {
                      props.deleteParking(each.id)
                      setSelectedParking(null)
                    }}
                  >
                    delete
                  </button>
                </Popup>
              ) : null}
            </Fragment>
          ))
        : null}
      <button onClick={props.calcDistance}>Get Distance</button>
    </ReactMap>
    //  <form onSubmit={props.submitParking}>
    //   <input type="time" name="time" value="time" />
    //   <br></br>
    //   <button onClick={getLocation}>Get Location</button>
    //   <p>{props.status}</p>
    //   {props.lat && <p>Latitude: {props.lat}</p>}
    //   {props.lng && <p>Longitude: {props.lng}</p>}
    // </form>
    // <form onSubmit={props.submitParking}>
    //   <input
    //     name="address"
    //     value={props.address}
    //     onChange={props.handleAddressChange}
    //   />
    //   <input type="submit" />
    // </form>
    // {props.myParkings.map((each) => (
    //   <div>
    //     <p>{each.longitude}</p>
    //     <p>{each.latitude}</p>
    //     <button onClick={() => props.deleteParking(each.id)}>delete</button>
    //   </div>
    // ))}
    // </div>
  )
}

export default AddParking
