import React, { useState } from 'react'

const AddParking = (props) => {
  return (
    <div>
      <form>
        <input
          name="price"
          placeholder="price"
          value={props.parking.price}
          onChange={props.handleChange}
        />
        <input type="time" name="time" value="time" />
        <br></br>
        {/* <button onClick={props.getLocation}>Get Location</button>
        <p>{props.status}</p>
        {props.coordinates} */}
      </form>
    </div>
  )
}

export default AddParking
