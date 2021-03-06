import React, { useState, useEffect } from 'react'
import ReactMap, { Marker, Popup, FlyToInterpolator } from 'react-map-gl'
import Navigate from './Navigate'
import '../css/mapbox.css'
import { useHistory } from 'react-router-dom'
import mapboxgl from 'mapbox-gl'
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default

const Map = (props) => {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: 34.1,
    longitude: -118.3,
    zoom: 10
  })
  const changeViewport = (lat, lng) => {
    setViewport({
      ...viewport,
      width: '100%',
      height: '100%',
      latitude: lat,
      longitude: lng,
      zoom: 10,
      transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator()
    })
  }

  const handleViewport = async (e) => {
    e.preventDefault()
    const response = await props.convertToCoordinates()
    changeViewport(
      response.data.results[0].location.lat,
      response.data.results[0].location.lng
    )
  }
  const history = useHistory()

  useEffect(() => {
    const listener = (e) => {
      if (e.key === 'Escape') {
        props.setSelectedParking(null)
      }
    }
    window.addEventListener('keydown', listener)
    return () => {
      window.removeEventListener('keydown', listener)
    }
  }, [])

  const getLocation = () => {
    if (!navigator.geolocation) {
      props.setStatus('Geolocation is not supported by your browser')
    } else {
      props.setStatus('Locating...')
      navigator.geolocation.getCurrentPosition(
        (position) => {
          props.setStatus(null)
          props.setCurrentLat(position.coords.latitude)
          props.setCurrentLng(position.coords.longitude)
        },
        () => {
          props.setStatus('Unable to retrieve your location')
        }
      )
    }
  }

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
        checkSession={props.checkSession}
      />
      <div className="submit">
        <img
          className="current-location"
          alt="icon"
          src="https://i.ibb.co/Hpv5dmk/Nice-Png-knowledge-icon-png-3332260.png"
          width="40px"
          onClick={getLocation}
        />
        <div className="searchBar">
          <input
            name="address"
            value={props.currentAddress}
            onChange={props.handleCurrentAddressChange}
          />
          <button className="goBtn" onClick={(e) => handleViewport(e)}>
            GO
          </button>
        </div>
      </div>
      {props.allParkings
        ? props.allParkings.map((parking, index) => (
            <div key={index}>
              <Marker longitude={parking.longitude} latitude={parking.latitude}>
                <img
                  alt="parking-icon"
                  src="https://i.ibb.co/z5H0Qx3/free-parking.png"
                  width="50px"
                  onClick={() => props.handleDistance(parking)}
                />
              </Marker>
              {props.selectedParking ? (
                <Popup
                  longitude={props.selectedParking.longitude}
                  latitude={props.selectedParking.latitude}
                  closeOnClick={false}
                  onClose={() => {
                    props.setSelectedParking(null)
                  }}
                >
                  {props.selectedParking.image ? (
                    <img
                      alt="icon"
                      className="parking-image"
                      src={props.selectedParking.image}
                      width="200px"
                      height="100px"
                    />
                  ) : null}
                  <p className="parkingId">
                    Parking {props.selectedParking.id}
                  </p>
                  <div className="location">
                    <img
                      id="location-icon"
                      alt="location"
                      src="https://i.ibb.co/mNGXhnb/pngjoy-com-location-pin-icon-location-icon-3d-png-hd-2645202.png"
                      width="20px"
                      height="25px"
                    />
                    <p>{props.selectedParking.address}</p>
                  </div>
                  <div className="location">
                    <img
                      alt="icon"
                      src="https://i.ibb.co/84x6628/Pngtree-vector-distance-icon-3767406.png"
                      height="30px"
                    />
                    <p>{props.distance}Km</p>
                  </div>
                  <div id="reviews">
                    <img
                      alt="icon"
                      src="https://i.ibb.co/dB3D5fG/pngaaa-com-563369.png"
                      width="30px"
                      height="30px"
                    />
                    <p
                      onClick={() =>
                        history.push(`/reviews/${props.selectedParking.id}`)
                      }
                    >
                      Reviews
                    </p>
                  </div>
                </Popup>
              ) : null}
            </div>
          ))
        : null}
      {props.currentLat && props.currentLng ? (
        <Marker
          className="marker-current"
          longitude={props.currentLng}
          latitude={props.currentLat}
        ></Marker>
      ) : null}
    </ReactMap>
  )
}

export default Map
