const list = ['a', 'b', 'c']

//push 新增到最後一個
list.push(1)
console.log(list) // [ 'a', 'b', 'c', 1 ]

//pop刪除最後一個
list.pop()
console.log(list) // ['a', 'b', 'c']

// unshift()新增到第一個
list.unshift('new')
console.log(list) //['new', 'a', 'b', 'c']

//刪除第一個
list.shift()
console.log(list) // [ 'a', 'b', 'c' ]

const index = list.indexOf('new')
console.log(index) //-1

const index2 = list.indexOf('b')
console.log(index2) //1 (js從0開始序號，第二個元素的序號為1)

//splice刪除指定
list.splice(index2, 1)
console.log(list) //[ 'a', 'c' ]

//splice 新增的元素直接安排在指定索引位置。
// array.splice(索引, 刪除數, 新增值)
list.splice(0, 0, 'k')
console.log(list) // [ 'k', 'a', 'c' ]

list.splice(2, 0, 'k')
console.log(list) // ['k', 'a', 'k', 'c']

//指定索引的元素刪除、新增元素x
list.splice(1, 1, 'x')
console.log(list) // [ 'k', 'x', 'k', 'c' ]

list.sort((a, b) => {
    if (a < b) return -1
    if (a > b) return 1
    return 0
})

console.log(list) //c,k,k,x

const test = [3, 2, 1, 6]
test.sort((a, b) => {
    if (a < b) return -1 //-1 把a排前面
    if (a > b) return 1 // 1 把a排後面
    return 0
})
console.log(test) //1,2,3,6

//大-小
test.sort((a, b) => {
    if (a < b) return 1
    if (a > b) return -1
    return 0
})
console.log(test) //6321

const list2 = [
    {
        price: 100,
        name: 'food',
    },
    {
        price: 250,
        name: 'drink',
    },
    { price: 6, name: 'candy' },
]

const newList = list2.slice()
console.log('n', newList)
// [
//     ({ price: 100, name: 'food' },
//     { price: 250, name: 'drink' },
//     { price: 6, name: 'candy' })
// ]

// 潛拷貝 第0筆開始 到第3筆為止(不含)的元素
const newList2 = list2.slice(0, 2)
console.log('n2', newList2) //[ { price: 100, name: 'food' }, { price: 250, name: 'drink' } ]

function sortF(type, key, arr) {
    if (type == 'asc') {
        const result = arr.slice().sort((a, b) => {
            if (a[key] < b[key]) return -1
            if (a[key] > b[key]) return 1
            return 0
        })
        console.log(result)
        return result
    }
    if (type == 'desc') {
        const result = arr.sort((a, b) => {
            if (a[key] < b[key]) return 1
            if (a[key] > b[key]) return -1
            return 0
        })
        console.log(result)
        return result
    }
}

sortF('asc', 'price', list2)

const list3 = [2, 3, 4]
list3.reverse()
console.log(list3) //4,3,2

// fill()
//array.fill(value, start, end)
//你想建立一個長度為 5，且裡面全是 0 的陣列：
const tempArr = new Array(5).fill(0)
console.log(tempArr) //[0,0,0,0,0]

//指定範圍都變成X
//起始索引從 2 到結束索引 4 為止(不含結束索引)
tempArr.fill('X', 2, 4)
console.log(tempArr) //[(0, 0, 'X', 'X', 0)]
