<template>
    <div class="wrapper">
        <div>
            <button type="button" class="btn btn-outline-primary" @click="openCronModal">點擊打開Crontab Modal</button>
        </div>
        <div class="modal fade" id="myModal" data-bs-backdrop="static" data-bs-keyboard="false">
            <div class="modal-dialog">
                <div class="modal-content" :style="{ width: modalWidth + 'px' }"> <!-- Dynamic width -->
                    <div class="modal-header">
                        <h5 class="modal-title">Crontab參數編輯</h5>
                        <button class="btn btn-primary swicth-button" @click="onSwitch">{{ buttonLocale }}</button>
                        <button type="button" class="btn-close" data-bs-target="#myModal" data-bs-toggle="modal"
                            data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <Cron ref="cronComponent" v-model="expression" :locale="locale" />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">關閉</button>
                    </div>
                </div>
            </div>
        </div>
        <img src="../../assets/crontab.png" width="600" />
        <h5>各欄位可使用的萬用字元表：</h5>
        <div>
            <table class="table table-bordered cronTable" cellpadding="0" cellspacing="0" width="65%" border="2">
                <thead>
                    <tr>
                        <th>Field</th>
                        <th>Required</th>
                        <th>Value range</th>
                        <th>Allowed wildcard</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Second</td>
                        <td>Yes</td>
                        <td>0-59</td>
                        <td>, - * /</td>
                    </tr>
                    <tr>
                        <td>Minute</td>
                        <td>Yes</td>
                        <td>0-59</td>
                        <td>, - * /</td>
                    </tr>
                    <tr>
                        <td>Hour</td>
                        <td>Yes</td>
                        <td>0-23</td>
                        <td>, - * /</td>
                    </tr>
                    <tr>
                        <td>Date</td>
                        <td>Yes</td>
                        <td>1-31</td>
                        <td>, - * / L W</td>
                    </tr>
                    <tr>
                        <td>Month</td>
                        <td>Yes</td>
                        <td>1-12</td>
                        <td>, - * /</td>
                    </tr>
                    <tr>
                        <td>Week</td>
                        <td>Yes</td>
                        <td>0-7 or SUN-SAT</td>
                        <td>, - * / L #</td>
                    </tr>
                    <tr>
                        <td>Year</td>
                        <td>No</td>
                        <td>currentYear-2099</td>
                        <td>, - * /</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <table class="table table-bordered cronTable">
                <thead>
                    <tr>
                        <th>*要點：</th>
                        <th>週與日月不可同時並存。</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Your regular table rows here -->
                    <tr>
                        <td colspan="4">
                            例如：工作排程：0 30 12 16 9 5 root echo "just test"<br />
                            這是錯誤的寫法，本意為 9月16號且為星期五才會進行這項工作，<br />
                            系統卻會判定每個星期五做一次，或每年的 9月11號分別進行。<br />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect, computed, onMounted, nextTick } from 'vue';
import Cron from '@/components/Cron.vue';
import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Locale and Expression tracking
const expression = ref('0 0 10 * * ?');
const locale = ref('tw');
var myModal = ''

// Modal width state
const modalWidth = ref(600); // Default width

// Watch for locale changes and update the modal width based on the <Cron> width
const cronComponent = ref(null);

function updateModalWidth() {
    nextTick(() => {
        const cronEl = cronComponent.value?.$el; // Access the actual DOM element of the Cron component
        if (cronEl) {
            modalWidth.value = cronEl.offsetWidth + 50; // Adjust modal width based on Cron width
        }
    });
}

watchEffect(() => {
    console.log('App watchEffect expression: ', expression.value);
});

watchEffect(() => {
    console.log('App watchEffect locale: ', locale.value);
});

// Watch for locale changes and call the function to update modal width
watchEffect(() => {
    updateModalWidth(); // Update when the locale changes
});

const buttonLocale = computed(() => {
    if (locale.value === 'tw')
        return '中文'
    else
        return '英文'
})

function openCronModal() {
    myModal = new bootstrap.Modal(document.getElementById('myModal'))
    myModal.show()

    // Ensure the modal width is updated after it's fully shown
    const modalEl = document.getElementById('myModal');
    modalEl.addEventListener('shown.bs.modal', () => {
        updateModalWidth(); // Update the width once the modal is fully shown
    });
}

// Switch between locales
function onSwitch() {
    locale.value = locale.value === 'tw' ? 'en' : 'tw';
    updateModalWidth(); // Ensure the modal resizes after switching
}

// Ensure the modal width is set on initial mount
onMounted(() => {
    updateModalWidth(); // Initialize width
});
</script>

<style>
.wrapper {
    padding: 100px;
    padding-top: 20px;
}

/* Smooth transition for width change */
.modal-content {
    width: 600px;
    transition: width 0.3s ease;
}
</style>
