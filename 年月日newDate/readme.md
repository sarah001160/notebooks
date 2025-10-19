## 取得今日

```
const today = new Date();
console.log(today)
```

## 取得某個月份有幾天

new Date(year, month, day)

`year`: 年份

`month`: 月份（0-11，0 是 1 月，11 是 12 月）

`day`: 日期（1-31）`

當 day 設為 0，表示上個月分的最後一天

假設現在是 2024 年 10 月（currentMonth = 9，因為月份從 0 開始)

```js
let today = new Date()
let currentMonth = today.getMonth() // 9 (10月)
// currentMonth +1 =10 (11月)
const currentYear = today.getFullYear()
new Date(2024, 10, 0)
// 2024年11月第0天
// 等同10月的最後一天
const daysInMonth = new Date(year, month + 1, 0).getDate()
// 結果31，10月有31天
```

```js
new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
```
