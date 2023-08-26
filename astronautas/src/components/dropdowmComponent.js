import React from "react";
import { Dropdown } from "react-bootstrap";
import './dropdowmStyle.css'

function DropdownFilter({ selectedCategory, onSelectCategory }) {
  return (
    <Dropdown onSelect={onSelectCategory}>
      <Dropdown.Toggle variant="primary" id="dropdown-basic" className="dropDown">
        {selectedCategory}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item eventKey="All Status">All Status</Dropdown.Item>
        <Dropdown.Item eventKey="Active">Active</Dropdown.Item>
        <Dropdown.Item eventKey="Retired">Retired</Dropdown.Item>
        {/* Agrega más opciones aquí */}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownFilter;