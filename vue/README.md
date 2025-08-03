# Vue

vite 建構專案

```bash
npm create vite@latest my-vue-app
```

建立 my-vue-app 資料夾
終端機會跟你互動，問妳問題，建立哪種框架? 請選擇 Vue
要不要加上 TypeScript? 先不用

進入專案、安裝 dependencies(依賴)

```bash
cd my-vue-app
npm install
```

啟動伺服器

```bash
npm run dev
```

打包檔案，用於發行正式版

```bash
npm run build
```

打包後會輸出到/dist 資料夾

## 安裝 vue router、pinia

安裝 vue router

```bash
npm install vue-router
```

安裝 pinia

```bash
npm install pinia
```

安裝後，到 main.js 做基本設定

```Javascript
//main.js
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router' // 自己建立 router/index.js

const app = createApp(App);
app.use(createPinia())
app.use(router)
app.mount('#app');

```

建立 `src/router/index.js`

```javascript
//src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [
    {
        path: '/',
        name: Home,
        component: HomeView,
    },
    {
        path: '/about',
        name: About,
        component: () => import('@/views/AboutView.vue'), //(動態載入=懶加載)使用者需要時才載入，減少初次載入時間。
    },
    {
        component: ParentView,
        //子路由path不能加斜線/，會變成絕對路徑(會跳錯)
        children: [
            {
                path: 'child1',
                name: 'Child1',
                component: () => import('@/components/ChildVew1.vue'),
            },
            {
                path: 'child2',
                name: 'Child2',
                component: () => import('@/components/ChildVew2.vue'),,
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
```

### 建立 pinia (所有元件共享資料狀態) 的設定，建立 src/stores/couter.js (必須在 src 資料夾 stores 資料夾)

#### 使用 state、actions 的寫法

```javascript
//使用 state、actions的寫法
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
    state: () => ({
        count: 0,
    }),
    actions: {
        increment() {
            this.count++
        },
    },
})
```

#### 不使用 state、actions，但要匯出才能使用的 pinia

```javascript
//這邊有安裝autoImport套件情況下，不須再寫import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', () => {
    const userEmail = ref('')

    return {
        userEmail,
    }
})
```

## computed 的 get 與 set

get 取回值，set 將值作處理修改吐出去

```js
const formattedTest = computed({
    // getter（取得 formattedTest 的值時）
    get() {
        return modalContent.value?.join('\n') || ''
    },

    // setter（修改 formattedTest 的值時）
    set(newValue) {
        newValue = DOMPurify.sanitize(newValue)
        modalContent.value = newValue
            .split('\n') // 把字串用換行切開變陣列
            .map((item) => item.trim()) // 每一行去頭尾空白
            .filter((line) => line !== '') // 移除空行
    },
})
```

## 原生 JS - 取出物件的 key,value、只取出物件的 value

### Object.entires(物件)，取出 key 與 value

```js
// Object.entires(物件)
const obj = {
    name: 'haha',
    num: 20,
}

const b = Object.entries(obj)
console.log(b) //[["name", "haha"], ["num", 20]]

// 變成處理陣列
for (const [key, value] of Object.entries(obj)) {
    console.log([key, value]) //["name", "haha"] ["num", 20]
}
```

### 只取出物件的值 value

```js
//Object.values(物件)

const obj = {
    name: 'haha',
    num: 20,
}
console.log(Object.values(obj)) // ["haha", 20]
```

#### 借放一下筆記與程式碼

```js

<script setup>
import { ref, reactive, watch, computed } from 'vue';

const editData = reactive({
  input1: '',
  input2: '',
  ck1: false,
  ck2: false
})

const options = reactive([
  { value: '', label: '請選擇' },
  { value: '0', label: '選項0' },
  { value: '1', label: '選項1' },
  { value: '2', label: '選項2' }
]);

watch(() => editData['input1'], (newVal, oldVal) => {
  console.log('input1-value', editData.input1, 'newVal', newVal, 'oldVal,', oldVal);
})

const isOnBtn = computed(() => {
  // 如果前兩個input都沒有值，且兩個checkbox都沒有勾選，就disable btn
  if (editData.input1 == '' && editData.input2 == '' && editData.ck1 !== true && editData.ck2 !== true) {
    // disable btn
    return true;
  } else {
    // 進階判斷 2 的下拉是否為空
    return checkAllSelect();
  }
})

function checkAllSelect() {
  // 若前兩個select為空，鎖定disable btn
  if (editData.input1 == '' || editData.input2 == '') {
    return true; //disable btn
  } else {
    // 若兩個select不為空，檢查是否跟原本開編輯的值一樣?
    // 一樣就disable btn，回傳true


  }

}

</script>
<template>
  <main>
    <div>
      <select name="1" id="1" v-model="editData.input1">
        <option v-for="(item, index) in options" :key="index" :value="item.value">{{ item.label }}</option>
      </select>

      <select name="2" id="2" v-model="editData.input2">
        <option v-for="(item, index) in options" :key="index" :value="item.value">{{ item.label }}</option>
      </select>

      <label for="ck1">
        <input type="checkbox" id="ck1" name="ck1" v-model="editData.ck1">
        <span>開啟</span>
      </label>

      <label for="ck2">
        <input type="checkbox" id="ck2" name="ck2" v-model="editData.ck2">
        <span>上下限比對</span>
      </label>

      <button type="button" :disabled="isOnBtn">儲存</button>
    </div>

  </main>
</template>
<style scoped lang="sass">
main
  padding: 1rem
</style>
```

## 安裝 SASS

```bash
npm install -D sass
```

`-D` 等同 `--save-dev`把他加到開發階段用的相依套件 devDependencies

只在「開發或編譯」階段需要這個套件

最後打包給用戶的時候，不會把 sass 包進去（因為使用者不需要它）

## AutoImport 套件 自動引入 Vue unplugin-auto-import

npm 文章: https://www.npmjs.com/package/unplugin-auto-import/v/0.17.1

### 安裝

`npm i unplugin-auto-import`

### 使用前 unplugin-auto-import 前

```bash
import { computed, ref } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)
```

### 使用後 unplugin-auto-import

```bash
const count = ref(0)
const doubled = computed(() => count.value * 2)
```

### vite.config.js 設置檔

```js
//vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            imports: ['vue'],
            dts: 'src/auto-imports.d.ts', // 自動生成的型別定義檔，建議保留
        }),
    ],
})
```

自動生成的型別定義檔，建議保留，

你即使用 .js 或 .vue 檔案，這個 .d.ts 也能幫 VS Code 做提示。

不會影響專案執行，它只是用來提升 開發體驗。
✅ 1. 自動補全 Vue API
不需要 import { ref } from 'vue'，只要打：

```js
const count = ref(0)
你會自動看到提示：

ref<T>(value: T): Ref<T>

reactive<T extends object>(target: T): UnwrapNestedRefs<T>

computed(() => ...)
```

👉 VS Code 會告訴你這些函數的用途、型別與參數。

✅ 2. 錯誤提示更明確
如果你打錯函數名稱（例如 reff），會立即出現紅線錯誤。
