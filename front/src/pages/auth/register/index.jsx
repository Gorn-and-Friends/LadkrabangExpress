import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import register from "../../../services/utils/registry";
import actions from "../../../services/actions";
import Loading from "../../../components/loading";

const Register = () => {
  useEffect(() => {
    document.title = "Sign up - LKBX";
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.lang);
  const loading = useSelector((state) => state.loading);
  const content =
    lang === "th"
      ? require("../../../assets/jsons/register/th.json")
      : require("../../../assets/jsons/register/en.json");
  const [err, setErr] = useState(false);
  const [missingInput, setMissingInput] = useState(false);
  const [invalidPword, setInvalidPword] = useState(false);
  const [invalidRepwd, setInvalidRepwd] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidUname, setInvalidUname] = useState(false);
  const [repwd, setRepwd] = useState("");
  const [curDate, setCurDate] = useState({
    value: "",
    temp: "",
    onFocus: false,
  });
  const [reg, setReg] = useState({
    fname: "",
    lname: "",
    email: "",
    uname: "",
    pword: "",
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let missing = false;
    let invalidPwd = false;
    for (const i of Object.values(reg)) if (i == "") missing = true;
    if (reg.pword != "") {
      let regEx = new RegExp("(?=.*[0-9])[a-zA-Z0-9]{8,}");
      if (regEx.test(reg.pword)) {
        invalidPwd = false;
      } else {
        invalidPwd = true;
      }
    } else {
      invalidPwd = true;
    }

    if (missing || invalidPwd || reg.pword != repwd) {
      setErr(true);
      if (missing) {
        setMissingInput(true);
      } else {
        setMissingInput(false);
      }
      if (invalidPwd) {
        setInvalidPword(true);
      } else {
        setInvalidPword(false);
      }
      if (reg.pword != repwd) {
        setInvalidRepwd(true);
      } else {
        setInvalidRepwd(false);
      }
    } else {
      setErr(false);
      try {
        dispatch(actions.setLoading(true));
        await register.register(reg);
        navigate("/login");
      } catch (er) {
        dispatch(actions.setLoading(false));
        console.log(er);
      }
    }
  };

  const handleInputOnChange = ({ currentTarget: input }) => {
    const temp = { ...reg };
    if (input.id == "bdate") {
      setCurDate({ value: input.value });
    }
    temp[input.id] = input.value;
    console.log(temp);
    setReg(temp);
  };

  const handleDateOnFocus = ({ currentTarget: input }) => {
    input.type = "date";
    if (input.value != "") {
      let valArr = String(input.value).split("-");
      let val = valArr[1] + "/" + valArr[2] + "/" + valArr[0];
      input.value = val;
      setCurDate({ temp: val });
    }
    setCurDate({ ...curDate, onFocus: true });
  };

  const handleDateOnBlur = ({ currentTarget: input }) => {
    input.type = "text";
    if (input.value != "") {
      let valArr = String(input.value).split("-");
      let val = valArr[1] + "/" + valArr[2] + "/" + valArr[0];
      input.value = val;
      setCurDate({ value: val });
    }
    setCurDate({ ...curDate, onFocus: false });
  };

  return loading ? (
    <Loading reduceHeight={0} />
  ) : (
    <form className="register" onSubmit={handleOnSubmit}>
      <fieldset className="register__container">
        <legend align="center">{content.header}</legend>
        <div className="register__form">
          {err && (
            <div className="register__form__errors">
              {missingInput
                ? content.errors.missingInput
                : invalidEmail
                ? content.errors.invalidEmail
                : invalidUname
                ? content.errors.invalidUname
                : invalidPword
                ? content.errors.invalidPword
                : invalidRepwd
                ? content.errors.invalidRepwd
                : ""}
            </div>
          )}
          <div className="register__form__first-row">
            <div className="register__form__name">
              <input
                type="text"
                id="fname"
                name="fname"
                value={reg.fname}
                onChange={handleInputOnChange}
                placeholder=" "
                autoComplete="off"
              />
              <label htmlFor="fname">
                {content.fields.fname} <span>*</span>
              </label>
            </div>
            <div className="register__form__name">
              <input
                type="text"
                id="lname"
                name="lname"
                value={reg.lname}
                onChange={handleInputOnChange}
                placeholder=" "
                autoComplete="off"
              />
              <label htmlFor="lname">
                {content.fields.lname} <span>*</span>
              </label>
            </div>
          </div>
          <div className="register__form__others">
            <input
              type="email"
              id="email"
              name="email"
              value={reg.email}
              onChange={handleInputOnChange}
              placeholder=" "
              autoComplete="off"
            />
            <label htmlFor="email">
              {content.fields.email} <span>*</span>
            </label>
          </div>
          <div className="register__form__others">
            <input
              type="text"
              id="uname"
              name="uname"
              value={reg.uname}
              onChange={handleInputOnChange}
              placeholder=" "
              autoComplete="off"
            />
            <label htmlFor="uname">
              {content.fields.uname} <span>*</span>
            </label>
          </div>
          <div className="register__form__others">
            <input
              type="password"
              id="pword"
              name="pword"
              value={reg.pword}
              onChange={handleInputOnChange}
              placeholder=" "
              autoComplete="off"
            />
            <label htmlFor="pword">
              {content.fields.pword} <span>*</span>
            </label>
          </div>
          <div className="register__form__others">
            <input
              type="password"
              id="repwd"
              name="repwd"
              value={repwd}
              onChange={({ currentTarget: input }) => setRepwd(input.value)}
              placeholder=" "
              autoComplete="off"
            />
            <label htmlFor="repwd">
              {content.fields.repwd} <span>*</span>
            </label>
          </div>
          <div className="register__form__last-row">
            <a href="/login" className="register__form__last-row__back">
              {content.buttons.back}
            </a>
            <input
              type="submit"
              className="register__form__last-row__submit"
              value={content.buttons.submit}
            />
          </div>
        </div>
      </fieldset>
    </form>
  );
};

export default Register;
