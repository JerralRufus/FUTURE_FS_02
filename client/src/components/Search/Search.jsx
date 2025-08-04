import React, { useState, useRef } from "react";
import "./Search.css";

function Search({ searchTerm, handleSearchChange }) {
    const [isActive, setIsActive] = useState(false);
    const inputRef = useRef(null);

    const toggleSearch = () => {
        setIsActive(!isActive);
        if (!isActive) {
            inputRef.current.focus();
        }
    };

    return (
        <div className={`search ${isActive ? "active" : ""}`}>
            <input
                ref={inputRef}
                type="text"
                className="inputSearch"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <button className="btnSearch" onClick={toggleSearch}>
                <img src="/searchIcon.png" alt="search-Logo" />
            </button>
        </div>
    );
}

export default Search;