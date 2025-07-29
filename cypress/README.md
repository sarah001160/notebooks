# Cypress 筆記

資料夾架構(安裝 cypress 自動生成)，架構必須這樣。

![alt text](./images/image.png)

## 安裝 Cypress

```bash
npm install cypress --save-dev
```

或者使用 yarn：

```bash
yarn add cypress --dev
```

## 開啟 Cypress GUI 測試介面（第一次使用會自動建立相關資料夾）

```bash
npx cypress open
```

它會自動建立一個 `cypress/` 資料夾和 `cypress.config.js` 設定檔。

你可以在這個 `GUI` 裡選擇 `E2E` 或 `Component` 測試模式。

## 啟用 E2E 測試（終端端測試）

如果你選擇的是 `E2E（End-to-End）`，`Cypres`s` 會建立這個資料夾結構：

```bash
cypress/
└─ e2e/
└─ sample.cy.js # 範例測試檔案
cypress.config.js # 設定檔
```

你可以自己新增測試檔：

```bash
touch cypress/e2e/my-test.cy.js
```

## 編寫第一個測試範例（my-test.cy.js）

```js
describe('首頁測試', () => {
    it('可以成功載入首頁', () => {
        cy.visit('url') // 你的專案網址
        cy.contains('歡迎') // 假設頁面上有"歡迎"字樣
    })
})
```

## 執行測試（兩種方式）

GUI 模式：

```bash
npx cypress open
```

CLI 模式（非圖形介面，自動跑完並關閉）：

```bash
npx cypress run
```

## 額外小技巧

修改預設開啟的 `baseUrl`，可以在 `cypress.config.js` 裡加：

```js
const { defineConfig } = require('cypress')

module.exports = defineConfig({
    e2e: {
        baseUrl: 'url網址',
    },
})
```

可以設定瀏覽器：

```bash
npx cypress run --browser chrome
```
