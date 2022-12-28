import styles from './Searchbar.module.scss';

const Searchbar = (props) => {


    return (
        <form action="#" className={styles.search}>
            <input type="text" className={styles.search__input} placeholder="Search for a movie"/>
            <button className={styles.search__button}>
                <svg className={styles.search__icon}>
                    <use href="/sprite.svg#icon-search"></use>
                </svg>
            </button>
        </form>
    )
}

export default Searchbar;
