import styles from './DisplayTextItem.module.scss';

type Props = {
    headline: string,
    content: string,
    unit: string,
};

export default function DisplayTextItem(props: Props){
    return(
        <div className={styles.wrapper}>
            <div className={styles.headline}>{props.headline}</div>
            <div className={styles.content}>{props.content} {props.unit}</div>
        </div>
    );
}