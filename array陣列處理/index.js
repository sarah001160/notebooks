const list = [
    { name: 'banana', num: 10, id: 1 },
    {
        name: 'candy',
        num: 20,
        id: 2,
    },
    { name: 'uklele', num: 40, id: 3 },
]

//push 尾端新增元素
list.push('1')
console.log(list)
// [
//   { name: 'banana', num: 10, id: 1 },
//   { name: 'candy', num: 20, id: 2 },
//   { name: 'uklele', num: 40, id: 3 },
//   '1'
// ]

//pop移除最後一個元素
list.pop()
console.log(list)
// [
//     ({ name: 'banana', num: 10, id: 1 },
//     { name: 'candy', num: 20, id: 2 },
//     { name: 'uklele', num: 40, id: 3 })
// ]

// unshift()	從 前端 新增元素	array.unshift(0)
list.unshift('0000')
console.log(list)
// [
//     ('0000',
//     { name: 'banana', num: 10, id: 1 },
//     { name: 'candy', num: 20, id: 2 },
//     { name: 'uklele', num: 40, id: 3 })
// ]

list.shift()
console.log(list)
// shift()	移除 第一個 元素	array.shift()
// splice()	增、刪、改 萬用工具	array.splice(索引, 刪除數, 新增值)
// sort()	排序 (預設為 Unicode 排序)	array.sort((a, b) => a - b)
// reverse()	反轉陣列順序	array.reverse()
// fill()
