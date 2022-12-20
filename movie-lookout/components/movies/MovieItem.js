import Card from './ui/Card';
import styles from './MovieItem.module.scss';

function MovieItem(props) {
    return (
        <Card>
            <div className={styles.movie}>
                <img src={props.image} alt={props.title} />
                <div className={styles.movie__info}>
                    <h3>{props.title}</h3>
                    <p>{props.description}</p>
                </div>
            </div>
        </Card>
    );
}
