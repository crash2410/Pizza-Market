import {Header} from './componets';
import {Cart, Home} from "./pages";
import {Route, Routes} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";


function App() {
    const [pizzas, setPizzas] = useState([]);

    useEffect(() => {
        axios.get('https://64138209a68505ea733524cc.mockapi.io/Cart').then(({data}) => {
            setPizzas(data);
        });
    }, [])

    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <Routes>
                    <Route path="*" element={<Home pizzasBloks={pizzas}/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
