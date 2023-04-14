import {useState} from "react";

function Categories({items, value, onClickCaterogy}) {



    return (
        <div className="categories">
            <ul>
                {
                    items && items.map((name, index) => {
                        return <li
                            className={value === index ? 'active' : ''}
                            onClick={() => onClickCaterogy(index)}
                            key={`${name}_${index}`}
                        >
                            {name}
                        </li>
                    })
                }
            </ul>
        </div>
    );
}

export default Categories;