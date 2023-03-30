import styles from './NotFoundBlock.module.scss';
function NotFoundInfo() {
    return (
        <div className={styles.root}>
            <h1>
                <span>😕</span>
                <br/>
                Ничего не найдено
            </h1>
            <p className={styles.description}>
                К сожалени данная страница отсутствует в нашем интернет-магазине
            </p>
        </div>
    )
}

export default NotFoundInfo;