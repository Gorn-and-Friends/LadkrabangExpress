import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import register from "../../../services/utils/register";
import "../../../assets/styles/Register.scss";

const Register = () => {
  useEffect(() => {
    document.title = "Sign up - LKBX";
  }, []);

  const navigate = useNavigate();
  const [reg, setReg] = useState({
    fnameTH: "",
    lnameTH: "",
    fname: "",
    lname: "",
    email: "",
    uname: "",
    pword: "",
    bdate: "",
  });
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await register(reg);
      setLoading(false);
      navigate("/login");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const handleInputOnChange = ({ currentTarget: input }) => {
    const temp = { ...reg };
    temp[input.id] = input.value;
    setReg(temp);
    console.log(temp);
  };

  return (
    <form className="register" onSubmit={handleOnSubmit}>
      <fieldset className="register__container">
        <legend align="center">สร้างบัญชีใหม่ของคุณ</legend>
        <div className="register__form">
          <div className="register__form__first-row">
            <div className="register__form__name">
              <input
                type="text"
                id="fnameTH"
                name="fnameTH"
                value={reg.fnameTH}
                onChange={handleInputOnChange}
                placeholder=" "
                autoComplete="off"
                required
              />
              <label htmlFor="fnameTH">
                ชื่อ <span>*</span>
              </label>
            </div>
            <div className="register__form__name">
              <input
                type="text"
                id="lnameTH"
                name="lnameTH"
                value={reg.lnameTH}
                onChange={handleInputOnChange}
                placeholder=" "
                autoComplete="off"
                required
              />
              <label htmlFor="lnameTH">
                นามสกุล <span>*</span>
              </label>
            </div>
          </div>
          <div className="register__form__second-row">
            <div className="register__form__name">
              <input
                type="text"
                id="fname"
                name="fname"
                value={reg.fname}
                onChange={handleInputOnChange}
                placeholder=" "
                autoComplete="off"
                required
              />
              <label htmlFor="fname">
                ชื่อ (ภาษาอังกฤษ) <span>*</span>
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
                required
              />
              <label htmlFor="lname">
                นามสกุล (ภาษาอังกฤษ) <span>*</span>
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
              required
            />
            <label htmlFor="email">
              อีเมล <span>*</span>
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
              required
            />
            <label htmlFor="uname">
              ชื่อผู้ใช้งาน <span>*</span>
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
              required
            />
            <label htmlFor="pword">
              รหัสผ่าน <span>*</span>
            </label>
          </div>
          <div className="register__form__others">
            <input
              type="password"
              id="repwd"
              name="repwd"
              placeholder=" "
              autoComplete="off"
              required
            />
            <label htmlFor="repwd">
              ยืนยันรหัสผ่าน <span>*</span>
            </label>
          </div>
          <div className="register__form__last-row">
            <a href="/login" className="register__form__last-row__back">
              กลับ
            </a>
            <div className="register__form__date">
              <input
                type="text"
                id="bdate"
                name="bdate"
                value={reg.bdate}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                onChange={handleInputOnChange}
                placeholder=" "
                autoComplete="off"
                required
              />
              <label htmlFor="bdate">
                วัน/เดือน/ปีเกิด <span>*</span>
              </label>
            </div>
            <input
              type="submit"
              className="register__form__last-row__submit"
              value="ยืนยัน"
            />
          </div>
        </div>
      </fieldset>
    </form>
  );
};

export default Register;
