import { ReactNode, useState } from "react";
import styles from "./NavigationBar.module.scss";

type Props = {
    items: NavigationBarItem[];
    activePage: NavigationBarItem;
};

export class NavigationBarItem {
    constructor(public headline: string, public buttonText: string, public url: string, public page: ReactNode) {}
}

export default function NavigationBar({ items, activePage }: Props) {
    const [currentItem, setCurrentItem] = useState<NavigationBarItem>(activePage);

    const handleButtonClick = (item: NavigationBarItem) => {
        setCurrentItem(item);
    };

    return (
        <div>
            <div className={styles.navigationBar}>
                <div className={styles.navigationHeadline}>{currentItem?.headline}</div>
                <div className={styles.navBarButtons}>
                    {items.map((item, i) => (
                        <a href={item.url} key={i} onClick={() => handleButtonClick(item)} className={styles.navigationBarButton}>
                            {item.buttonText}
                        </a>
                    ))}
                </div>
            </div>
            <div className={styles.pageDisplay}>{currentItem?.page}</div>
        </div>
    );
}
