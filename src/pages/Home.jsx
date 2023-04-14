import {Categories, PizzaBlock, Skeleton, SortPopup} from "../componets";

function Home({pizzasBloks, statusLoading, onSortedPizza, categoryValues, onClickCaterogy, sortValues, onClickSort}) {
    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    onClickCaterogy={onClickCaterogy}
                    value={categoryValues}
                    items={[
                        'Все',
                        'Мясные',
                        'Вегетарианская',
                        'Гриль',
                        'Острые',
                        'Закрытые'
                    ]}/>
                <SortPopup
                    values={sortValues}
                    onClickSort={onClickSort}
                    onSortedPizza={onSortedPizza}
                    />
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