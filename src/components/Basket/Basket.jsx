import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  countMinus,
  countPlus,
  fetchBasket,
  removeFromBasket,
} from "../../features/shopSlice";
import styles from "./Basket.module.css";
import { serverUrl } from "../../serverUrl";

const Basket = ({ sum, setSum, modal, setModal }) => {
  const basket = useSelector((state) => state.shopSlice.basket);
  const userId = useSelector((state) => state.applicationSlice.name);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBasket({ userId }));
  }, [dispatch, userId]);

  function handleRemoveFromBasket(productId, product) {
    setSum(sum - product.countInBasket * product.price);
    dispatch(removeFromBasket({ userId, productId, product }));
  }
  function handlePlus(productId, product) {
    setSum(sum + product.countInBasket * product.price);
    return dispatch(countPlus({ productId }));
  }
  function handleMinus(productId, product) {
    if (product.countInBasket > 1) {
      setSum(sum - product.countInBasket * product.price);
      return dispatch(countMinus({ productId }));
    }
    alert(1);
  }

  return (
    <>
      {basket.length ? (
        <div className={styles.BAsket}>
          {basket.map((product, index) => {
            return (
              <div className={styles.basket_item}>
                <div className={styles.del_btn}>
                  <button
                    className={styles.del}
                    onClick={() => handleRemoveFromBasket(product._id, product)}
                  >
                    x
                  </button>
                </div>

                <div key={index} className={styles.product_name}>{product.name}</div>
                <div className={styles.img_basket}>
                  <button onClick={() => handleMinus(product._id, product)} className={styles.del}>
                    -
                  </button>
                  <img
                    src={`${serverUrl}/img/${product.image}`}
                    alt="q"
                  />
                  <button onClick={() => handlePlus(product._id, product)} className={styles.del}>
                    +
                  </button>
                </div>

                <div className={styles.count}>
                  Количество: {product.countInBasket}
                </div>
                <div className={styles.count_Controller}>
                  Цена: {product.price * product.countInBasket}
                </div>
              </div>
            );
          })}
          <div className={styles.buy_all}>Итого: {sum} <button className={styles.del} onClick={() => setModal(true)}>Купить все</button></div>
        </div>
      ) : (
        <div className={styles.Basket}>
          <span>Нет покупок - нет конфетки</span>
          <img
            src="https://cdn.icon-icons.com/icons2/1055/PNG/128/17-cart-cat_icon-icons.com_76693.png"
            alt=""
          />
        </div>
      )}
    </>
  );
};

export default Basket;
