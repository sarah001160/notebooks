# 陣列處理

## 會改變原始陣列 (Mutator Methods)

```js
const array = []
```

| 方法        | 說明                       | 範例                                 |
| :---------- | :------------------------- | :----------------------------------- |
| `push()`    | 從 **尾端** 新增元素       | `array.push(3)`                      |
| `pop()`     | 移除 **最後一個** 元素     | `array.pop()`                        |
| `unshift()` | 從 **前端** 新增元素       | `array.unshift(0)`                   |
| `shift()`   | 移除 **第一個** 元素       | `array.shift()`                      |
| `splice()`  | **增、刪、改** 萬用工具    | `array.splice(索引, 刪除數, 新增值)` |
| `sort()`    | 排序 (預設為 Unicode 排序) | `array.sort((a, b) => a - b)`        |
| `reverse()` | 反轉陣列順序               | `array.reverse()`                    |
| `fill()`    | 區間內填滿指定值           | `array.fill('x', 1, 3)`              |

---

## 回傳新資料：不改動原陣列

### 1. 產生新陣列 (最常用)

- **`map()`**：遍歷每個元素並加工，回傳一個 **長度相同** 的新陣列。
- **`filter()`**：回傳所有符合條件的元素，組成 **長度可能較短** 的新陣列。
- **`slice(start, end)`**：淺拷貝，擷取陣列的一部分，不包含 `end` 索引。
- **`concat()`**：合併多個陣列。
- **`flat()`**：將多維陣列展開（扁平化）。

### 2. 搜尋與判斷

- **`find()`**：回傳第一個符合條件的 **元素值**，找不到回傳 `undefined`。
- **`findIndex()`**：回傳第一個符合條件的 **索引**，找不到回傳 `-1`。
- **`includes()`**：判斷是否包含某個值，回傳 `true / false`。
- **`every()`**：檢查是否「全部」元素都符合條件。
- **`some()`**：檢查是否「至少有一個」元素符合條件。

---

## 遍歷與累積 (Iteration)

### `forEach()`

單純遍歷，沒有回傳值（回傳 `undefined`）。常用於印出資料或執行外部 Function。

```javascript
list.forEach((item) => console.log(item))
```
