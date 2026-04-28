// reduce用法
// 上一輪回傳的結果
// arr.reduce((acc, item, index, array) => {
//     // acc   → 累積值
//     // item  → 當前元素
//     // index → 當前索引
//     // array → 原始陣列本身
// }, 初始值)

//數字加總
//陣列加總
//物件

const list = [1, 2, 3, 4]
const arr = [
    { num: 1, price: 20 },
    { num: 10, price: 30 },
    { num: 100, price: 40 },
    { num: 1000, price: 50 },
]

// 預設0
// acc是累加
//箭頭函式 沒有大括號就是直接return的意思 有大括號要記得加上return
const a1 = list.reduce((acc, item) => (acc = acc + item), 0)
// console.log(a1) // 10

const a2 = arr.reduce((acc, item) => {
    acc.push({ num: item.num * 2, price: item.price })
    return acc
}, [])

// console.log(a2)

// 陣列中清除a

// 每x個加入一個a
function insertA(arr, x) {
    let result = arr.reduce((acc, item, index, array) => {
        acc.push(item)
        if ((index + 1) % x == 0 && index + 1 !== arr.length) {
            acc.push({ type: 'a' })
        }
        return acc
    }, [])
    console.log(result)
    return result
}

insertA(arr, 2)

function clearA(arr, target) {
    let result = arr.filter((item) => item.type !== target)
    console.log(result)
    return result
}

clearA(arr, 'a')
