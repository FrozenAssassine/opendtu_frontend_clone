import TextPair from '../TextPair/TextPair';
import styles from './GeneralDisplay.module.scss';
    
type Props = {
    temperature: string,
    lastUpdated: string,
}

export default function GeneralDisplay(props: Props){
    return(
        <div className={styles.wrapper}>
            <TextPair text1='Last Updated' text2={props.lastUpdated} unit=''/>
            <TextPair text1='Temperatur' text2={props.temperature} unit='C°'/>
        </div>
    );
}