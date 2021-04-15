import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
const Navigate = (props) => {
  const history = useHistory()
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        <img
          src="https://i.ibb.co/kHKpM6V/hamburger-menu-icon-png-53.png"
          width="50px"
        />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => history.push('/add')}>
          Add Parking
        </Dropdown.Item>
        <Dropdown.Item onClick={() => history.push('/')}>Home</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default Navigate
