import React from "react";

function useReduceToSingleArrayById (originalArray, updateArray, idName) {
  const originalArrayKey = originalArray.map(element => element[idName]);
  const updateArrayKey = updateArray.map(element => element[idName]);
  const commonKeyArray = originalArrayKey.filter(element => updateArrayKey.includes(element) ? element : null);
  const newKeyArray = updateArrayKey.filter(element => !originalArrayKey.includes(element) ? element : null);
  const addedArray = updateArray.filter(obj => newKeyArray.includes(obj[idName]) ? obj : null);
  let newArray = originalArray.map(obj => {
    if (commonKeyArray.includes(obj[idName])) {
      return updateArray.filter(element => element[COMMENT_ID] === obj[COMMENT_ID])[0];
    } else {
      return obj;
    };
  })
  const setArray = new Set(newArray.concat(addedArray));
  const finalArray = [...setArray];
  return finalArray;
};

export default useReduceToSingleArrayById;