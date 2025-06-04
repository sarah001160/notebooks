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