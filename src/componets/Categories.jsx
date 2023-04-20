import {useContext} from "react";
import {SortingAndFilteredPizzas} from "../App";

function Categories({items}) {
    const {setActiveCategory, activeCategory} = useContext(SortingAndFilteredPizzas);


    return (
        <div className="categories">
            <ul>
                {
                    items && items.map((name, index) => {
                        return <li
                            className={activeCategory === index ? 'active' : ''}
                            onClick={() => setActiveCategory(index)}
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