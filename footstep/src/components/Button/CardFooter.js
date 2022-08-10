import styles from "./CardFooter.module.css";
import { ReactComponent as ComIcon } from "../../icons/comment-icon.svg";
import { ReactComponent as StmIcon } from "../../icons/stamp-icon.svg";
import { ReactComponent as FootIcon } from "../../icons/footprint-icon.svg";

function CardFooter({ content, color }) {
  return (
    <div className={styles.footer}>
      <div className={styles.comment}>
        <ComIcon fill={color} />
        <span className={styles.cnt} style={{ color: color }}>
          {content.commentNum}
        </span>
      </div>
      <div className={styles.stamp}>
        <StmIcon fill={color} />
        <span className={styles.cnt} style={{ color: color }}>
          {content.stampNum}
        </span>
      </div>
      <div className={styles.footprint}>
        <FootIcon fill={color} />
        <span className={styles.cnt} style={{ color: color }}>
          {content.footprintNum}
        </span>
      </div>
    </div>
  );
}

export default CardFooter;
