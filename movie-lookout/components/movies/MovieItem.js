import styles from './MovieItem.module.scss';
import Card from '../ui/Card';

function MovieItem(props) {
    return (
        <div className={styles.movieItem}>
            <Card>
                <div className={styles.image}>
                    <img src={props.image} alt={props.title}/>
                </div>
                <div>
                    <div className={styles.content}>
                        <h3>{props.title}</h3>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default MovieItem;