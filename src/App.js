import {Header} from './componets';
import {Cart, Home, NotFound} from "./pages";
import {Route, Routes} from "react-router-dom";
import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const SearchContext = createContext();
export const SortingAndFilteredPizzas = createContext();

function App() {
    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState(0);
    const [activeSort, setActiveSort] = useState({name: 'популярности (DESC)', sortProperty: 'rating'});
    const [searchValue, setSearchValue] = useState('');
    const [currentPage, setCurrentPage] = useState(0)
    console.log(searchValue);
    const onSortingAndFiltered = () => {
        let urlData;
        let order = activeSort.sortProperty.includes('-') ? 'asc' : 'desc';
        let search = searchValue !== '' ? `&search=${searchValue}` : '';
        activeCategory === 0 ? urlData = new URL(`https://64138209a68505ea733524cc.mockapi.io/Cart?page=${currentPage+1}&limit=4&sortBy=${activeSort.sortProperty.replace('-', '')}&order=${order}${search}`) :
            urlData = new URL(`https://64138209a68505ea733524cc.mockapi.io/Cart?category=${activeCategory}&sortBy=${activeSort.sortProperty.replace('-', '')}&order=${order}${search}`);
        return urlData;
    }

    useEffect(() => {
        let urlData = onSortingAndFiltered();

        axios.get(urlData).then(({data, status}) => {
            setIsLoading(false);
            setPizzas(data);
        });
        window.scrollTo(0, 0);
    }, [activeCategory, activeSort, searchValue, currentPage])


    return (
        <div className="wrapper">
            <SearchContext.Provider value={{searchValue, setSearchValue}}>
                <Header/>
            </SearchContext.Provider>
            <div className="content">
                <Routes>
                    <Route path="*"
                           element={
                               <SortingAndFilteredPizzas.Provider
                                   value={{activeCategory, setActiveCategory, activeSort, setActiveSort}}>
                                   <Home
                                       setCurrentPage={setCurrentPage}
                                       statusLoading={isLoading}
                                       pizzasBlocks={pizzas}
                                   />
                               </SortingAndFilteredPizzas.Provider>
                           }/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/404" element={<NotFound/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
