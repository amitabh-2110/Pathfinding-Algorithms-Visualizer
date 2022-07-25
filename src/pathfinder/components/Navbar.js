import React, { useState } from "react";

function Navbar(props) {
  const [algoName, setAlgoName] = useState("");

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-secondary">
        <div className="container-fluid">
          <a className="navbar-brand fst-normal fw-bold ms-2" href="#">
            Pathfinding Visualizer
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle ms-5 fw-bold"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Algorithms
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => {
                        let newAlgoName = algoName;
                        newAlgoName = "Dijkstra's";
                        setAlgoName(newAlgoName);
                      }}
                    >
                      Dijkstra's Algorithm
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => {
                        let newAlgoName = algoName;
                        newAlgoName = "A*";
                        setAlgoName(newAlgoName);
                      }}
                    >
                      A* Algorithm
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item ms-3 me-3 fw-bold">
                <a className="nav-link" href="#" onClick={() => window.location.reload(false)}>
                  Clear
                </a>
              </li>
              <li className="nav-item mt-1 ms-5">
                <button className="bg-danger rounded" onClick={() => {
                  props.visAlgo(algoName);
                }}>
                  Visualize {algoName}
                </button>
              </li>
              <li className="nav-item ms-5">
                <form className="row">
                  <div className="mb-1 mt-2 col-3 row">
                    <label htmlFor="x1" className="form-label ms-5 mt-1 col-2">
                      X1
                    </label>
                    <input
                      type="number"
                      className="form-control ms-2 col"
                      id="x1"
                      placeholder="0 to 19"
                      value={props.node.x1}
                      onChange={(e) => {props.inputEvent("x1", e)}}
                    />
                  </div>
                  <div className="mb-1 mt-2 col-3 row">
                    <label htmlFor="y1" className="form-label ms-5 mt-1 col-2">
                      Y1
                    </label>
                    <input
                      type="number"
                      className="form-control ms-2 col"
                      id="y1"
                      placeholder="0 to 49"
                      value={props.node.y1}
                      onChange={(e) => {props.inputEvent("y1", e)}}
                    />
                  </div>
                  <div className="mb-1 mt-2 col-3 row">
                    <label htmlFor="x2" className="form-label ms-5 mt-1 col-2">
                      X2
                    </label>
                    <input
                      type="number"
                      className="form-control ms-2 col"
                      id="x2"
                      placeholder="0 to 19"
                      value={props.node.x2}
                      onChange={(e) => {props.inputEvent("x2", e)}}
                    />
                  </div>
                  <div className="mb-1 col-3 mt-2 row">
                    <label htmlFor="y2" className="form-label ms-5 mt-1 col-2">
                      Y2
                    </label>
                    <input
                      type="number"
                      className="form-control ms-2 col"
                      id="y2"
                      placeholder="0 to 49"
                      value={props.node.y2}
                      onChange={(e) => {props.inputEvent("y2", e)}}
                    />
                  </div>
                </form>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
