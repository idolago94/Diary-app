import moment from 'moment';
import 'moment/locale/he';

export const getShortDate = date => `${new Date(date).getDate()}/${new Date(date).getMonth()+1}`

export const timeLeft = date => moment(date).endOf('day').fromNow();

export const getFullDate = date => `${moment(date).format('L')} ${moment(date).format('LT')}`;
