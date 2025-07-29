# sweetalert2 彈窗套件

## npm 安裝

```bash
npm install sweetalert2
```

## cdn 安裝

[看官網](https://sweetalert2.github.io/)

## 使用方式

可看官網文件 Usage 詳細說明

1.引入 sweetalert2 套件

```js
import Swal from 'sweetalert2'

// or via CommonJS
const Swal = require('sweetalert2')
```

也可選擇 JS、CSS 分開匯入，假如你想要客製化 CSS

```js
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
```

1-1 安裝指定版本的話

```bash
npm install sweetalert2@^11.15.10 --save
```

> 關於 ^11.15.10 的意思
> |符號 |意義|
> |---|---|
> |`^`| 自動更新到 同 major 版本（11.x.x）中最新的版本，例如 11.15.11、11.16.0 等，但不會升級到 12.0.0。|

2. 頁面載入後，再執行 sweetalert2

(DOMContentLoaded 後)

```js
Swal.fire({
    title: 'Error!',
    text: 'Do you want to continue',
    icon: 'error',
    confirmButtonText: 'Cool',
})
```

## 備註

目前使用過的版本 "sweetalert2": "^11.15.10"

搭配  
"vue": "^3.5.13",

"vue-router": "^4.5.0"

"vite": "^6.0.3"
