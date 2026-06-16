import {List} from "../widgets/list";
import {useState} from "react";
import styles from './styles.module.css';

export const MainPage = () => {
    const [showSecondList, setShowSecondList] = useState(false);

    return (
        <div className={styles.mainPage}>
            <List/>
            <div className={styles.secondList}>
                <button onClick={() => setShowSecondList(!showSecondList)}>Показать список</button>
                {showSecondList && <List/>}
            </div>
        </div>
    )
}