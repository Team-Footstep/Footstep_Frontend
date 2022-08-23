import React, { useState } from "react";
import moment from 'moment';
import 'moment/locale/ko';

function useRelativeTime (timeInput) {
  const thisTime = {
    year : timeInput.substr(0, 4),
    month : timeInput.substr(5, 2),
    date : timeInput.substr(8, 2),
    hour : timeInput.substr(11, 2),
    minute : timeInput.substr(14, 2),
  };
  const nowDate = new Date(moment().format('YYYY-MM-DD HH:mm'));
  const thisDate = new Date(timeInput);
  const elapsedMSec = nowDate.getTime() - thisDate.getTime();
  const elapsedMin = elapsedMSec / 1000 / 60;
  const elapsedHour = elapsedMSec / 1000 / 60 / 60;
  const elapsedDay = elapsedMSec / 1000 / 60 / 60 / 24;
  let timeOutput;
  if (elapsedDay > 365) {
    timeOutput = `${thisTime.year}년 ${thisTime.month}월`;
  } else if (elapsedDay > 5 && elapsedDay <=365) {
    timeOutput = `${thisTime.month}월 ${thisTime.date}일`;
  } else if (elapsedDay <= 5 && elapsedDay >= 1) {
    timeOutput =`${Math.floor(elapsedDay)}일 전`;
  } else if (elapsedHour >= 1 && elapsedHour <= 24){
    timeOutput =`${Math.floor(elapsedHour)}시간 전`;
  } else if (elapsedMin <= 60 && elapsedMin > 3) {
    timeOutput =`${Math.floor(elapsedMin)}분 전`;
  } else if (elapsedMin <= 3) {
    timeOutput ="방금 전";
  };
  return timeOutput;
};

export default useRelativeTime;