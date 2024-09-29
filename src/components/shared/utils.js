import { WEEKS, WEEK, WEEK_INDEX_REGEXP, WEEK_LETTER_REGEXP } from '../shared/constants';
import I18n from '../i18n/index';

/**
 * 生成指定數組.
 *
 * @param min - 區間最小值.
 * @param max - 區間最大值.
 * @param labels - 顯示名稱.
 */
export function generateSpecifies(min, max, labels) {
    const specifies = [];

    let index = 0;

    for (let specify = min; specify <= max; specify += 1) {
        specifies.push({ value: specify, label: labels ? labels[index] : specify.toString() });
        index += 1;
    }

    return specifies;
}

/**
 * 日期時間欄位補零.
 *
 * @param value - 待補零處理的數字.
 */
export function zerofill(value) {
    const prefix = (value < 10) ? '0' : '';

    return `${prefix}${value}`;
}

/**
 * 轉換星期數字為縮寫.
 *
 * @param value - .
 */
export function weekNumberToLetter(value) {
    return value.replace(WEEK_INDEX_REGEXP, value => WEEKS.find(({ index }) => [index].includes(value))?.abbr || value);
}

/**
 * 轉換星期縮寫為數字.
 *
 * @param value - .
 */
export function weekLetterToNumber(value) {
    return value.replace(WEEK_LETTER_REGEXP, value => WEEKS.find(({ abbr }) => abbr === value)?.index || value);
}

/**
 * 星期欄位的 <a-input-number> 組件 formatter 函數.
 *
 * @param value - .
 * @param locale - 國際化欄位.
 */
export function formatterWeek(value, locale) {
    const day = WEEKS.find(({ index }) => index === value)?.value;

    return I18n[locale][WEEK][day];
}

/**
 * 星期欄位的 <a-input-number> 組件 parser 函数.
 *
 * @param value - .
 * @param locale - 國際化欄位.
 */
export function parserWeek(value, locale) {
    const [key] = Object.entries(I18n[locale][WEEK]).find(([, val]) => val === value);

    return WEEKS.findIndex(({ value }) => value === key);
}
