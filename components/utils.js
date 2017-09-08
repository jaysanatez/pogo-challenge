import Moment from 'moment'
Moment.locale('en')

const formatStr = 'MMM D, hh:mm a'
export function formatDate(date) {
  return Moment(date).format(formatStr)
} 