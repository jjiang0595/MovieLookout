import styles from './MovieReviews.module.css';
import {onValue, ref, set} from "firebase/database";
import {db} from "../../store/firebaseConfig";
import {useContext, useEffect, useRef, useState} from "react";
import AuthContext from "../../store/auth-context";

const MovieReviews = (props) => {
    const authCtx = useContext(AuthContext);
    const title = useRef('');
    const review = useRef('');
    const watchlistRef = ref(db, `movies/${props.movieId}/reviews`);
    const [reviews, setReviews] = useState([]);


    useEffect(() => {
        onValue(watchlistRef, (snapshot) => {
            const data = snapshot.val();
            const newReviews = [];
            for (const key in data) {
                const review = {
                    date: data[key].date,
                    title: data[key].title,
                    review: data[key].review,
                }
                newReviews.push(review);
            }
            setReviews(newReviews);
            console.log(reviews)
        });
    }, []);


    const submitHandler = async (event) => {
        event.preventDefault();
        const newReview = {
            title: title.current.value,
            review: review.current.value,
            date: new Date().toLocaleDateString(),
        }

        setReviews((prevReviews) => {
            return prevReviews.concat(newReview);
        });

        title.current.value = '';
        review.current.value = '';

        await set(ref(db, `movies/${props.movieId}/reviews/${authCtx.userId}`), {
            title: newReview.title,
            review: newReview.review,
            date: new Date().toLocaleDateString()
        })


    }

    return (
        <div className={styles.reviews}>
            <span className={styles.reviews__header}>User Reviews</span>

            <div className={styles.reviews__list}>
                {reviews.length > 0 &&
                    reviews.map(review => (
                        <div className={styles.reviews__list__item}>
                            <div className={styles.reviews__list__item__header}>
                                <span className={styles.reviews__list__item__header__title}>{review.title}</span>
                                <span className={styles.reviews__list__item__header__date}>{review.date}</span>
                            </div>
                            <div className={styles.reviews__list__item__body}>
                                <span className={styles.reviews__list__item__body__text}>{review.review}</span>
                            </div>
                        </div>
                    ))
                }

            </div>

            <div className={styles.reviews__form}>
                <span className={styles.reviews__form__header}>Add a Review</span>
                <form onSubmit={submitHandler}>
                    <div className={styles.reviews__form__group}>
                        <fieldset className={styles.rating}>
                            <input type="radio" id="star5" name="rating" value="5"/><label className="full"
                                                                                           htmlFor="star5"
                                                                                           title="Awesome - 5 stars"></label>
                            <input type="radio" id="star4half" name="rating" value="4 and a half"/><label
                            className={styles.half}
                            htmlFor="star4half"
                            title="Pretty good - 4.5 stars"></label>
                            <input type="radio" id="star4" name="rating" value="4"/><label className="full"
                                                                                           htmlFor="star4"
                                                                                           title="Pretty good - 4 stars"></label>
                            <input type="radio" id="star3half" name="rating" value="3 and a half"/><label
                            className={styles.half}
                            htmlFor="star3half"
                            title="Meh - 3.5 stars"></label>
                            <input type="radio" id="star3" name="rating" value="3"/><label className="full"
                                                                                           htmlFor="star3"
                                                                                           title="Meh - 3 stars"></label>
                            <input type="radio" id="star2half" name="rating" value="2 and a half"/><label
                            className={styles.half}
                            htmlFor="star2half"
                            title="Kinda bad - 2.5 stars"></label>
                            <input type="radio" id="star2" name="rating" value="2"/><label className="full"
                                                                                           htmlFor="star2"
                                                                                           title="Kinda bad - 2 stars"></label>
                            <input type="radio" id="star1half" name="rating" value="1 and a half"/><label
                            className={styles.half}
                            htmlFor="star1half"
                            title="Meh - 1.5 stars"></label>
                            <input type="radio" id="star1" name="rating" value="1"/><label className="full"
                                                                                           htmlFor="star1"
                                                                                           title="Sucks big time - 1 star"></label>
                            <input type="radio" id="starhalf" name="rating" value="half"/><label className={styles.half}
                                                                                                 htmlFor="starhalf"
                                                                                                 title="Sucks big time - 0.5 stars"></label>
                        </fieldset>
                    </div>
                    <div className={styles.reviews__form__group}>
                        <label className={styles.reviews__form__group__label} htmlFor="title">Title</label>
                        <input ref={title} className={styles.reviews__form__group__input} type="text" id="title"/>
                    </div>
                    <div className={styles.reviews__form__group}>
                        <label className={styles.reviews__form__group__label} htmlFor="review">Review</label>
                        <textarea ref={review} className={styles.reviews__form__group__input} id="review" rows="5"/>
                    </div>
                    <button className={styles.reviews__form__button}>Submit</button>
                </form>
            </div>
        </div>)
}

export default MovieReviews;