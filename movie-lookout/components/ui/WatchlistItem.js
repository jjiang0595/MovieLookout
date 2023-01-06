import {useEffect, useState} from "react";
import Link from "next/link";
import styles from "./WatchlistItem.module.scss";

const WatchlistItem = (props) => {
    const [showButton, setShowButton] = useState(false);



    return (
        <Link href={{
            pathname: `/${props.movieId}`,
            query: {
                key: props.movieId,
            }
        }} as={`/movies/${props.movieId}`}>
            <div className={styles.list__item} key={props.movieId}>
                <img className={styles.list__item__poster}
                     src={`http://image.tmdb.org/t/p/w500/${props.image}`}>
                </img>
                <button className={styles.list__item__button}>
                    <svg className={styles.list__item__button__icon}>
                        <use href="/sprite.svg#icon-checkmark"></use>
                    </svg>
                </button>
            </div>
        </Link>
    )
}

export default WatchlistItem;