<template>
    <div class="cron-wrapper" :style="{ width }">
        <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item" v-for="field in fields" :key="field.value">
                <a
                    class="nav-link"
                    :class="{ active: activeKey === field.value }"
                    @click="activeKey = field.value"
                    href="#"
                    v-if="field.value !== 'year'"
                > <!--不顯示年/year頁籤-->
                    {{ field.label }}
                </a>
            </li>
        </ul>
        <div class="tab-content">
            <div
                class="tab-pane fade"
                :class="{ show: activeKey === field.value, active: activeKey === field.value }"
                v-for="field in fields"
                :key="field.value"
            >
                <CronBase v-model="cron[field.value]" :field="field" :locale="locale" />
            </div>
        </div>
        <div class="expression">
            <div class="title">
                <span class="label">{{ expressionLabel }}</span>
            </div>
            <span class="content">{{ expression }}</span>
        </div>
        <div class="preview">
            <div class="title">
                <span class="label">{{ previewLabel }}</span>
            </div>
            <ul class="list">
                <li v-for="preview in previews" :key="preview">{{ preview }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import cronParser from 'cron-parser';
import { FIELDS, TYPE, DEFAULT_CRON_EXPRESSION, DEFAULT_LOCALE, LOCALE_TW } from './shared/constants';
import { zerofill, weekNumberToLetter } from './shared/utils';
import I18n from './i18n/index';
import CronBase from './_Internal/CronBase.vue';

export default {
    name: 'Vue3Cron',
    components: {
        CronBase,
    },
    props: {
        modelValue: {
            type: String,
            default: DEFAULT_CRON_EXPRESSION,
        },
        locale: {
            type: String,
            default: DEFAULT_LOCALE,
        },
    },
    emits: ['update:modelValue'],
    data() {
        //只解析初始化DOM時的DEFAULT_CRON_EXPRESSION值
        let [second, minute, hour, date, month, week, year = ''] = this.modelValue.split(' ');

        return {
            //設定預設顯示的tab，FIELDS[0].value為'秒'，FIELDS[!].value為'分'...
            activeKey: FIELDS[0].value,
            cron: { second, minute, hour, date, month, week, year },
            previewTime: 3, //最近幾次的執行時間
        };
    },
    computed: {
        width() {
            return (this.locale === LOCALE_TW) ? '468px' : '516px'; //中文介面寬度468px，英文介面寬度516px
        },
        fields() {
            return FIELDS.map(field => {
                const label = I18n[this.locale].field[field.value];

                return { ...field, label };
            });
        },
        expressionLabel() {
            return I18n[this.locale].expression;
        },
        previewLabel() {
            return I18n[this.locale].preview.join(this.previewTime);
        },
        expression() {
            return Object.values(this.cron).join(' ');
        },
        previews() {
            let previews = [];

            try {
                const interval = cronParser.parseExpression(this.expression);

                for(let i = 0; i < this.previewTime; i += 1) {
                    const datetime = interval.next();
                    const year = zerofill(datetime.getFullYear());
                    const month = zerofill(datetime.getMonth() + 1);
                    const date = zerofill(datetime.getDate());
                    const hour = zerofill(datetime.getHours());
                    const minute = zerofill(datetime.getMinutes());
                    const second = zerofill(datetime.getSeconds());

                    previews.push(`${year}-${month}-${date} ${hour}:${minute}:${second}`);
                }
            } catch(error) {
                previews = ['此表達式暫時無法解析！'];
            }

            return previews;
        },
    },
    watch: {
        //監看modelValue值變化，即時反映在圖形化介面上
        modelValue: {
            handler(value) {
                let [second, minute, hour, date, month, week, year = ''] = value.split(' ');
                this.cron = {second, minute, hour, date, month, week, year}
            },
            deep: true,
        },
        cron: {
            handler(value) {
                //根據後端response，星期是用數字0-7顯示
                //如需要將數字轉為星期文字縮寫則拿掉下面這段註解
                //imoport {weekNumberToLetter} from ./share/utils
                //value.week = weekNumberToLetter(value.week);
                this.$emit('update:modelValue', Object.values(value).join(' '));
            },
            deep: true,
        },
        'cron.date': {
            handler(value) {
                if (value === TYPE.UNSPECIFIC) {
                    if (this.cron.week === TYPE.UNSPECIFIC) {
                        this.cron.week = TYPE.EVERY;
                    }
                } else {
                    if (this.cron.week !== TYPE.UNSPECIFIC) {
                        this.cron.week = TYPE.UNSPECIFIC;
                    }
                }
            },
        },
        'cron.week': {
            handler(value) {
                if (value === TYPE.UNSPECIFIC) {
                    if (this.cron.date === TYPE.UNSPECIFIC) {
                        this.cron.date = TYPE.EVERY;
                    }
                } else {
                    if (this.cron.date !== TYPE.UNSPECIFIC) {
                        this.cron.date = TYPE.UNSPECIFIC;
                    }
                }
            },
        },
    },
}
</script>

<style scoped>
.nav.nav-tabs {
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 3px;
}

.nav.nav-tabs .nav-item {
    margin-top: -1px;
    margin-left: -1px;
    background-color: #fafafa;
}

.expression, .preview {
    margin: 32px 0;
    padding: 16px;
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 3px;
}

.expression .title, .preview .title {
    display: flex;
    justify-content: center;
    margin-top: -28px;
}

.expression .label, .preview .label {
    padding: 0 16px;
    background-color: #ffffff;
}

.preview .list {
    margin-bottom: 0;
    padding-left: 16px;
}
</style>
