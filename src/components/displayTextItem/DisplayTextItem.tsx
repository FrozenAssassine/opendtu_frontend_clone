import styles from './DisplayTextItem.module.scss';

type Props = {
    headline: string,
    content: { v: number; u: string; d: number } | undefined;
};

export default function DisplayTextItem(props: Props){
    return(
        <div className={styles.wrapper}>
            <div className={styles.headline}>{props.headline}</div>
            <div className={styles.content}>{props.content?.v.toFixed(2)} {props.content?.u}</div>
        </div>
    );
}