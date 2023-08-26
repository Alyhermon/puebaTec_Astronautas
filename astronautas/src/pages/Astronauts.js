import React, { useState, useEffect } from "react";
import DropdownFilter from "../components/dropdowmComponent";
import SearchBar from "../components/searchComponent";
import {Table,Button, Modal } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import axios from "axios";
import "./Astronauts.css";

function Astronauts() {
  const [apiData, setApiData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Status");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 3;

  const URL = "https://ll.thespacedevs.com/2.2.0/astronaut/?format=json";

  useEffect(() => {
    fetchApiData();
  }, [selectedCategory, search]);

  const fetchApiData = async () => {
    try {
      const response = await axios.get(URL);
      setApiData(response.data.results);
    } catch (error) {
      console.error("Error with Data: ", error);
    }
  };

  const handleCategorySelect = (eventKey) => {
    setSelectedCategory(eventKey);
    setCurrentPage(0);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setCurrentPage(0);
  };

  const filterData = apiData.filter((item) => {
    if (selectedCategory === "All Status") {
      return true;
    }
    return item.status.name === selectedCategory;
  });

  const searchedData = filterData.filter((item) => {
    return item.nationality.toLowerCase().includes(search.toLowerCase());
  });

  const offset = currentPage * pageSize;
  const pagedData = searchedData.slice(offset, offset + pageSize);
  const pageCount = Math.ceil(searchedData.length / pageSize);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalShow = (astronaut) => {
    setSelectedData(astronaut);
    setShowModal(true);
  };

  return (
    <>
      <div>
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Space Mission: {selectedData.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="Details">
            <p>
              <b>BIOGRAPHY: </b> {selectedData.bio}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <div className="Astronautas">
        <h1 className="titulo">AstroSpace</h1>
        <div className="filters">
          <DropdownFilter
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />
          <SearchBar search={search} onSearchChange={handleSearchChange} />
        </div>
        <div className="ContainerTable">
          <Table className="table shadow ">
            <thead className="table-primary">
              <tr className="titulos">
                <th scope="col">Photo</th>
                <th scope="col">Name</th>
                <th scope="col">Nationality</th>
                <th scope="col">Description</th>
                <th scope="col">Date of birth</th>
                <th scope="col">Age</th>
                <th scope="col">Social Media</th>
                <th scope="col">Status</th>
                <th scope="col">Options</th>
              </tr>
            </thead>

            <tbody>
              {pagedData.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text">
                    NO DATA FOUND
                  </td>
                </tr>
              ) : (
                pagedData.map((astronaut) => {
                  return (
                    <tr>
                      <td className="imgs">
                        <img
                          src={astronaut.profile_image}
                          alt="Astronaut"
                          height={150}
                          width={110}
                        />
                      </td>
                      <td>{astronaut.name}</td>
                      <td>{astronaut.nationality}</td>
                      <td>
                        <p className="parrafo">
                          {astronaut.agency.description}
                        </p>
                      </td>
                      <td>{astronaut.date_of_birth}</td>
                      <td>{astronaut.age}</td>
                      <td className="socialMedia">
                        <a href={astronaut.twitter}>
                          <img
                            src="../img/icons/twitter.png"
                            alt="Twitter"
                            height={30}
                          />
                        </a>
                        <a href={astronaut.instagram}>
                          <img
                            src="../img/icons/instagram.png"
                            alt="Instagram"
                            height={35}
                          />
                        </a>
                      </td>
                      <td>{astronaut.status.name}</td>
                      <td>
                        <td>
                          <button 
                          className=" btn"
                          onClick={() => handleModalShow(astronaut)}>
                          <img
                            src="../img/icons/ver.png"
                            alt="Details"
                            height={33}
                          />
                          </button>
                        </td>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </Table>
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
          />
        </div>
        <div className="Footer"></div>
      </div>
    </>
  );
}

export default Astronauts;
