import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";
import Header from "./components/Header/Header";

function App(props) {
  let count = 0;
  const [items, setItems] = useState([]);
  const [alliance, setAlliance] = useState([]);
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    axios
      .get(`h/mobileapis/directory/airlines/homework`)
      .then((res) => {
        const dataItems = res.data;
        const header_refactor = dataItems.replace(
          "/**/invalidCallbackFunctionName(",
          ""
        );
        const footer_refactor = header_refactor.replace(");", "");
        const ItemsData = JSON.parse(footer_refactor);
        setItems(ItemsData);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div className="App">
      {/* Header START */}
      <Header />
      {/* Header END */}

      <main>
        <div className="tile">
          <div className="tile__wrapper">
            <h1 className="tile__title">Airline</h1>

            {/* Filter START */}
            <div className="tile__filter">
              <p>
                <strong>Filter by Alliances</strong>
              </p>

              <div className="tile__filter__group">
                <div className="tile__filter__group-item">
                  <label
                    className="checkbox"
                    onChange={(event) => {
                      setAlliance(event.target.value);
                    }}
                  >
                    Oneworld
                    <input value="OW" name="tile__filter" type="radio" />
                    <span className="checkmark"></span>
                  </label>
                </div>
                <div className="tile__filter__group-item">
                  <label
                    className="checkbox"
                    onChange={(event) => {
                      setAlliance(event.target.value);
                    }}
                  >
                    Sky Team
                    <input value="ST" name="tile__filter" type="radio" />
                    <span className="checkmark"></span>
                  </label>
                </div>
                <div className="tile__filter__group-item">
                  <label
                    className="checkbox"
                    onChange={(event) => {
                      setAlliance(event.target.value);
                    }}
                  >
                    Star Alliance
                    <input value="SA" name="tile__filter" type="radio" />
                    <span className="checkmark"></span>
                  </label>
                </div>
              </div>
            </div>
            {/* Filter END */}

            {/* Airline Itemlist START */}
            <div
              className={`tile__body ${expand === false ? "toggle-expand" : ""}`}
            >
              <ul className="tile__list-items">
                {alliance == ""
                  ? items.map((elem) => {
                      const { name, phone, site, logoURL, alliance } = elem;
                      count++;
                      return (
                        <li id={count} key={count}>
                          <a href={site}>
                            <div className="tile__list-items__logo">
                              <img
                                src={"https://www.kayak.com" + logoURL}
                                alt="Logo"
                              />
                            </div>
                            <div className="tile__list-items__details">
                              <p className="airline-name">{name}</p>
                              <div className="hidden-info">
                                <p>
                                  {alliance === "SA"
                                    ? "Star Alliance"
                                    : alliance === "OW"
                                    ? "One World"
                                    : alliance === "ST"
                                    ? "Sky Team"
                                    : ""}
                                </p>
                                <p>{phone}</p>
                                <p className="web-link">{site}</p>
                              </div>
                            </div>
                          </a>
                        </li>
                      );
                    })
                  : items
                      .filter((elem) => elem.alliance === alliance)
                      .map((elem) => {
                        const { name, phone, site, logoURL, alliance } = elem;
                        count++;
                        return (
                          <li id={count} key={count}>
                            <a href={site}>
                              <div className="tile__list-items__logo">
                                <img
                                  src={"https://www.kayak.com" + logoURL}
                                  alt="Logo"
                                />
                              </div>
                              <div className="tile__list-items__details">
                                <p className="airline-name">{name}</p>
                                <div className="hidden-info">
                                  <p>
                                    {alliance === "SA"
                                      ? "Star Alliance"
                                      : alliance === "OW"
                                      ? "One World"
                                      : alliance === "ST"
                                      ? "Sky Team"
                                      : ""}
                                  </p>
                                  <p>{phone}</p>
                                  <p className="web-link">{site}</p>
                                </div>
                              </div>
                            </a>
                          </li>
                        );
                      })}
              </ul>
            </div>
            {/* Airline Itemlist END */}
            <div className="text-center">
              {expand === true ? (
                ""
              ) : (
                <button className="show-more" onClick={() => setExpand(true)}>
                  Show more
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
