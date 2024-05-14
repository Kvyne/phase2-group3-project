import React from 'react';

const SearchBar = (props) => {
    return (
        <div className="col col-sm-4">
            <input 
                className="form-control" 
                placeholder="Search...." 
                onChange={(event) => props.setSearchValue(event.target.value)} 
                value={props.value}
            />
        </div>
    )
}

export default SearchBar;