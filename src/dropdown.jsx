// <LabeledDropdown
//     labelClassname='reviews-list-sort-by'
//     labelText={resources.sortByDropdownLabel}
//     dropdownId='categorySortByDropdown'
//     dropdownClassname='reviews-list-dropdown'
//     toggleColor='link'
//     dropdownOptions={dropdownOptions}
//     selectedOption={activeDropdown}
//     onSelectOption={this._updateSortByDropdown}
//     ref={this._sortAndFilterContainerRef}
// />

import React from "react";
import { Select } from 'antd';
import "./dropdown.css";
const { Option } = Select;

const Dropdown = ({ dropdownOptions, updateSortByDropdown, activeDropdown }) => {
    return (
        <div className="custom-dropdown">
            <Select
                value={activeDropdown}
                defaultValue ={activeDropdown}
                onChange={updateSortByDropdown}
                style={{ width: "100%" }}
            >
                {dropdownOptions.map((item) => (
                    <Option key={item.key} value={item.value}>
                        {item.key}
                    </Option>
                ))}
            </Select>
        </div>
    );
};

export default Dropdown;
