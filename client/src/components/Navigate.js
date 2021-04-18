import React, { useEffect } from 'react'
import { Dropdown } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import '../App.css'
const Navigate = (props) => {
  const history = useHistory()
  useEffect(() => {
    props.checkSession()
  }, [])
  return (
    <Dropdown className="navigate">
      <Dropdown.Toggle>
        <img
          className="navMenu"
          alt="navigate"
          src="https://i.ibb.co/kHKpM6V/hamburger-menu-icon-png-53.png"
          width="30px"
        />
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu">
        <div>
          {props.authenticated ? (
            <div>
              {' '}
              <Dropdown.Item>
                {props.myProfile ? (
                  <div className="user">
                    <img
                      className="profile-picture"
                      alt="profile"
                      src={props.myProfile.profile}
                      width="40px"
                      height="40px"
                    />
                    <p style={{ color: 'black' }}>{props.myProfile.name}</p>
                  </div>
                ) : null}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => props.logOut()}
                className="dropdown-item"
              >
                <div className="dropdown">
                  <img
                    className="navIcon"
                    alt="icon"
                    src="https://i.ibb.co/02GKVrn/logout-256.gif"
                    width="30px"
                  />
                  Logout
                </div>
              </Dropdown.Item>
            </div>
          ) : (
            <div>
              <Dropdown.Item
                onClick={() => history.push('/signup')}
                className="dropdown-item"
              >
                <div className="dropdown">
                  <img
                    className="navIcon"
                    alt="icon"
                    src="https://i.ibb.co/G9GCzfP/pngkey-com-register-icon-png-3347013.png"
                    width="30px"
                  />
                  Sign Up
                </div>
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => history.push('/signin')}
                className="dropdown-item"
              >
                <div className="dropdown">
                  <img
                    className="navIcon"
                    alt="icon"
                    src="https://i.ibb.co/d7fYXBX/pngkey-com-profile-icon-png-2024990.png"
                    width="30px"
                  />
                  Sign In
                </div>
              </Dropdown.Item>
            </div>
          )}
          <Dropdown.Item
            onClick={() => history.push('/')}
            className="dropdown-item"
          >
            <div className="dropdown">
              <img
                className="navIcon"
                alt="icon"
                src="https://i.ibb.co/PtBr6hd/pngfind-com-white-house-logo-png-5898244.png"
                width="30px"
              />
              Home
            </div>
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => history.push('/add')}
            className="dropdown-item"
          >
            <div className="dropdown">
              <img
                alt="icon"
                className="navIcon"
                src="https://i.ibb.co/RjNhDXK/add-256.png"
                width="30px"
                height="30px"
              />
              Add Parking
            </div>
          </Dropdown.Item>
          <br></br>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default Navigate
