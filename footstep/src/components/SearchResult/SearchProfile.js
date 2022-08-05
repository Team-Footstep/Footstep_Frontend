import ShortCard from "../Card/ShortCard";
import styles from "./SearchProfile.module.css";

function SearchProfile({ contentArr }) {
    return (
        <div id={styles.container}>
            {contentArr.map((item, index) => (
                <ShortCard content={item} key={index} />
            ))}
        </div>
    );
}

export default SearchProfile;
