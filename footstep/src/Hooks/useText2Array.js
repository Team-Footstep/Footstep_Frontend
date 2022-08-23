export const useText2Array = (textSpring) => {
  let textObj1 = {};
  let textObj2 = {};
  const textObj = textSpring.split("$n");
  for(let i = 1; i<=textObj.length-1; i++){
    textObj1[i] = textObj[i].split("$$");
  }
  for (let i = 1; i <= textObj.length-1; i++){
    textObj2[i] = textObj1[i][1].split(",");
    textObj1[i][1] = textObj2[i];
  }
  return textObj1;
}