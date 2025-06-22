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
