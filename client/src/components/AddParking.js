import React, { useState, Fragment, useEffect } from 'react'
import ReactMap, { Marker, Popup, FlyToInterpolator } from 'react-map-gl'
import Navigate from './Navigate'
import Geocodio from 'geocodio-library-node'
import { GEOCODIO_KEY } from '../globals'

import '../App.css'

const AddParking = (props) => {
  const geocoder = new Geocodio(`${GEOCODIO_KEY}`)

  useEffect(() => {
    props.getMyParkings()
    // props.checkSession()
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

  const getCurrentLocation = () => {
    geocoder
      .geocode(props.address)
      .then((response) => {
        console.log(response.results[0].location)
        props.setLat(response.results[0].location.lat)
        props.setLng(response.results[0].location.lng)
        props.setSubmitAddress(response.results[0].formatted_address)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: 34,
    longitude: -118,
    zoom: 8
  })
  const [selectedParking, setSelectedParking] = useState(null)
  const changeViewport = () => {
    setViewport({
      ...viewport,
      width: '100%',
      height: '100%',
      latitude: props.lat,
      longitude: props.lng,
      zoom: 10,
      transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator()
    })
  }
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
    <ReactMap
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/queeniew329/cknayeur00b3d17mrmpewxjni"
      onViewportChange={(viewport) => setViewport(viewport)}
      maxZoom={100}
      minZoom={1.6}
    >
      <Navigate authenticated={props.authenticated} logOut={props.logOut} />
      <div className="submit">
        <form
        // onSubmit={
        //   () => {
        // e.preventDefault()
        // getCurrentLocation()
        // props.submitParking()
        // }
        // changeViewport()
        // }
        >
          <button onClick={getLocation}>Get Location</button>
          <p>{props.status}</p>
          {props.lat && <p>Latitude: {props.lat}</p>}
          {props.lng && <p>Longitude: {props.lng}</p>}
        </form>
        <form
          onSubmit={() => {
            getCurrentLocation()
            props.submitParking()
          }}
        >
          <input
            name="address"
            value={props.address}
            onChange={props.handleAddressChange}
          />
          <input type="Submit" />
        </form>
      </div>
      {props.myParkings
        ? props.myParkings.map((each, index) => (
            <Fragment key={index}>
              <Marker longitude={each.longitude} latitude={each.latitude}>
                <img
                  alt="parking-icon"
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
                  <form onSubmit={props.submitImage}>
                    <input
                      name="image"
                      value={props.image.img}
                      onChange={props.handleImageChange}
                      placeholder="upload image"
                    />
                    <button type="submit">Upload</button>
                  </form>
                  <button
                    onClick={() => {
                      props.deleteParking(selectedParking.id)
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
