import {Categories, PizzaBlock, Skeleton, SortPopup} from "../componets";

function Home({pizzasBloks, statusLoading}) {
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
                    statusLoading ? [...new Array(6)].map((_, index) => {
                            return <Skeleton key={index}/>;
                        }) :
                        pizzasBloks.map(item => {
                            return <PizzaBlock key={item.id} {...item}/>;
                        })
                }
            </div>
        </div>
    )
}

export default Home;