<template>
    <div class="radio-group">
        <div class="form-check" v-if="isEmpty">
            <input class="form-check-input" type="radio" v-model="type" :value="TYPE.EMPTY" id="empty">
            <label class="form-check-label" for="empty">{{ label.empty }}</label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" v-model="type" :value="TYPE.EVERY" id="every">
            <label class="form-check-label" for="every">{{ label.every }}</label>
        </div>
        <div class="form-check" v-if="isUnspecific">
            <input class="form-check-input" type="radio" v-model="type" :value="TYPE.UNSPECIFIC" id="unspecific">
            <label class="form-check-label" for="unspecific">{{ label.unspecific }}</label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" v-model="type" :value="TYPE.RANGE" id="range">
            <label class="form-check-label" for="range">
                {{ label.range[0] }}
                <input type="number" v-model="range[0]" :min="rangeStart[0]" :max="rangeStart[1]" @change="onRangeStartChange">
                {{ label.range[1] }}
                <input type="number" v-model="range[1]" :min="rangeEnd[0]" :max="rangeEnd[1]">
                {{ label.range[2] }}
            </label>
        </div>
        <div class="form-check" v-if="isStep">
            <input class="form-check-input" type="radio" v-model="type" :value="TYPE.STEP" id="step">
            <label class="form-check-label" for="step">
                {{ label.step[0] }}
                <input type="number" v-model="step[0]" :min="stepLeft[0]" :max="stepLeft[1]">
                {{ label.step[1] }}
                <input type="number" v-model="step[1]" :min="stepRight[0]" :max="stepRight[1]">
                {{ label.step[2] }}
            </label>
        </div>
        <div class="form-check" v-if="isWell">
            <input class="form-check-input" type="radio" v-model="type" :value="TYPE.WELL" id="well">
            <label class="form-check-label" for="well">
                {{ label.well[0] }}
                <input type="number" v-model="well[1]" :min="wellLeft[0]" :max="wellLeft[1]">
                {{ label.well[1] }}
                <input type="number" v-model="well[0]" :min="wellRight[0]" :max="wellRight[1]">
            </label>
        </div>
        <div class="form-check" v-if="isWeekday">
            <input class="form-check-input" type="radio" v-model="type" :value="TYPE.WEEKDAY" id="weekday">
            <label class="form-check-label" for="weekday">
                {{ label.weekday[0] }}
                <input type="number" v-model="weekday" :min="rangeStart[0]" :max="rangeStart[1]">
                {{ label.weekday[1] }}
            </label>
        </div>
        <div class="form-check" v-if="isLastWeekday">
            <input class="form-check-input" type="radio" v-model="type" :value="TYPE.LAST_WEEKDAY" id="lastWeekday">
            <label class="form-check-label" for="lastWeekday">{{ label.lastWeekday }}</label>
        </div>
        <div class="form-check" v-if="isLastDayOfDate">
            <input class="form-check-input" type="radio" v-model="type" :value="TYPE.LAST_DAY" id="lastDayOfDate">
            <label class="form-check-label" for="lastDayOfDate">{{ label.lastDayOfDate }}</label>
        </div>
        <div class="form-check" v-if="isLastDayOfWeek">
            <input class="form-check-input" type="radio" v-model="type" :value="TYPE.LAST_DAY" id="lastDayOfWeek">
            <label class="form-check-label" for="lastDayOfWeek">
                {{ label.lastDayOfWeek }}
                <input type="number" v-model="lastDayOfWeek" min="0" max="6">
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" v-model="type" :value="TYPE.SPECIFY" id="specify">
            <label class="form-check-label" for="specify">
                <div>{{ label.specify }}</div>
                <span class="form-check form-check-inline" v-for="(option, index) in specifies" :key="index">
                    <input class="form-check-input" type="checkbox" v-model="specify" :value="option.value" @change="onCheckboxGroupChange">
                    <label class="form-check-label">{{ formatLabel(option.label) }}</label>
                </span>
            </label>
        </div>
    </div>
</template>

<script>
import { DATE, WEEK, YEAR, TYPE, DEFAULT_LOCALE, LOCALE_EN } from '../shared/constants';
import { generateSpecifies, weekLetterToNumber } from '../shared/utils';

import I18n from '../i18n/index';

import InputNumber from './InputNumber.vue';

