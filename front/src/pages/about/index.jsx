import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";
import NavBar from "../../components/navbar";
import { BsChevronDown } from "react-icons/bs";

const About = () => {
  const lang = useSelector((state) => state.lang);
  const content =
    lang === "th"
      ? require("../../assets/jsons/about/th.json")
      : require("../../assets/jsons/about/en.json");

  return (
    <>
      <NavBar />
      <div className="about">
        <header>
          <h2>{content.subtitle}</h2>
          <h1>{content.title}</h1>
          <h3>{content.subsubtitle}</h3>
          <BsChevronDown />
        </header>
        <main>
          {content.members && content.members.length > 0
            ? content.members.map((member) => (
                <section>
                  <img src={member.pic} alt="" />
                  <div>
                    <h1>{member.name}</h1>
                    <h2>{member.position}</h2>
                  </div>
                </section>
              ))
            : null}
        </main>
        <footer>
          <hr />
          <div>{content.copyright}</div>
          <section>
            <div>{content.email}</div>
            <div>{content.location}</div>
          </section>
        </footer>
      </div>
    </>
  );
};

export default About;
