
import {useSelector, useDispatch} from "react-redux";
import { setCategoryId } from '../redux/slices/filterSlice';
function Categories({items}) {
    const categoryId = useSelector(state => {
        return state.filter.categoryId
    })
    const dispatch = useDispatch()

    return (
        <div className="categories">
            <ul>
                {
                    items && items.map((name, index) => {
                        return <li
                            className={categoryId === index ? 'active' : ''}
                            onClick={() => dispatch(setCategoryId(index))}
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