export default {
    components: {
        InputNumber,
    },
    props: {
        modelValue: String,
        field: {
            value: String,
            label: String,
            min: Number,
            max: Number,
        },
        locale: {
            type: String,
            default: DEFAULT_LOCALE,
        },
    },
    emits: ['update:modelValue'],
    data() {
        const { min, max, value } = this.field;

        const labels = I18n[this.locale][value] ? Object.values(I18n[this.locale][value]) : null;
        const specifies = generateSpecifies(min, max, labels);

        let wellLeft, wellRight;

        if (value === WEEK) {
            wellLeft = [1, 5];
            wellRight = [min, max];
        }

        return {
            TYPE,
            type: TYPE.EVERY,
            range: [min, min + 1],
            step: [min, 1],
            well: [min, 1],
            specify: [],
            weekday: 1,
            lastDayOfWeek: 0,
            rangeStart: [min, max - 1],
            stepLeft: [min, max],
            stepRight: [1, max],
            wellLeft,
            wellRight,
            specifies,
        };
    },
    computed: {
        label() {
            const { type, fieldAlias } = I18n[this.locale];

            return {
                empty: type.empty,
                every: `${type.every}${fieldAlias[this.field.value]}`,
                unspecific: type.unspecific,
                range: [
                    type.range[0],
                    ((this.field.value === WEEK || this.locale === LOCALE_EN) ? '' : this.field.label) + type.range[1],
                    (this.field.value === WEEK || this.locale === LOCALE_EN) ? '' : this.field.label,
                ],
                step: [
                    type.step[0],
                    this.field.label + type.step[1],
                    fieldAlias[this.field.value] + type.step[2],
                ],
                well: type.well,
                weekday: type.weekday,
                lastWeekday: type.lastWeekday,
                lastDayOfDate: type.lastDayOfDate,
                lastDayOfWeek: type.lastDayOfWeek,
                specify: type.specify,
            };
        },
        isEnWeek() {
            return this.field.value === WEEK && this.locale === LOCALE_EN;
        },
        rangeEnd() {
            return [this.range[0] + 1, this.field.max];
        },
        isEmpty() {
            return this.field.value === YEAR;
        },
        isUnspecific() {
            return [DATE, WEEK].includes(this.field.value);
        },
        isStep() {
            return this.field.value !== WEEK;
        },
        isWell() {
            return this.field.value === WEEK;
        },
        isLastDayOfDate() {
            return this.field.value === DATE;
        },
        isLastDayOfWeek() {
            return this.field.value === WEEK;
        },
        isWeekday() {
            return this.field.value === DATE;
        },
        isLastWeekday() {
            return this.field.value === DATE;
        },
        value() {
            switch (this.type) {
                case TYPE.EMPTY:
                case TYPE.UNSPECIFIC:
                case TYPE.LAST_WEEKDAY:
                case TYPE.EVERY:
                    return this.type;
                case TYPE.RANGE:
                    return this.range.join(this.type);
                case TYPE.STEP:
                    return this.step.join(this.type);
                case TYPE.WELL:
                    return this.well.join(this.type);
                case TYPE.WEEKDAY:
                    return `${this.weekday}${this.type}`;
                case TYPE.LAST_DAY:
                    return (this.field.value === DATE) ? this.type : `${this.lastDayOfWeek}${this.type}`;
                case TYPE.SPECIFY: {
                    const toSpecify = this.specify
                    return toSpecify.length ? toSpecify.sort((a, b) => a - b).join(this.type) : `${this.specifies[0].value}`;
                }
                default:
                    return '';
            }
        },
    },
    watch: {
        modelValue: {
            handler(modelValue) {
                let value = modelValue;

                if (this.field.value === WEEK) {
                    value = weekLetterToNumber(value).replaceAll('7', '0');
                }

                if ([TYPE.EMPTY, TYPE.UNSPECIFIC, TYPE.LAST_DAY, TYPE.LAST_WEEKDAY, TYPE.EVERY].includes(value)) {
                    this.type = value;
                } else if (value.includes(TYPE.RANGE)) {
                    this.type = TYPE.RANGE;
                    this.range = value.split(TYPE.RANGE).map(i => parseInt(i));
                } else if (value.includes(TYPE.STEP)) {
                    this.type = TYPE.STEP;
                    this.step = value.split(TYPE.STEP).map(i => parseInt(i));
                } else if (value.includes(TYPE.WELL)) {
                    this.type = TYPE.WELL;
                    this.well = value.split(TYPE.WELL).map(i => parseInt(i));
                } else if (value.includes(TYPE.WEEKDAY)) {
                    this.type = TYPE.WEEKDAY;
                    this.weekday = parseInt(value);
                } else if (value.includes(TYPE.LAST_DAY)) {
                    this.type = TYPE.LAST_DAY;
                    this.lastDayOfWeek = parseInt(value);
                } else {
                    this.type = TYPE.SPECIFY;
                    this.specify = value.split(TYPE.SPECIFY).map(i => parseInt(i));
                }
            },
            immediate: true,
        },
        value: {
            handler(value) {
                this.$emit('update:modelValue', value);
            },
            deep: true,
        },
        type: {
            handler(type){
                console.log(type)
                this.clearCheckedItems()
            }
        }
    },
    methods: {
        onRangeStartChange(value) {
            const [, rangeEnd] = this.range;

            if (value >= rangeEnd) {
                this.range[1] = value + 1;
            }
        },
        onCheckboxGroupChange(value) {
            let type = TYPE.SPECIFY;

            if (value.length === 0) {
                type = (this.field.value === YEAR) ? TYPE.EMPTY : TYPE.EVERY;
            }

            this.type = type;
        },
        formatLabel(label) {    //在<10的數字前補0
        return label < 10 ? `0${label}` : label;
        },
        clearCheckedItems() {   //切換時把選中的checkbox清空
            this.specify = []
        },
    }
}
</script>

<style scoped>
.form-check {
    margin-top: 6px;
}
</style>