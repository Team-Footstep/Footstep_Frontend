import ShortCard from "../Card/ShortCard";
import styles from "./SearchProfile.module.css";

function SearchProfile({ contentArr }) {
  return (
    <div id={styles.container}>
      {contentArr.map((item, index) =>
        index % 2 === 1 ? <ShortCard content={item} key={index} /> : null
      )}
    </div>
  );
}

export default SearchProfile;
