import CartIcon from '../Cart/CartIcon';
import styles from './HeaderCartButton.module.css';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {
  const [isButtonAminated, setIsButtonAnimated] = useState(false);
  const cartContext = useContext(CartContext);
  const buttonClasses = `${styles.button} ${
    isButtonAminated ? styles.bump : ''
  }`;

  const numberOfCartItems = cartContext.items.reduce(
    (count, item) => count + item.amount,
    0
  );

  useEffect(() => {
    if (cartContext.items.length === 0) {
      return;
    }

    setIsButtonAnimated(true);
    const timer = setTimeout(() => setIsButtonAnimated(false), 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartContext.items]);

  return (
    <button className={buttonClasses} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
