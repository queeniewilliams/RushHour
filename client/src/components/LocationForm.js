import React from 'react'

const LocationForm = (props) => {
  return (
    <div>
      <form>
        <input
          name="address"
          value={props.address}
          onChange={props.handleAddressChange}
        />
      </form>
    </div>
  )
}

export default LocationForm
