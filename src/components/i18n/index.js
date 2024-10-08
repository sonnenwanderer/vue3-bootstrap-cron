import {
    LOCALE_EN, LOCALE_TW,
    WEEK,
    SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY,
} from '../shared/constants';

export default {
    [LOCALE_EN]: {
        field: {
            second: 'Second',
            minute: 'Minute',
            hour: 'Hour',
            date: 'Date',
            month: 'Month',
            week: 'Week',
            year: 'Year',
        },
        fieldAlias: {
            second: 'second',
            minute: 'minute',
            hour: 'hour',
            date: 'date',
            month: 'month',
            week: 'week',
            year: 'year',
        },
        type: {
            empty: 'Empty',
            every: 'Every ',
            unspecific: 'Unspecific',
            range: ['From ', ' to ', ''],
            step: ['Start with ', '，execute every', ''],
            well: ['The ', ''],
            weekday: ['Nearest weekday to the ', ' of current month'],
            lastWeekday: 'Last weekday of current month',
            lastDayOfDate: 'Last day of current month',
            lastDayOfWeek: 'Last ',
            specify: 'Specify',
        },
        [WEEK]: {
            [SUNDAY]: 'Sunday',
            [MONDAY]: 'Monday',
            [TUESDAY]: 'Tuesday',
            [WEDNESDAY]: 'Wednesday',
            [THURSDAY]: 'Thursday',
            [FRIDAY]: 'Friday',
            [SATURDAY]: 'Saturday',
        },
        expression: 'The complete expression',
        preview: ['Last ', ' runtimes'],
        previewError: 'This expression is temporarily unparsed!',
    },
    [LOCALE_TW]: {
        field: {
            second: '秒',
            minute: '分',
            hour: '時',
            date: '日',
            month: '月',
            week: '周',
            year: '年',
        },
        fieldAlias: {
            second: '秒鐘',
            minute: '分鐘',
            hour: '小時',
            date: '天',
            month: '個月',
            week: '星期',
            year: '年',
        },
        type: {
            empty: '不指定',
            every: '每',
            unspecific: '不指定',
            range: ['從', '到', ''],
            step: ['從', '開始，每', '執行一次'],
            well: ['當月第', '個'],
            weekday: ['離當月', '號最近的那個工作日'],
            lastWeekday: '當月最後一個工作日',
            lastDayOfDate: '當月最後一天',
            lastDayOfWeek: '當月最後一个',
            specify: '指定',
        },
        [WEEK]: {
            [SUNDAY]: '星期日',
            [MONDAY]: '星期一',
            [TUESDAY]: '星期二',
            [WEDNESDAY]: '星期三',
            [THURSDAY]: '星期四',
            [FRIDAY]: '星期五',
            [SATURDAY]: '星期六',
        },
        expression: '完整表達式',
        preview: ['下', '次運行時間'],
        previewError: '此表達式暫時無法解析！',
    },
}
