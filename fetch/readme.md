# fetch

請求 api 的一種寫法。

需要的參數: url、api 要收的參數、 headers 可設定資訊 server 要求收的資料格式、client 要求收回的資料格式...等

## CURD

發送請求，基本 syntax

GET

```js
fetch('http:urlXXX')
    .then((res) => {
        return res.json() // 你必須自行轉回json格式
    })
    .then((response) => {
        console.log(response)
    })
```

POST

== 底下這是，試圖將參數拆出來===

```js
const url = 'https:xxxx';
cost data = { answer: 42 }; //object

fetch(url,
{
    body: JSON.stringify(data), // 轉成字串
    cache: 'no-cache', // 8 default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', //include, same-origin, *omit
    headers:{
        'user-agent': 'Mozilla/4.0 MDN Example', //這很少見我不知道這是啥@@
        'content-type':'application/json',
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc. ps.這部分應該要可以活用，由參數給入
    mode:'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
}).then((res)=>res.json())//輸出成json
```

MDN 給的參考如下:

```js
postData('http://urlXXX', { answer: 42 })
    .then((data) => console.log(data)) // JSON from `response.json()` call
    .catch((error) => console.error(error))

function postData(url, data) {
    // Default options are marked with *
    return fetch(url, {
        body: JSON.stringify(data), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: {
            'user-agent': 'Mozilla/4.0 MDN Example',
            'content-type': 'application/json',
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
    }).then((response) => response.json()) // 輸出成 json
}
```

### 包裝成彈性的寫法，自動判斷 method 為 GET、POST、PUT、DELETE 時要做的事情

```js
// 如沒給params參數，預設{}
//如沒給method,預設為GET
function request(url, method = 'GET', params = {}) {
    method = method.toUpperCase()

    const fetchOptions = {
        method,
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        ...(method === 'GET' || method === 'DELETE'
            ? {}
            : { body: JSON.stringify(params) }),
    }

    const finalUrl =
        (method === 'GET' || method === 'DELETE') && Object.keys(params).length
            ? `${url}?${new URLSearchParams(params).toString()}`
            : url

    return fetch(finalUrl, fetchOptions).then((res) =>
        res.ok ? res.json() : Promise.reject(`HTTP ${res.status}`)
    )
}
```

使用時 syntax 如下

```js
request('/api/test', 'GET', { id: 123 })
request('/api/post', 'POST', { name: 'DoMi' })
request('/api/delete', 'DELETE', { id: 1 })
```

### 補充: `new URLSearchParams()` 實用的 web API

```js
const params = { name: 'Alice', age: 30 }
const usp = new URLSearchParams(params)
console.log(usp.toString()) // 輸出: "name=Alice&age=30"
```
