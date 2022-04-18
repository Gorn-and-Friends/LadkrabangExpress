import React from "react";
import "./style.scss";
import bg from "../../assets/images/hero.jpg";
import { useSelector } from "react-redux";

const Hero = () => {
  const lang = useSelector((state) => state.lang);

  return (
    <div className="hero">
      <img src={bg} alt="" />
      <div className="hero__speech">
        <h1>Ladkrabang</h1>
        <h1>Express</h1>
        <p>
          {lang === "th"
            ? "อาาาาาาา หกดา่ไน้ำน้ ฟนรก้ดรนไ้ำนด้ไนร ไก้่ดไนก้ดนรไ้นกรด้ นร้น้รนๆ้ไำนรก้ๆนหำ ๆ่ไหกนๆ้หนก้ๆนหรก้ ๆ้หนก้ๆนหรก้ๆรนหก้รนๆห้กรนๆ้หนรก้ๆนหร้กๆนห้กรนๆ้หนกร้ๆนหรก้นๆร้หกรน ๆ้หรก้นๆห้กรนๆ้หกนรๆ้หกนๆ้หนกร้ๆหนรก้หืน้ๆนรืหกนรืหกรนดไำดื ืไนกรด้ไนรก้ดรนไก้ดนรไ้กรนด้ไรนกด้ไนรก้ดไรนก้ดร นไ้กดรนไ้กดไรนก้ดไรนก้ดไรนก้ดไรนก้ด ้ไนรกด้รนไก้ดรนไกด ฟหกดฟหกดไำกด ดไำดเำฟ่ ฟ่ฟ่ฟำะ่ำะรฟภุรฟะกด่ฟำพีฟำะี่ฟำะ่ฟำ้"
            : "Lorem ipsum dolor sit amet, consectetur. Morbimolestie ex eu nunc tincidunt scelerisque euismod elementum tortor. Aenean eleifend auctor justo, at ornare tellus mattis et. Sed vel eliturna. In id tristique lorem. Integer cursus nisi sed ultricies Integertincidunt, orci id accumsan condimentum."}
        </p>
      </div>
    </div>
  );
};

export default Hero;
