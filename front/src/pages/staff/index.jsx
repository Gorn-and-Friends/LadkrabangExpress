import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import NavBar from "../../components/navbar";
import staffServices from "../../services/utils/staff";
import actions from "../../services/actions";

const Staff = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.lang);
  const content =
    lang === "th"
      ? require("../../assets/jsons/staff/th.json")
      : require("../../assets/jsons/staff/en.json");
  const [filtered, setFiltered] = useState(false);
  const [resList, setResList] = useState([]);
  const [choice, setChoice] = useState(0);
  const [input, setInput] = useState({
    trainNumber: "",
    date: "",
  });

  useEffect(() => {
    console.log(resList);
  }, [resList]);

  const handleInputOnChange = (e) => {
    const temp = { ...input };
    temp[e.target.id] = e.target.value;
    setInput(temp);
  };

  const handleOnSearch = async (e) => {
    e.preventDefault();
    const query = {
      ...input,
      class: choice,
    };
    try {
      const res = await staffServices.search(query);
      setResList(sessionStorage.getItem("staffRes"));
      if (res === 204) {
        alert("Double check you queries | กรุณาตรวจสอบข้อมูลที่กรอกอีกครั้ง");
      }
    } catch (er) {
      console.log(er);
    }
    console.log(query);
  };

  return (
    <>
      <NavBar />
      <div className="staff">
        <div className="staff__search">
          <button onClick={handleOnSearch}>
            <h1>{content.search.header}</h1>
          </button>
          <div className="staff__search__container">
            <div className="staff__search__train-number">
              <label>
                {content.search.trainNo}
                &ensp;
                <input
                  type="text"
                  id="trainNumber"
                  onChange={handleInputOnChange}
                  value={input.trainNumber}
                />
              </label>
            </div>
            <div className="staff__search__date">
              <label>
                {content.search.date}
                &ensp;
                <input
                  type="date"
                  id="date"
                  onChange={handleInputOnChange}
                  value={input.date}
                />
              </label>
            </div>
            <div className="staff__search__class">
              <div>
                <label>{content.search.class}</label>
                &ensp;
                <input
                  id="1"
                  type="radio"
                  name="class"
                  value="1"
                  checked={choice == "1"}
                  onChange={(e) => setChoice(e.target.value)}
                />
                <label htmlFor="1">1</label>
                &ensp;
                <input
                  id="2"
                  type="radio"
                  name="class"
                  value="2"
                  checked={choice == "2"}
                  onChange={(e) => setChoice(e.target.value)}
                />
                <label htmlFor="2">2</label>
                &ensp;
                <input
                  id="3"
                  type="radio"
                  name="class"
                  value="3"
                  checked={choice == "3"}
                  onChange={(e) => setChoice(e.target.value)}
                />
                <label htmlFor="3">3</label>
              </div>
            </div>
            <div className="staff__search__occupied">
              <input
                id="io"
                type="checkbox"
                onClick={(e) => {
                  setFiltered(e.target.checked);
                }}
              />
              <label htmlFor="io">{content.search.isOccupied}</label>
            </div>
          </div>
        </div>
        <div className="staff__result">
          <table>
            <thead>
              <tr>
                <th>{content.result.trainNo}</th>
                <th>{content.result.name}</th>
                <th>{content.result.date}</th>
                <th>{content.result.origin}</th>
                <th>{content.result.destination}</th>
                <th>{content.result.class}</th>
                <th>{content.result.coach}</th>
                <th>{content.result.seat}</th>
                <th>{content.result.present}</th>
              </tr>
            </thead>
            <tbody>
              {resList && resList.length > 0
                ? resList.map((res) => (
                    <tr>
                      <td>{res.trainNumber}</td>
                      <td>{res.firstname + " " + res.lastname}</td>
                      <td>{res.date}</td>
                      <td>{res.origin}</td>
                      <td>{res.destination}</td>
                      <td>{res.class}</td>
                      <td>{res.coach}</td>
                      <td>{res.seat}</td>
                      <td>{res.present}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Staff;
