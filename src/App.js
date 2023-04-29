import {Header} from './componets';
import {Cart, Home, NotFound} from "./pages";
import {Route, Routes, useNavigate} from "react-router-dom";
import {createContext, useEffect, useRef, useState} from "react";
import {setFilters} from './redux/slices/filterSlice';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import qs from "qs";
import {sortList} from "./componets/SortPopup";


export const SearchContext = createContext();
export const SortingAndFilteredPizzas = createContext();

function App() {
    const navigate = useNavigate();
    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');

    const {categoryId, sort, pageCount} = useSelector(state => state.filter)
    const dispatch = useDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const fetchPizzas = () => {
        let urlData;
        let order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        let search = searchValue !== '' ? `&search=${searchValue}` : '';
        categoryId === 0 ? urlData = new URL(`https://64138209a68505ea733524cc.mockapi.io/Cart?page=${pageCount + 1}&limit=4&sortBy=${sort.sortProperty.replace('-', '')}&order=${order}${search}`) :
            urlData = new URL(`https://64138209a68505ea733524cc.mockapi.io/Cart?category=${categoryId}&sortBy=${sort.sortProperty.replace('-', '')}&order=${order}${search}`);

        axios.get(urlData).then(({data, status}) => {
            setIsLoading(false);
            setPizzas(data);
        });
        window.scrollTo(0, 0);
    }

    // Если был первый рендер, то проверяем URL-параметры и сохраняем в редаксе
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            const sort = sortList.find(obj => obj.sortProperty === params.sortProperty);
            console.log(params);
            dispatch(setFilters({
                ...params,
                sort
            }))
            isSearch.current = true;
        }
    }, [])

    useEffect(() => {
        if (!isSearch.current){
            fetchPizzas();
        }

        isSearch.current = false;
    }, [categoryId, sort, searchValue, pageCount])

    // Если изменили параметры и был первый рендер
    useEffect(() => {
        if(isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                pageCount
            })
            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, sort, searchValue, pageCount])

    return (
        <div className="wrapper">
            <SearchContext.Provider value={{searchValue, setSearchValue}}>
                <Header/>
            </SearchContext.Provider>
            <div className="content">
                <Routes>
                    <Route path="*"
                           element={
                               <Home
                                   statusLoading={isLoading}
                                   pizzasBlocks={pizzas}
                               />
                           }/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/404" element={<NotFound/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
