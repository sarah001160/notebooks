# JS 解題

JS 的操作，多練習(例如:排序、資料比對、移除重複的值..等情境的操作練習)。

## 1 判斷是否質數

```js
// 質數定義: 一個大於 1 的整數除了1 和本身以外，沒有其他的因數。
// 1 不是質數也不是合數。 2 是偶數，也是最小的質數。
// 例：13 只有1 和13 兩個因數，所以13 稱為質數

function isPrime(n) {
    if (n == 1) {
        console.log(false)
        return
    }

    let starter = 2
    while (starter < n) {
        if (n % starter == 0) {
            console.log(false)
            return false
        }
        starter++
    }
    console.log(true)
    return true
}

isPrime(1) //false
isPrime(19) //true
isPrime(21) //false
isPrime(91) //false
isPrime(111) //false
```

## 2 將陣列中重複的質，整理成陣列中沒有重複的質

## 3 檢查 key 是否存在於物件 {} 中

```js
const obj = { a: 1, c: 3 }

console.log('a' in obj) // true
console.log('b' in obj) // false
console.log('c' in obj) // true
```

## 4 印星號

```js
//印星號
//4，印出*、**、***、****
//3，印出*、**、***
//以此類推

function print(n) {
    let starter = 0
    let str = ''
    while (starter < n) {
        if (starter < n) {
            str += '*'
            console.log(str)
        }
        starter++
    }
}

print(4)
//*
// **
// ***
// ****

print(2)
// *
// **
```

## 迴文

## sort 用法

排列 array 內字串、排列 array 內數字、排列 array 內物件

```js
function sortAB(arr) {
    const n = arr.sort((a, b) => {
        return a - b //小到大
    })
    console.log(n)
}

// 回傳數字由小到大
sortAB([8, 7, 6, 5, 4, 3]) //  [3,4,5,6,7,8] 適用陣列內純數字

// 錯誤，沒有按照id 1、2、3排列，不適用物件排列
sortAB([
    { id: 3, name: 'a' },
    { id: 2, name: 'b' },
    { id: 1, name: 'c' },
]) //[ { id: 3, name: 'a' }, { id: 2, name: 'b' }, { id: 1, name: 'c' } ]

// 錯誤，無回傳'a','b','c'
sortAB(['c', 'b', 'a']) //[ 'c', 'b', 'a' ]
```

排列 array 內的物件

改變原始陣列

```js
let list = [
    { id: 3, name: 'a' },
    { id: 2, name: 'b' },
    { id: 1, name: 'c' },
]

// 改變原始陣列
function sort2AB(arr) {
    arr.sort(function (a, b) {
        // 依據id順序由小到大排列資料，一定要寫return
        return a.id - b.id
    })
    return arr
}

sort2AB(list)
console.log('list', list) // 原始陣列被改變了，排序後 [ { id: 1, name: 'c' }, { id: 2, name: 'b' }, { id: 3, name: 'a' } ]
```

不改變原始陣列

```js
let list = [
    { id: 3, name: 'a' },
    { id: 2, name: 'b' },
    { id: 1, name: 'c' },
]
function sort2AB(arr) {
    // 不影響原陣列，宣告新變數result
    const result = arr.sort(function (a, b) {
        // 依據id順序由小到大排列資料，一定要寫return
        return a.id - b.id
    })
    return result
}
const r1 = sort2AB(list)

console.log('原始陣列list不變', list) //[ { id: 3, name: 'a' }, { id: 2, name: 'b' }, { id: 1, name: 'c' } ]
console.log('r1', r1) // [ { id: 1, name: 'c' }, { id: 2, name: 'b' }, { id: 3, name: 'a' } ]
```

用字母(字串)排序

```js
let list = [
    { id: 3, name: 'ann' },
    { id: 2, name: 'bnn' },
    { id: 1, name: 'cnn' },
]

// 字母排序 .localCompare
function correctAlphaBA(arr) {
    const result = arr.sort((a, b) => {
        return b.name.localeCompare(a.name)
    })
    console.log(' localeCompare', result)
    return result
}
correctAlphaBA(list) // localeCompare [{ id: 1, name: 'cnn' },  { id: 2, name: 'bnn' },  { id: 3, name: 'ann' }]
```

彈性寫法，升冪降冪同個 function

```js
function createSortFn(key, isAsc = true) {
    return function (a, b) {
        let valA = a[key]
        let valB = b[key]

        if (typeof valA === 'string') valA = valA.toLowerCase()
        if (typeof valB === 'string') valB = valB.toLowerCase()

        if (valA < valB) return isAsc ? -1 : 1
        if (valA > valB) return isAsc ? 1 : -1
        return 0
    }
}

const list = [
    { id: 2, name: 'Banana' },
    { id: 3, name: 'apple' },
    { id: 1, name: 'banana' },
]

// 升冪排序
const sortedAsc = [...list].sort(createSortFn('name', true))
// 降冪排序
const sortedDesc = [...list].sort(createSortFn('name', false))

console.log('Ascending:', sortedAsc)
console.log('Descending:', sortedDesc)
```

原本的寫法

