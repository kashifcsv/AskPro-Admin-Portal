import React from 'react'
import { Button } from 'react-bootstrap'
import './SearchBar.css'

export const SearchBar = (props) => {
    return (
        <div>
            <form className="form-inline col-12 searchBartool">
                <input
                    className="form-control  mr-sm-2 inputIcon"
                    type="search"
                    placeholder={props.placeholder}
                    aria-label="Search"



                />{" "}


            </form>
        </div>
    )
}
