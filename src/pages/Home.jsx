import {Categories, PizzaBlock, SortPopup} from "../componets";

function Home({pizzasBloks}) {
    return (
        <div className="container">
            <div className="content__top">
                <Categories items={[
                    'Мясные',
                    'Вегетарианская',
                    'Гриль',
                    'Острые',
                    'Закрытые'
                ]}/>
                <SortPopup items={[
                    'популярности',
                    'цене',
                    'алфавиту'
                ]}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    pizzasBloks.map(item => {
                        return <PizzaBlock key={item.id} {...item}/>
                    })
                }
            </div>
        </div>
    )
}

export default Home;