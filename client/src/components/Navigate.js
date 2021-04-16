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
          alt="navigate"
          src="https://i.ibb.co/kHKpM6V/hamburger-menu-icon-png-53.png"
          width="30px"
        />
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu">
        <Dropdown.Item
          onClick={() => history.push('/add')}
          className="dropdown-item"
        >
          Add Parking
        </Dropdown.Item>
        <br></br>
        <Dropdown.Item
          onClick={() => history.push('/')}
          className="dropdown-item"
        >
          Home
        </Dropdown.Item>
        <br></br>
        {props.authenticated ? (
          <Dropdown.Item
            onClick={() => props.logOut()}
            className="dropdown-item"
          >
            Logout
          </Dropdown.Item>
        ) : (
          <div>
            <Dropdown.Item
              onClick={() => history.push('/signup')}
              className="dropdown-item"
            >
              Sign Up
            </Dropdown.Item>
            <br></br>
            <Dropdown.Item
              onClick={() => history.push('/signin')}
              className="dropdown-item"
            >
              Sign In
            </Dropdown.Item>
          </div>
        )}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default Navigate
