import React, { Component } from 'react'
import { Link, useHistory } from 'react-router-dom'

export default class Navbar extends Component {
    render() {
        return (
            <div>

                <nav class="navbar navbar-expand-lg py-3 navbar-dark bg-dark shadow-sm">
                    <div class="container">
                        <a href="#" class="navbar-brand">

                            <img src="https://i.imgur.com/Le9hyia.png" width="45" alt="" class="d-inline-block align-middle mr-2" />

                            <span class="text-uppercase font-weight-bold">Entertainme</span>
                        </a>
                        <div id="navbarSupportedContent" class="collapse navbar-collapse">
                            <ul class="navbar-nav ml-auto">
                                <li class="nav-item"><Link to="/" class="nav-link">Home</Link></li>
                                <li class="nav-item"><Link to="/movie/add" class="nav-link">Add-Movie</Link></li>
                                <li class="nav-item"><Link to="/movie/favorite" class="nav-link">Favorites</Link></li>
                            </ul>
                        </div>
                        
                    </div>
                </nav>
            </div>
        )
    }
}
