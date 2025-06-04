# Vue



## computed 的 get 與 set

get 取回值，set 將值作處理修改吐出去
```js
const formattedTest = computed({
  // getter（取得 formattedTest 的值時）
  get() {
    return modalContent.value?.join('\n') || '';
  },

  // setter（修改 formattedTest 的值時）
  set(newValue) {
    newValue = DOMPurify.sanitize(newValue);
    modalContent.value = newValue
      .split('\n')                  // 把字串用換行切開變陣列
      .map((item) => item.trim())  // 每一行去頭尾空白
      .filter(line => line !== ''); // 移除空行
  }
});

```


## 原生JS - 取出物件的 key,value、只取出物件的 value

### Object.entires(物件)，取出 key 與 value
```js
// Object.entires(物件)
const obj = {
  name:'haha', 
  num: 20
}

const b = Object.entries(obj); 
console.log(b) //[["name", "haha"], ["num", 20]]

// 變成處理陣列
for (const [key, value] of Object.entries(obj)) {
  console.log([key,value]) //["name", "haha"] ["num", 20]
}
```


### 只取出物件的值 value
```js
//Object.values(物件)

const obj = {
  name:'haha', 
  num: 20
}
console.log(Object.values(obj)) // ["haha", 20]

```