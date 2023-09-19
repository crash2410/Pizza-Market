import {Categories, Pagination, PizzaBlock, Skeleton, SortPopup} from "../componets";
import styles from "./Home.module.scss";
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
            {
                statusLoading === 'error' ?
                    <div className={styles.content__error_info}>
                        <h2>Пиццы отсутствуют 😕</h2>
                        <p>Вероятней всего, произошла ошибка во время загрузки питс.
                            Повторите попытку позже.</p>
                    </div> :
                    <div className="content__items">

                        {
                            statusLoading === 'loading' ? [...new Array(6)].map((_, index) => {
                                    return <Skeleton key={index}/>;
                                }) :
                                pizzasBlocks.map(item => {
                                    return <PizzaBlock key={item.id} {...item}/>;
                                })
                        }
                    </div>
            }

            <Pagination/>
        </div>
    )
}

export default Home;