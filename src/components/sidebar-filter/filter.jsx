import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { filters } from "../../constants/filters";
const Filter = ({ handleFilterVisibility }) => {
  const [dropdownVisible, setDropdownVisible] = useState(-1);
  const handleDropdown = (index) => {
    if (dropdownVisible === index) {
      setDropdownVisible(-1);
    } else {
      setDropdownVisible(index);
    }
  };
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current) {
        const dropdownElement = dropdownRef.current;
        if (!dropdownElement.contains(event.target)) {
          // setShowFilter(false);
          handleFilterVisibility();
          console.log("click outside");
        }
      }
    };

    // if (showFilter) {
    window.addEventListener("mousedown", handleOutsideClick);
    // }

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  return (
    <div className="filtercontainer" ref={dropdownRef}>
      <div className="borderBox padV15 customizable">
        <input type="checkbox" name="" id="custom" />
        <label htmlFor="custom">customizable</label>
      </div>
      <div className="filterTypesContainer">
        {filters.map((item) => (
          <div className="borderBox dropdown padV15">
            <div onClick={() => handleDropdown(item.id)} className="heading">
              <p>{item.type}</p>
              {dropdownVisible === item.id ? (
                <img src="/icons/arrow-down.svg" alt="" />
              ) : (
                <img src="/icons/arrow-up.svg" alt="" />
              )}
            </div>
            <div className="selectedOption">
              <p>All</p>
              <div
                className={`${
                  dropdownVisible === item.id ? "showDropDown" : "hideDropDown"
                }`}
              >
                <p>Unselect all</p>
                <div className="optionsContainer">
                  {item?.options?.map((option) => (
                    <div className="type-optionCont">
                      <input type="checkbox" name="" id="type-option" />
                      <label htmlFor="type-option">{option}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;