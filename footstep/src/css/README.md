# css 파일이 추가되는 폴더입니다.
- css 파일을 추가하실 때, 연결된 컴포넌트와 같은 이름으로 작성해주시고, 이름은 아래와 같이 작성해주세요.

---
컴포넌트이름.module.css
---

- css 파일을 import할 때, 컴포넌트.js에 아래와 같이 import해주세요.

---
import styles from "css 파일의 상대 위치";
---

- css 파일과 componant의 class를 연결할 때, 아래와 같이 작성해주세요.

---
<!-- 
function Button(){
  return <button className={styles.btn}>버튼이름</button>
} 
-->
---

## reset.css
모든 픽셀 단위를 10px -> 1rem, 5px -> 0.5rem 과 같은 형태로 작성해주세요.

## styled-components
아래와 같이 스타일을 정의합니다.
---
const 컴포넌트 이름 = style.div`
  css 코드
  예)
  body {
    background-color:white;
  }
`;
---

## variables.css
css에서 색을 정의할 때 아래와 같이 정의합니다.
예)
body {
  background-color: var(--white);
}

