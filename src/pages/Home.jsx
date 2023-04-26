import {Categories, Pagination, PizzaBlock, Skeleton, SortPopup} from "../componets";
function Home({
                  pizzasBlocks,
                  statusLoading,
              }) {
    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    items={[
                        'Все',
                        'Мясные',
                        'Вегетарианская',
                        'Гриль',
                        'Острые',
                        'Закрытые'
                    ]}/>
                <SortPopup
                />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    statusLoading ? [...new Array(6)].map((_, index) => {
                            return <Skeleton key={index}/>;
                        }) :
                        pizzasBlocks.map(item => {
                            return <PizzaBlock key={item.id} {...item}/>;
                        })
                }
            </div>
            <Pagination/>
        </div>
    )
}

export default Home;