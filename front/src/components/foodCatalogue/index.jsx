import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";
import BookingButtons from "../bookingBtns";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

const FoodCatalogue = () => {
  const lang = useSelector((state) => state.lang);
  const foods = require("../../assets/jsons/booking/foods.json");
  const [searchParams, _] = useSearchParams();
  const [category, setCategory] = useState(0);
  const [foodList, setFoodList] = useState([]);
  const [filteredFoodList, setFilteredFoodList] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  const [foodOptions, setFoodOptions] = useState([]);
  const [optionVals, setOptionVals] = useState({});
  const [optionPrice, setOptionPrice] = useState([]);
  const [optionIds, setOptionIds] = useState({});
  const [optionValues, setOptionValues] = useState({});
  const [optionNames, setOptionNames] = useState({});
  const [optionNamesTH, setOptionNamesTH] = useState({});
  const [optionNamesEN, setOptionNamesEN] = useState({});
  const [foodCart, setFoodCart] = useState([]);
  const [displayFoodCart, setDisplayFoodCart] = useState([]);

  useEffect(() => {
    setFoodList(foods.item);
    setFoodCategories(foods.tag);
    setFoodOptions(foods.option);
  }, []);

  useEffect(() => {
    try {
      setFilteredFoodList(
        foodList.filter((food) => food.tag.includes(category))
      );
    } catch {}
  }, [category]);

  useEffect(() => {
    let temp = Array(foodList.length).fill("");
    (category === 0 ? foodList : filteredFoodList).map((_, i) => {
      let res = "";
      Object.keys(optionNamesEN)
        .filter((opt) => opt.includes(i))
        .map((data) => {
          res += " " + optionNamesEN[data];
        });
      temp[i] = res;
    });
    setOptionNames(temp);
  }, [optionNamesEN, category]);

  useEffect(() => {
    let temp = Array(foodList.length).fill("");
    (category === 0 ? foodList : filteredFoodList).map((_, i) => {
      let res = "";
      Object.keys(optionNamesTH)
        .sort()
        .filter((opt) => opt.includes(i))
        .map((data) => {
          res += " " + optionNamesTH[data];
        });
      temp[i] = res;
    });
    setOptionValues(temp);
  }, [optionNamesTH, category, foodList]);

  useEffect(() => {
    setOptionPrice([]);
    let temp = Array(foodList.length).fill("");
    (category === 0 ? foodList : filteredFoodList).map((_, i) => {
      let res = 0;
      Object.keys(optionVals)
        .filter((opt) => opt.includes(i))
        .map((data) => {
          res += optionVals[data];
        });
      temp[i] = res;
    });
    setOptionPrice(temp);
  }, [optionVals, category, foodList]);

  useEffect(() => {
    try {
      let temp = {};
      foodCart.map((cartItem) => {
        if (Object.keys(temp).includes(cartItem.th)) {
          temp[cartItem.th].amount += 1;
        } else {
          temp[cartItem.th] = {
            en: cartItem.en,
            foodName: cartItem.th,
            amount: 1,
            price: cartItem.price,
          };
        }
      });
      setDisplayFoodCart(temp);
    } catch {}
  }, [foodCart]);

  useEffect(() => {
    console.log(displayFoodCart, Object.keys(displayFoodCart).length !== 0);
  }, [displayFoodCart]);

  const handleOnNext = async (e) => {};

  return (
    <div className="food-catalogue">
      <div className="food-catalogue__catalogue">
        <div className="food-catalogue__catalogue__radio">
          <div className="food-catalogue__catalogue__radio__inner">
            <input
              checked={category === 0}
              onChange={(e) => setCategory(Number(e.target.value))}
              type="radio"
              id="0"
              value="0"
              name="category"
            />
            <label htmlFor="0">{lang === "th" ? "ทั้งหมด" : "All"}</label>
            {foodCategories.map((cat, i) => (
              <>
                <input
                  checked={category === cat.value}
                  onChange={(e) => setCategory(e.target.value)}
                  type="radio"
                  id={i + 1}
                  value={cat.value}
                  name="category"
                />
                <label htmlFor={i + 1}>{cat.name[lang]}</label>
              </>
            ))}
          </div>
        </div>
        <div className="food-catalogue__catalogue__container">
          <div className="food-catalogue__catalogue__inner">
            {foodList && foodList.length > 0 ? (
              (category === 0 ? foodList : filteredFoodList).map((food, i) => (
                <div
                  className="food-catalogue__catalogue__card"
                  data-price={
                    optionPrice[i] ? food.price + optionPrice[i] : food.price
                  }
                  data-value={food.value + optionValues[i]}
                  data-name-th={food.name["th"] + optionValues[i]}
                  data-name-en={food.name["en"] + optionNames[i]}
                >
                  <section>
                    <img src={food.pic} alt="" />
                    <h3>{food.name[lang]}</h3>
                    <p>{food.description}</p>
                    <span>
                      &#3647;
                      {optionPrice[i]
                        ? food.price + optionPrice[i]
                        : food.price}
                    </span>
                    <button
                      onClick={() => {
                        setFoodCart([
                          ...foodCart,
                          {
                            th: food.name["th"] + optionValues[i],
                            en: food.name["en"] + optionNames[i],
                            price: food.price + optionPrice[i],
                          },
                        ]);
                      }}
                    >
                      +
                    </button>
                    <div className="food-catalogue__catalogue__card__option">
                      {food.option.map((optName, j) => (
                        <div className="food-catalogue__catalogue__card__option__container">
                          <div className="food-catalogue__catalogue__card__option__inner">
                            {foodOptions[optName].map((opt, k) => (
                              <>
                                <input
                                  type="radio"
                                  id={i + "-" + j + "-" + k}
                                  name={optName + "-" + i + "-" + j}
                                  value={k}
                                  onChange={() => {
                                    let optTemp = { ...optionVals };
                                    let idTemp = { ...optionIds };
                                    let nameTempTH = { ...optionNamesTH };
                                    let nameTempEN = { ...optionNamesEN };
                                    optTemp[i + "-" + optName] = opt.price;
                                    idTemp[optName + "-" + i + "-" + j] =
                                      i + "-" + j + "-" + k;
                                    nameTempTH[i + "-" + optName] = opt.value;
                                    nameTempEN[i + "-" + optName] =
                                      opt.option.en;
                                    setOptionVals(optTemp);
                                    setOptionIds(idTemp);
                                    setOptionNamesTH(nameTempTH);
                                    setOptionNamesEN(nameTempEN);
                                  }}
                                  checked={
                                    optionIds[optName + "-" + i + "-" + j] ==
                                    i + "-" + j + "-" + k
                                  }
                                />
                                <label htmlFor={i + "-" + j + "-" + k}>
                                  {opt.option[lang]}
                                </label>
                              </>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className="food-catalogue__cart">
        <div className="food-catalogue__cart__container">
          <div className="food-catalogue__cart__inner">
            {Object.keys(displayFoodCart).length !== 0
              ? Object.keys(displayFoodCart).map((item) => (
                  <>
                    <div className="food-catalogue__cart__name">{item}</div>
                    <div className="food-catalogue__cart__amount">
                      <button
                        onClick={() => {
                          let temp = { ...displayFoodCart };
                          temp[item].amount <= 0
                            ? (temp[item].amount = 0)
                            : (temp[item].amount -= 1);
                          setDisplayFoodCart(temp);
                        }}
                      >
                        <AiOutlineMinusCircle />
                      </button>
                      <span>{displayFoodCart[item].amount}</span>
                      <button
                        onClick={() => {
                          let temp = { ...displayFoodCart };
                          temp[item].amount >= 10
                            ? (temp[item].amount = 10)
                            : (temp[item].amount += 1);
                          setDisplayFoodCart(temp);
                        }}
                      >
                        <AiOutlinePlusCircle />
                      </button>
                      <span>
                        {displayFoodCart[item].price *
                          displayFoodCart[item].amount}
                      </span>
                    </div>
                  </>
                ))
              : null}
          </div>
        </div>
        <BookingButtons
          onNext={handleOnNext}
          price={Number(searchParams.get("_p"))}
          disabled={false}
          page={4}
          pastUrlParams={searchParams.toString().split(".0000")[0]}
        />
      </div>
    </div>
  );
};

export default FoodCatalogue;
