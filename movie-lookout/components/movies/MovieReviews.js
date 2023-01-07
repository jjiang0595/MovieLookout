import styles from './MovieReviews.module.css';
import {onValue, ref} from "firebase/database";
import {db} from "../../store/firebaseConfig";
import {useContext, useEffect, useState} from "react";
import AuthContext from "../../store/auth-context";

const MovieReviews = (props) => {
    const authCtx = useContext(AuthContext);
    const watchlistRef = ref(db, `movies/${props.movieId}/reviews`);
    const [reviews, setReviews] = useState([]);


    useEffect(() => {
        onValue(watchlistRef, (snapshot) => {
            const data = snapshot.val();
            const newReviews = [];
            for (const key in data) {
                const review = {
                    id: data[key].id, image: data[key].image, overview: data[key].overview,
                }
                newReviews.push(review);
            }
            setReviews(newReviews);
        });
    }, []);


    const submitHandler = (event) => {
        event.preventDefault();
    }

    return (
        <div className={styles.reviews}>
            <span className={styles.reviews__header}>User Reviews</span>

            <div className={styles.reviews__list}>
                {/*{reviews.length > 0 &&*/}
                {/*    reviews.map(review => (*/}
                <div className={styles.reviews__list__item}>
                    <div className={styles.reviews__list__item__header}>
                        <span className={styles.reviews__list__item__header__name}>John Doe</span>
                        <span className={styles.reviews__list__item__header__date}>12/12/2021</span>
                    </div>
                    <div className={styles.reviews__list__item__body}>
                        <span className={styles.reviews__list__item__body__text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies tincidunt, nisl nisl aliquet nisl, eget aliquet nunc nisl eget nisl. Donec auctor, nisl eget ultricies tincidunt, nisl nisl aliquet nisl, eget aliquet nunc nisl eget nisl.</span>
                    </div>
                    <div className={styles.reviews__list__item__footer}>
                        <div>
                            <svg className={styles.reviews__list__item__footer__likes}>
                                <use href="/sprite.svg#icon-thumbs-up"></use>
                            </svg>
                            <span className={styles.reviews__list__item__footer__likes__count}>12</span>
                        </div>
                        <div>
                            <svg className={styles.reviews__list__item__footer__dislikes}>
                                <use href="/sprite.svg#icon-thumbs-down"></use>
                            </svg>
                            <span></span>
                        </div>
                    </div>
                </div>
                {/*    ))*/}
                {/*}*/}
            </div>

            <div className={styles.reviews__form}>
                <span className={styles.reviews__form__header}>Add a Review</span>
                <form className={styles.reviews__form__form}>
                    <div className={styles.reviews__form__form__group}>
                        <label className={styles.reviews__form__form__group__label} htmlFor="name">Name</label>
                        <input className={styles.reviews__form__form__group__input} type="text" id="name"/>
                    </div>
                    <div className={styles.reviews__form__form__group}>
                        <label className={styles.reviews__form__form__group__label} htmlFor="review">Review</label>
                        <textarea className={styles.reviews__form__form__group__input} id="review" rows="5"/>
                    </div>
                    <button className={styles.reviews__form__form__button}>Submit</button>
                </form>
            </div>
        </div>)
}

export default MovieReviews;