import moment from "moment";

const defaultFormat = 'MM-DD-YYYY hh:mm:ss A'
export const DateTimeFormatter = (date, format = defaultFormat) => {
    if (date && moment(date).isValid()) {
        return moment(date).format(format)
    } else {
        return '';
    }

}