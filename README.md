# vue3-bootstrap-cron

Vue3 的 Crontab GUI 組件，依賴BootStrap5、cron-parser，支援解析/反解析 Crontab 表達式，生成最近3次的執行時間。  
  
改善項目：去除對element-plus等組件的依賴，避免CICD耗時過久  
  
注意事項：  
1. 手動輸入cron表達式時須注意檢核內容，若輸入錯誤格式的crontab可能導致GUI崩潰  
2. Cron.vue組件中可以透過v-if來指定隱藏頁籤，並將activeKey: FIELDS[0].value改為  
   指定的起始頁籤，例如隱藏'秒'頁籤，則activeKey: FIELDS[1].value  
   如此即使可點開時顯示分  
3. 目前僅支持英文/繁中，預設繁中，可自行在components/i18n/index.js添加對應語言  
4. CronView.vue為使用範例，可將其嵌入modal中使用  
   
## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
