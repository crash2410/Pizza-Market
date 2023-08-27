import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import {Button, CartEmpty, CartItem, Pagination} from "../componets";
import App from "../App";
import {Cart} from "../pages";
import Index from "../componets/PizzaBlock";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/CartItem">
                <CartItem/>
            </ComponentPreview>
            <ComponentPreview path="/App">
                <App/>
            </ComponentPreview>
            <ComponentPreview path="/Cart">
                <Cart/>
            </ComponentPreview>
            <ComponentPreview path="/CartEmpty">
                <CartEmpty/>
            </ComponentPreview>
            <ComponentPreview path="/Pagination">
                <Pagination/>
            </ComponentPreview>
            <ComponentPreview path="/Index">
                <Index/>
            </ComponentPreview>
            <ComponentPreview path="/Button">
                <Button/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews