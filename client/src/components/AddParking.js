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
      props.setSubmitAddress(response.results[0].formatted_address)
    })
    .catch((err) => {
      console.error(err)
    })

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
      <Navigate
        authenticated={props.authenticated}
        logOut={props.logOut}
        myProfile={props.myProfile}
        currentUser={props.currentUser}
      />
      <div className="submit">
        <form onSubmit={() => props.submitParking()}>
          <img
            className="current-location"
            alt="icon"
            src="https://i.ibb.co/Hpv5dmk/Nice-Png-knowledge-icon-png-3332260.png"
            width="40px"
            onClick={getLocation}
          />
        </form>
        <form className="searchBar" onSubmit={props.submitParking}>
          <input
            name="address"
            value={props.address}
            onChange={props.handleAddressChange}
          />
          <button className="goBtn" type="Submit">
            Add
          </button>
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
                  <p>Parking {selectedParking.id}</p>
                  <form
                    id={selectedParking.id}
                    onSubmit={(e) => props.submitImage(e)}
                  >
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
  )
}

export default AddParking
