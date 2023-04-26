import {Header} from './componets';
import {Cart, Home, NotFound} from "./pages";
import {Route, Routes} from "react-router-dom";
import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {useSelector} from "react-redux";


export const SearchContext = createContext();
export const SortingAndFilteredPizzas = createContext();

function App() {
    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');

    const {categoryId , sort, pageCount} = useSelector(state => state.filter)

    const onSortingAndFiltered = () => {
        let urlData;
        let order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        let search = searchValue !== '' ? `&search=${searchValue}` : '';
        categoryId === 0 ? urlData = new URL(`https://64138209a68505ea733524cc.mockapi.io/Cart?page=${pageCount + 1}&limit=4&sortBy=${sort.sortProperty.replace('-', '')}&order=${order}${search}`) :
            urlData = new URL(`https://64138209a68505ea733524cc.mockapi.io/Cart?category=${categoryId}&sortBy=${sort.sortProperty.replace('-', '')}&order=${order}${search}`);
        return urlData;
    }

    useEffect(() => {
        let urlData = onSortingAndFiltered();

        axios.get(urlData).then(({data, status}) => {
            setIsLoading(false);
            setPizzas(data);
        });
        window.scrollTo(0, 0);
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
