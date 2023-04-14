import {Header} from './componets';
import {Cart, Home, NotFound} from "./pages";
import {Route, Routes} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";


function App() {
    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState(0);
    const [activeSort, setActiveSort] = useState({name: 'популярности (DESC)', sortProperty: 'rating'});
    const onSortingAndFiltered = () => {
        let urlData;
        let order = activeSort.sortProperty.includes('-')? 'asc': 'desc';
        activeCategory === 0 ? urlData = new URL(`https://64138209a68505ea733524cc.mockapi.io/Cart?sortBy=${activeSort.sortProperty.replace('-', '')}&order=${order}`) :
            urlData = new URL(`https://64138209a68505ea733524cc.mockapi.io/Cart?category=${activeCategory}&sortBy=${activeSort.sortProperty.replace('-', '')}&order=${order}`);
        return urlData;
    }

    useEffect(() => {
        let urlData = onSortingAndFiltered();

        axios.get(urlData).then(({data, status}) => {
            setIsLoading(false);
            setPizzas(data);
        });
        window.scrollTo(0, 0);
    }, [activeCategory, activeSort])


    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <Routes>
                    <Route path="*"
                           element={<Home
                               categoryValues={activeCategory}
                               onClickCaterogy={(i) => setActiveCategory(i)}
                               sortValues={activeSort}
                               onClickSort={(i) => setActiveSort(i)}
                               statusLoading={isLoading}
                               pizzasBloks={pizzas}
                           />}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/404" element={<NotFound/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
