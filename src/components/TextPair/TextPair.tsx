import styles from './TextPair.module.scss';

type Props = {
    text1: string,
    text2: string,
    unit: string,
}

export default function TextPair(props: Props){
    return (
        <div className={styles.wrapper}>
            <div className={styles.textitems}>{props.text1}</div>
            <div className={styles.textitems}>{props.text2}</div>
            <div className={styles.textitems}>{props.unit}</div>
        </div>
    );
}