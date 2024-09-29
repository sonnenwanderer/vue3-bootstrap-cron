<template>
    <div class="input-group input-group-sm">
        <input
            type="number"
            class="form-control"
            v-model="value"
            :min="range[0]"
            :max="range[1]"
            @input="onInput"
            @change="onChange"
        />
    </div>
</template>

<script>
import { WEEK } from '../shared/constants';
import { formatterWeek, parserWeek } from '../shared/utils';

export default {
    props: {
        modelValue: [Number, String],
        range: {
            required: true,
            type: Array,
        },
        fieldValue: String,
        locale: {
            type: String,
        },
    },
    emits: ['update:modelValue', 'change'],
    computed: {
        value: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit('update:modelValue', value);
            },
        },
    },
    methods: {
        onInput(event) {
            let value = event.target.value;
            if (this.fieldValue === WEEK) {
                value = formatterWeek(value, this.locale);
            }
            this.$emit('update:modelValue', value);
        },
        onChange(event) {
            let value = event.target.value;
            if (this.fieldValue === WEEK) {
                value = parserWeek(value, this.locale);
            }
            this.$emit('change', value);
        },
    },
}
</script>
