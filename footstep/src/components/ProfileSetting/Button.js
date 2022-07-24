// 버튼 컴포넌트 제작 후 프로필설정 파일로 export할거임
import styles from "../ProfileSetting/Button.module.css";

function Button({ value, differ }) {
  return (
    <div>
      {differ ? (
        <button className={styles.cancle_change}>{value}</button>
      ) : (
        <button className={styles.save_code}>{value}</button>
      )}
    </div>
  );
}

export default Button;