```js
const newList = [
    { id: 300, name: 'CorX' },
    { id: 100, name: 'Bnn1' },
    { id: 100, name: 'Bnn2' },
    { id: 100, name: 'AZZZZzzz' },
]

//name 小到大
function Ascending(a, b) {
    const valA = a.name.toLowerCase()
    const valB = b.name.toLowerCase()
    if (valA < valB) {
        return -1
    }
    // 1 代表符合條件的結果 排在 -1 結果後面
    if (valA > valB) {
        return 1
    }
    // 0表示相同，位置不變
    return 0
}

//name 大到小
function Descending(a, b) {
    const valA = a.name.toLowerCase()
    const valB = b.name.toLowerCase()

    if (valA > valB) {
        return -1
    }

    if (valA < valB) {
        return 1
    }
    return 0
}

// Arr.sort(排序邏輯function)
const r = newList.sort(Ascending)
console.log('r', r)
// 回傳
// r[
//   ({ id: 100, name: 'AZZZZzzz' },
//   { id: 100, name: 'Bnn1' },
//   { id: 100, name: 'Bnn2' },
//   { id: 300, name: 'CorX' })
// ];

const r2 = newList.sort(Descending)
console.log('r2', r2)
// r2 [
//   { id: 300, name: 'CorX' },
//   { id: 100, name: 'Bnn2' },
//   { id: 100, name: 'Bnn1' },
//   { id: 100, name: 'AZZZZzzz' })
// ];
```

========================================================

## Number() 與 parseFloat()

| 輸入值           | `Number()` 結果 | `parseFloat()` 結果 | 說明                                               |
| ---------------- | --------------- | ------------------- | -------------------------------------------------- |
| `"123"`          | `123`           | `123`               | 純數字，兩者皆成功                                 |
| `"123.45"`       | `123.45`        | `123.45`            | 浮點數，兩者皆成功                                 |
| `"  123  "`      | `123`           | `123`               | 前後空格被忽略                                     |
| `"123abc"`       | `NaN`           | `123`               | `Number()` 失敗；`parseFloat()` 只取開頭數字       |
| `"abc123"`       | `NaN`           | `NaN`               | 開頭不是數字，兩者皆失敗                           |
| `"123.45abc"`    | `NaN`           | `123.45`            | `Number()` 失敗；`parseFloat()` 成功解析前面的數字 |
| `"12.3.4"`       | `NaN`           | `12.3`              | `Number()` 失敗；`parseFloat()` 取第一個合法浮點數 |
| `"0x10"`         | `16`            | `0`                 | `Number()` 支援 16 進位；`parseFloat()` 不支援     |
| `""` (空字串)    | `0`             | `NaN`               | `Number()` 視為 0；`parseFloat()` 視為無效         |
| `null`           | `0`             | `NaN`               | `Number(null)` 是 0；`parseFloat(null)` 是 NaN     |
| `undefined`      | `NaN`           | `NaN`               | 兩者皆為 NaN                                       |
| `true` / `false` | `1` / `0`       | `NaN`               | `Number()` 可轉換布林值；`parseFloat()` 不接受布林 |
| `[123]` (array)  | `123`           | `123`               | 單元素陣列可以轉為數字                             |
| `[1,2]` (array)  | `NaN`           | `NaN`               | 多元素陣列無法正確轉換                             |
| `{}` (物件)      | `NaN`           | `NaN`               | 物件無法直接轉為數字                               |

==============

屬性自行修改

```js
// 前一個數須 < 後一個數
let obj = {
    LL: 1,
    L: 2,
    H: '',
    HH: '',
}

function isOrder(obj = {}) {
    // obj 參數型別須為物件，且必須有四個屬性 LL、L、H、HH
    const keysInOrder = ['LL', 'L', 'H', 'HH']

    // 檢查四個值是否皆為 null 或空字串
    const isAllEmpty = Object.values(obj).every((val) => {
        return val == null || val == ''
    })

    // 4 個 input 全空
    if (isAllEmpty) {
        console.log('錯誤: 所有欄位都沒填')
        return false
    }

    // 有填寫一或多個 input
    const filledEntries = keysInOrder
        .filter((key) => obj[key] !== '' && obj[key] !== null)
        .map((key) => [key, obj[key]]) // 回傳新的array
    // console.log('filledEntries', filledEntries);

    if (filledEntries.length === 1) {
        console.log('只填一個值，視為合法')
        return true
    }

    // 檢查有填值的欄位，是否都符合前一個值 < 後一個值
    for (let i = 0; i < filledEntries.length - 1; i++) {
        // 解構賦值兩組
        const [key1, val1] = filledEntries[i]
        const [key2, val2] = filledEntries[i + 1] // i+1 要剛好等於陣列長度

        if (val1 >= val2) {
            console.log(`錯誤: ${key1}:${val1} 不應該 > 或 = ${key2}:${val2}`)
            return false
        }
    }
    console.log('所有順序都正確')
    return true
}

isOrder({})

isOrder({
    LL: 10,
    L: '',
    H: 30,
    HH: 100,
})
// true

isOrder({
    LL: Number(-500),
    L: null,
    H: null,
    HH: -600,
})
//false -600<-500
```
