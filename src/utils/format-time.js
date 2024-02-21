import moment from 'moment';

// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? moment(new Date(date), fm) : '';
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? moment(new Date(date), fm) : '';
}

export function fTimestamp(date) {
  return date ? moment(new Date(date)) : '';
}

export function fToNow(date) {
  const now = moment(new Date());
  return date ? moment.duration(now.diff(date)) : '';
}
