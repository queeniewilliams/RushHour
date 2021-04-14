import React, { useState, Fragment } from 'react'
import ReactMap, { Marker, Popup } from 'react-map-gl'
import { parkings } from '../assets/parkings.json'
import Carousel from 'react-bootstrap/Carousel'
import '../css/mapbox.css'
import Navigate from './Navigate'

const Map = (props) => {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: 34,
    longitude: -118,
    zoom: 8
  })
  let CURRENT = 'los Angeles'
  const [selectedParking, setSelectedParking] = useState(null)
  const [showPopup, togglePopup] = useState(null)
  const [showButton, setShowButton] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [animating, setAnimating] = useState(false)

  const chooseSpot = (longitude, latitude) => {
    setSelectedParking(longitude, latitude)
  }
  const next = () => {
    if (animating) return
    const nextIndex = activeIndex === parkings.length - 1 ? 0 : activeIndex + 1
    setActiveIndex(nextIndex)
  }

  const previous = () => {
    if (animating) return
    const nextIndex = activeIndex === 0 ? parkings.length - 1 : activeIndex - 1
    setActiveIndex(nextIndex)
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
      {props.allParkings
        ? props.allParkings.map((parking, index) => (
            <Fragment key={index}>
              <Marker longitude={parking.longitude} latitude={parking.latitude}>
                <div className="marker" />
              </Marker>
              <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
              >
                <Carousel.Item
                  onExiting={() => setAnimating(true)}
                  onExited={() => setAnimating(false)}
                >
                  {/* <button
                    onClick={() =>
                      chooseSpot(parking.longitude, parking.latitude)
                    }
                  >
                    <p>Time:</p>
                    <p>Distance:</p>
                    <button>open in google map</button>
                  </button> */}
                </Carousel.Item>
              </Carousel>
              {selectedParking ? (
                <Popup
                  longitude={selectedParking.longitude}
                  latitude={selectedParking.latitude}
                >
                  {selectedParking.name}
                </Popup>
              ) : null}
            </Fragment>
          ))
        : null}
      <Navigate history={props.history} />
      <button onClick={props.calcDistance}>Get Distance</button>
    </ReactMap>
  )
}

export default Map
