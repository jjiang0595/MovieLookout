import styles from './Error.module.scss';

const custom404 = () => {
    return (
        <div className={styles.error}>
            <div className={styles.error__container}>
                <span className={styles.error__container__number}>404</span>
                <span className={styles.error__container__text}>Page Not Found!</span>
            </div>
            <img className={styles.error__image} src='/404_page.png' alt='404 page not found'/>
        </div>
    );
}

export default custom404;