import styles from './AuthAlert.module.scss';

const AuthAlert = (props) => {
    return (
        <div className={styles.alert}>
            <p className={styles.alert__text}>{props.message}</p>
        </div>
    )
}

export default AuthAlert;