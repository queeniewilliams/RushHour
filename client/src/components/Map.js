import React, { useState, Fragment, useEffect } from 'react'
import ReactMap, { Marker, Popup } from 'react-map-gl'
import '../css/mapbox.css'
import { useHistory } from 'react-router-dom'

const Map = (props) => {
  useEffect(() => {
    props.getLocation()
  }, [])
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: props.currentLat ? props.currentLat : 34,
    longitude: props.currentLng ? props.currentLng : -118,
    zoom: 8
  })
  const [selectedParking, setSelectedParking] = useState(null)
  const history = useHistory()

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
      <input
        name="address"
        value={props.currentAddress}
        onChange={props.handleCurrentAddressChange}
      />
      {props.allParkings
        ? props.allParkings.map((parking, index) => (
            <Fragment key={index}>
              <Marker longitude={parking.longitude} latitude={parking.latitude}>
                <img
                  src="https://i.ibb.co/HGny0DC/parking-sign-2526.png"
                  width="50px"
                  onClick={(e) => {
                    e.preventDefault()
                    setSelectedParking(parking)
                    props.setLng(parking.longitude)
                    props.setLat(parking.latitude)
                  }}
                />
              </Marker>
              <Marker
                className="marker-current"
                longitude={props.currentLng}
                latitude={props.currentLat}
              ></Marker>
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
                  <button
                    onClick={() => history.push(`/reviews/${parking.id}`)}
                  >
                    reviews
                  </button>
                </Popup>
              ) : null}
            </Fragment>
          ))
        : null}
      <button onClick={props.calcDistance}>Get Distance</button>
    </ReactMap>
  )
}

export default Map
