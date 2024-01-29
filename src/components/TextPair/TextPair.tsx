import styles from './TextPair.module.scss';

type Props = {
    text1: string | number,
    text2: string | number,
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