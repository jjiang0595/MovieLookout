import styles from './MovieReviews.module.scss';
import {onValue, ref, remove, set} from "firebase/database";
import {db} from "../../store/firebaseConfig";
import {useContext, useEffect, useRef, useState} from "react";
import AuthContext from "../../store/auth-context";


// ------------------- WHAT TO DO TOMORROW -------------------
// 1) Implement a modal to confirm the deletion of a review  |
// 2) Style 'Your Review'                                    |
// 3) Add more custom fonts?                                 |
// 4) Add text if there are no reviews available             |
// 5) ...?                                                   |
// ------------------- WHAT TO DO TOMORROW -------------------

const MovieReviews = (props) => {
    const authCtx = useContext(AuthContext);
    const title = useRef('');
    const review = useRef('');
    const watchlistRef = ref(db, `movies/${props.movieId}/reviews`);
    const [reviews, setReviews] = useState([]);
    const [stars, setStars] = useState(0);
    const [uid, setUid] = useState(authCtx.userId)

    const [userReview, setUserReview] = useState(null);
    const userRef = ref(db, `movies/${props.movieId}/reviews/${authCtx.userId}`);


    useEffect(() => {
        setUid(authCtx.userId)
        // Check if user has already reviewed this movie
        onValue(userRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setUserReview(data);
            }
        })

        // Get all reviews for this movie
        onValue(watchlistRef, (snapshot) => {
            const data = snapshot.val();
            const newReviews = [];
            for (const key in data) {
                if (key !== uid) {
                    const review = {
                        id: data[key].id,
                        title: data[key].title,
                        review: data[key].review,
                        stars: data[key].stars,
                    }
                    newReviews.push(review);
                }
            }
            setReviews(newReviews);
        });
    }, [authCtx.userId, uid]);

    const starHandler = (e) => {
        setStars(e.target.value);
    }

    // DELETE REVIEW
    const deleteHandler = async () => {
        setUserReview(null);
        await remove(ref(db, `movies/${props.movieId}/reviews/${authCtx.userId}`))
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        // UPDATING USER REVIEW
        const newReview = {
            id: authCtx.userId,
            title: title.current.value,
            review: review.current.value,
            stars: stars,
        }

        setReviews((prevReviews) => {
            return prevReviews.concat(newReview);
        });

        title.current.value = '';
        review.current.value = '';
        setStars(0);

        let starsReset = document.getElementsByName('stars');
        for (let i = 0; i < starsReset.length; i++) {
            starsReset[i].checked = false;
        }

        // SENDING USER REVIEW
        await set(ref(db, `movies/${props.movieId}/reviews/${authCtx.userId}`), {
            id: authCtx.userId,
            title: newReview.title,
            review: newReview.review,
            stars: newReview.stars,
        })


    }

    return (
        <div className={styles.reviews}>
            <span className={styles.reviews__header}>User Reviews</span>
            <div className={styles.reviews__list}>
                {userReview &&
                    <div key={userReview.id}>
                        <span>Your Review</span>
                        <div className={styles.reviews__list__item}>
                            <div className={styles.reviews__list__item__header__selfRating}>
                                <div>
                                    <svg className={styles.reviews__star}>
                                        <use href="/sprite.svg#icon-star"></use>
                                    </svg>
                                    <span
                                        className={styles.reviews__list__item__header__selfRating__text}>{userReview.stars}/5
                                    </span>
                                </div>
                                <button className={styles.reviews__button} onClick={deleteHandler}>
                                    <svg className={styles.reviews__button__close}>
                                        <use href="/sprite.svg#icon-close"></use>
                                    </svg>
                                </button>
                            </div>
                            <div className={styles.reviews__list__item__header}>
                                <h1 className={styles.reviews__list__item__header__title}>{userReview.title}</h1>
                            </div>
                            <div className={styles.reviews__list__item__body}>
                                <span className={styles.reviews__list__item__body__text}>{userReview.review}</span>
                            </div>
                        </div>
                    </div>}

                {reviews.length > 0 &&
                    reviews.map(review => (
                        <div className={styles.reviews__list__item} key={review.id}>
                            <div className={styles.reviews__list__item__header__rating}>
                                <svg className={styles.reviews__star}>
                                    <use href="/sprite.svg#icon-star"></use>
                                </svg>
                                <span className={styles.reviews__list__item__header__rating__text}>{review.stars}/5</span>
                            </div>
                            <div className={styles.reviews__list__item__header}>
                                <h1 className={styles.reviews__list__item__header__title}>{review.title}</h1>
                            </div>
                            <div className={styles.reviews__list__item__body}>
                                <span className={styles.reviews__list__item__body__text}>{review.review}</span>
                            </div>
                        </div>
                    ))
                }

            </div>


            <div className={styles.reviews__form}>
                <span
                    className={styles.reviews__form__header}>{!userReview ? "Add Your Review" : "Update Your Review"}</span>
                {authCtx.isLoggedIn ?
                    <form onSubmit={submitHandler}>
                        <div className={styles.reviews__form__group}>
                            <fieldset className={styles.rating}>
                                <input type="radio" id="star5" name="stars" value="5"
                                       onChange={starHandler}/>
                                <label className="full"
                                       htmlFor="star5"
                                       title="Awesome - 5 stars"/>
                                <input type="radio" id="star4half" name="stars" value="4.5"
                                       onChange={starHandler}/>
                                <label
                                    className={styles.half}
                                    htmlFor="star4half"
                                    title="Pretty good - 4.5 stars"/>
                                <input type="radio" id="star4" name="stars" value="4"
                                       onChange={starHandler}/>
                                <label className="full"
                                       htmlFor="star4"
                                       title="Pretty good - 4 stars"/>
                                <input type="radio" id="star3half" name="stars" value="3.5"
                                       onChange={starHandler}/>
                                <label
                                    className={styles.half}
                                    htmlFor="star3half"
                                    title="Meh - 3.5 stars"/>
                                <input type="radio" id="star3" name="stars" value="3"
                                       onChange={starHandler}/>
                                <label className="full"
                                       htmlFor="star3"
                                       title="Meh - 3 stars"/>
                                <input type="radio" id="star2half" name="stars" value="2.5"
                                       onChange={starHandler}/>
                                <label className={styles.half}
                                       htmlFor="star2half"
                                       title="Kinda bad - 2.5 stars"/>
                                <input type="radio" id="star2" name="stars" value="2"
                                       onChange={starHandler}/>
                                <label className="full"
                                       htmlFor="star2"
                                       title="Kinda bad - 2 stars"/>
                                <input type="radio" id="star1half" name="stars" value="1.5"
                                       onChange={starHandler}/>
                                <label
                                    className={styles.half}
                                    htmlFor="star1half"
                                    title="Meh - 1.5 stars"/>
                                <input type="radio" id="star1" name="stars" value="1"
                                       onChange={starHandler}/>
                                <label className="full"
                                       htmlFor="star1"
                                       title="Sucks big time - 1 star"/>
                                <input type="radio" id="starhalf" name="stars" value=".5"
                                       onChange={starHandler}/>
                                <label className={styles.half}
                                       htmlFor="starhalf"
                                       title="Sucks big time - 0.5 stars"/>
                            </fieldset>
                        </div>
                        <div className={styles.reviews__form__group}>
                            <label className={styles.reviews__form__group__label} htmlFor="title">Title</label>
                            <input ref={title} className={styles.reviews__form__group__input} type="text" id="title"
                                   required/>
                        </div>
                        <div className={styles.reviews__form__group}>
                            <label className={styles.reviews__form__group__label} htmlFor="review">Review</label>
                            <textarea ref={review} className={styles.reviews__form__group__input} id="review" rows="5"
                                      required/>
                        </div>
                        <button className={styles.reviews__form__button}>Submit</button>
                    </form> : <p>Please login to leave a review!</p>}
            </div>
        </div>)
}

export default MovieReviews;