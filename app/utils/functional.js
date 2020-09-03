import moment from 'moment';
import config from '../config';
const countDownTime = (date, format) => {
  const then = moment(date, format);
  const now = moment();
  const countdown = moment(then - now);
  const days = countdown.format('D');
  const hours = countdown.format('HH');
  const minutes = countdown.format('mm');
  const seconds = countdown.format('ss');
  return {
    days,
    hours,
    minutes,
    seconds,
  };
};
const getImageUrl = (url = '') => {
  if (url[0] === '/') {
    return `${config.BASE_URL}${url}`;
  }
  return url;
};
export const Funtional = { countDownTime, getImageUrl };
