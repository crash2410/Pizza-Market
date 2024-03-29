import {useRef, useState} from "react";
import classNames from "classnames";
import PropTypes from 'prop-types';
import {addItem} from '../../redux/slices/cartSlice';
import {useDispatch, useSelector} from "react-redux";


function Index({id, imageUrl, name, price, sizes, types}) {
    const availableTypes = ['тонкое', 'традиционное'];
    const availableSizes = [26, 30, 40];
    const [activeType, setActiveType] = useState(types[0]);
    const [activeSize, setActiveSize] = useState(sizes[0]);

    const isTypePizza = useRef(null);
    const isSizePizza = useRef(null);
    const dispatch = useDispatch();

    let totalCount = 0;
    const cartItem = useSelector((state) => state.cart.items.filter((obj) => {
        return obj.id === id
    }).map((cart)=>{
        totalCount += cart.count;
        return totalCount;

    }));
    const addedCount = () => {
        if (cartItem) {
            return totalCount
        } else {
            return 0
        }
    }

    const addPizzaToCart = (id, name, imgUrl, price) => {
        const pizza = {id, name, imgUrl, price, type: availableTypes[activeType], size: activeSize};
        dispatch((addItem(pizza)));
    }


    const toggleActiveType = (index) => {
        setActiveType(index);
    }
    const toggleActiveSize = (size) => {
        setActiveSize(size);
    }

    return (
        <div className="pizza-block-wrapper">
            <div className="pizza-block">
                <img
                    className="pizza-block__image"
                    src={imageUrl}
                    alt="Pizza"
                />
                <h4 className="pizza-block__title">{name}</h4>
                <div className="pizza-block__selector">
                    <ul ref={isTypePizza}>
                        {
                            availableTypes.map((type, index) => {

                                return <li
                                    onClick={() => {
                                        toggleActiveType(index)
                                    }}
                                    key={`${type}_${index}`}
                                    className={classNames({
                                        'active': activeType === index,
                                        'disabled': !types.includes(index)
                                    })}>{type}</li>
                            })

                        }
                    </ul>
                    <ul ref={isSizePizza}>
                        {
                            availableSizes.map((size, index) => {
                                return <li
                                    onClick={() => {
                                        toggleActiveSize(size)
                                    }}
                                    key={`${size}_${index}`}
                                    className={classNames({
                                        'active': activeSize === size,
                                        'disabled': !sizes.includes(size)
                                    })}
                                >{size} см.</li>
                            })
                        }
                    </ul>
                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">от ${price} ₽</div>
                    <div className="button button--outline button--add"
                         onClick={() => {
                             addPizzaToCart(id, name, imageUrl, price)
                         }}
                    >
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                fill="white"
                            />
                        </svg>
                        <span>Добавить</span>
                        {
                            totalCount > 0 ? <i>{addedCount()}</i> : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )


}

Index.propTypes = {
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    price: PropTypes.number,
    sizes: PropTypes.arrayOf(PropTypes.number),
    types: PropTypes.arrayOf(PropTypes.number)
};

Index.defaultProps = {
    name: '---',
    imageUrl: '---',
    price: 0,
    sizes: [],
    types: []
};
export default Index;