import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import '../App.css'
const Navigate = (props) => {
  const history = useHistory()
  return (
    <Dropdown className="navigate">
      <Dropdown.Toggle>
        <img
          src="https://i.ibb.co/kHKpM6V/hamburger-menu-icon-png-53.png"
          width="30px"
        />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => history.push('/add')}
          className="dropdown-item"
        >
          Add Parking
        </Dropdown.Item>
        <br></br>
        <Dropdown.Item onClick={() => history.push('/')}>Home</Dropdown.Item>
        <br></br>
        <Dropdown.Item onClick={() => history.push('/signup')}>
          Sign Up
        </Dropdown.Item>
        <br></br>
        <Dropdown.Item onClick={() => history.push('/signin')}>
          Sign In
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default Navigate
