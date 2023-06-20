import React, { useState } from 'react'
import './Calender.css'

export const Calender = () => {
    return (
        <div className="card cardWidth">
            <button className='btn btn-light'>
                <div className="row ">
                    <div className="col-12">

                        <div className="row justify-content-center">
                            <div className="col-5  logo_calender" >


                            </div>
                            <div className="col-7 align-self-center ">

                                06/16/20
                            </div>
                        </div>
                    </div>
                </div>
            </button>
        </div>

    )
}
