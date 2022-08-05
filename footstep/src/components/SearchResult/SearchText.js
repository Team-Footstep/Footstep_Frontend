import SearchCard from "../SearchCard/SearchCard";
import styles from "./SearchText.module.css";

function SearchText({ contentArr }) {
    return (
        <div id={styles.container}>
            <p id={styles.result_cnt}>
                검색결과 (<span>{contentArr.length}</span>)
            </p>
            {contentArr.map((item, index) => (
                <SearchCard content={item} key={index} />
            ))}
        </div>
    );
}

export default SearchText;
