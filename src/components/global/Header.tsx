import React from 'react'
import { Link } from 'react-router-dom'
import Search from './Search'
import Menu from './Menu'

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white p-3" 
    style={{position: 'sticky', top: 0, left: 0, zIndex: 9}}
    >
        <Link className="navbar-brand" to="/"> <img src="https://res.cloudinary.com/da0t1msvx/image/upload/v1640419951/a-network/roo5ojxgmgckj5zwwouz.png" alt="avatar" width="50" /></Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <Search />

          <Menu />
        </div>
    </nav>
  )
}

export default Header
