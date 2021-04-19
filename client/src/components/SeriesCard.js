import React, { Component } from 'react'

export default function SeriesCard(props) {
    const { series } = props

    return (
            <div class="col-md-4">
                <div class="profile-card-2">
                    <img src={series.poster_path} class="img img-responsive bg-dark" style={{ backgroundColor: 'black' }} />
                    <div class="profile-name">{series.title}</div>
                    <div class="profile-username">{series.overview} <br /> {series.popularity} : {series.tags.join(', ')}</div>
                    <div style={{ backgroundColor: 'black' }} className="row">
                    </div>
                </div>
            </div>

    )
}