import moment from 'moment';

const getIndexFromValue = (arr: string[], value: string) => arr.indexOf(value);

const dateFormatter = (date: string) => moment(date, 'YYYY-MM-DD').format('MMM-YY');

const dateSetter = (date: string) => moment(date).format('YYYY-MM-DD');

export { dateSetter, dateFormatter, getIndexFromValue };
