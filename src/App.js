import {Header} from './componets';
import {Cart, Home, NotFound} from "./pages";
import {Route, Routes} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";


function App() {
    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        axios.get('https://64138209a68505ea733524cc.mockapi.io/Cart').then(({data, status}) => {
            setIsLoading(false);
            setPizzas(data);
        });
    }, [])

    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <Routes>
                    <Route path="*" element={<Home statusLoading={isLoading} pizzasBloks={pizzas}/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/404" element={<NotFound/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
