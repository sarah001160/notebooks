# AJAX、Axios、Fetch 三種 CRUD 方式筆記

## 目錄

1. [AJAX 方式](#ajax-方式)
2. [Axios 方式](#axios-方式)
3. [Fetch 方式](#fetch-方式)
4. [完整例子](#完整例子)

---

# AJAX 方式

## 什麼是 AJAX？

**AJAX = Asynchronous JavaScript and XML**

- 使用 XMLHttpRequest 物件
- 無需重新整理頁面就能傳送請求

---

## AJAX - CREATE（新增）

```javascript
// 新增使用者
function addUserAjax() {
    const xhr = new XMLHttpRequest()

    // 打開連接
    xhr.open('POST', 'http://localhost:3000/api/users', true)

    // 設定請求標頭
    xhr.setRequestHeader('Content-Type', 'application/json')

    // 準備資料
    const data = {
        name: 'benny',
        age: 20,
    }

    // 回應處理
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('✅ 新增成功:', JSON.parse(xhr.responseText))
        } else {
            console.log('❌ 新增失敗:', xhr.status)
        }
    }

    // 錯誤處理
    xhr.onerror = function () {
        console.log('❌ 請求出錯')
    }

    // 傳送請求
    xhr.send(JSON.stringify(data))
}
```

---

## AJAX - READ（查詢）

```javascript
// 查詢所有使用者
function getUsersAjax() {
    const xhr = new XMLHttpRequest()

    xhr.open('GET', 'http://localhost:3000/api/users', true)

    xhr.onload = function () {
        if (xhr.status === 200) {
            const users = JSON.parse(xhr.responseText)
            console.log('✅ 查詢成功:', users)
        }
    }

    xhr.send()
}

// 查詢單一使用者
function getUserByIdAjax(id) {
    const xhr = new XMLHttpRequest()

    xhr.open('GET', `http://localhost:3000/api/users/${id}`, true)

    xhr.onload = function () {
        if (xhr.status === 200) {
            const user = JSON.parse(xhr.responseText)
            console.log('✅ 查詢成功:', user)
        }
    }

    xhr.send()
}
```

---

## AJAX - UPDATE（修改）

```javascript
// 修改使用者
function updateUserAjax(id) {
    const xhr = new XMLHttpRequest()

    xhr.open('PUT', `http://localhost:3000/api/users/${id}`, true)
    xhr.setRequestHeader('Content-Type', 'application/json')

    const data = {
        name: 'alice',
        age: 25,
    }

    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('✅ 修改成功:', JSON.parse(xhr.responseText))
        }
    }

    xhr.send(JSON.stringify(data))
}
```

---

## AJAX - DELETE（刪除）

```javascript
// 刪除使用者
function deleteUserAjax(id) {
    const xhr = new XMLHttpRequest()

    xhr.open('DELETE', `http://localhost:3000/api/users/${id}`, true)

    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('✅ 刪除成功:', JSON.parse(xhr.responseText))
        }
    }

    xhr.send()
}
```

---

## AJAX 完整流程

```javascript
// 完整的 AJAX 操作
const AjaxAPI = {
    // 基礎設定
    baseURL: 'http://localhost:3000/api',

    // 傳送請求
    request(method, url, data = null) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()

            xhr.open(method, this.baseURL + url, true)
            xhr.setRequestHeader('Content-Type', 'application/json')

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(JSON.parse(xhr.responseText))
                } else {
                    reject('請求失敗: ' + xhr.status)
                }
            }

            xhr.onerror = () => reject('網路錯誤')

            xhr.send(data ? JSON.stringify(data) : null)
        })
    },

    // CRUD 方法
    get(url) {
        return this.request('GET', url)
    },

    post(url, data) {
        return this.request('POST', url, data)
    },

    put(url, data) {
        return this.request('PUT', url, data)
    },

    delete(url) {
        return this.request('DELETE', url)
    },
}

// 使用
AjaxAPI.get('/users').then((users) => {
    console.log('所有使用者:', users)
})

AjaxAPI.post('/users', { name: 'benny', age: 20 }).then((res) => {
    console.log('新增成功:', res)
})
```

---

# Axios 方式

## 什麼是 Axios？

**現代的 HTTP 請求庫**

- 基於 Promise
- 自動處理 JSON
- 支援請求攔截
- **最推薦使用！**

---

## 安裝 Axios

```bash
npm install axios
```

或在 HTML 中引入：

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.4.0/axios.min.js"></script>
```

---

## Axios - CREATE（新增）

```javascript
// 新增使用者
axios
    .post('http://localhost:3000/api/users', {
        name: 'benny',
        age: 20,
    })
    .then((response) => {
        console.log('✅ 新增成功:', response.data)
    })
    .catch((error) => {
        console.log('❌ 新增失敗:', error.message)
    })
```

---

## Axios - READ（查詢）

```javascript
// 查詢所有使用者
axios
    .get('http://localhost:3000/api/users')
    .then((response) => {
        console.log('✅ 查詢成功:', response.data)
    })
    .catch((error) => {
        console.log('❌ 查詢失敗:', error.message)
    })

// 查詢單一使用者
axios.get('http://localhost:3000/api/users/1').then((response) => {
    console.log('✅ 查詢成功:', response.data)
})
```

---

## Axios - UPDATE（修改）

```javascript
// 修改使用者
axios
    .put('http://localhost:3000/api/users/1', {
        name: 'alice',
        age: 25,
    })
    .then((response) => {
        console.log('✅ 修改成功:', response.data)
    })
    .catch((error) => {
        console.log('❌ 修改失敗:', error.message)
    })
```

---

## Axios - DELETE（刪除）

```javascript
// 刪除使用者
axios
    .delete('http://localhost:3000/api/users/1')
    .then((response) => {
        console.log('✅ 刪除成功:', response.data)
    })
    .catch((error) => {
        console.log('❌ 刪除失敗:', error.message)
    })
```

---

## Axios 完整流程（最推薦！）

```javascript
// 設定基礎 URL
axios.defaults.baseURL = 'http://localhost:3000/api'

// 建立實例
const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 5000, // 逾時 5 秒
    headers: {
        'Content-Type': 'application/json',
    },
})

// 請求攔截器（傳送前處理）
api.interceptors.request.use((config) => {
    console.log('📤 傳送請求:', config.url)
    return config
})

// 回應攔截器（收到後處理）
api.interceptors.response.use(
    (response) => {
        console.log('📥 收到回應:', response.status)
        return response.data
    },
    (error) => {
        console.log('❌ 錯誤:', error.message)
        return Promise.reject(error)
    },
)

// CRUD 操作
const UserAPI = {
    // 查詢所有
    getAll() {
        return api.get('/users')
    },

    // 查詢單一
    getById(id) {
        return api.get(`/users/${id}`)
    },

    // 新增
    create(data) {
        return api.post('/users', data)
    },

    // 修改
    update(id, data) {
        return api.put(`/users/${id}`, data)
    },

    // 刪除
    delete(id) {
        return api.delete(`/users/${id}`)
    },
}

// 使用範例
UserAPI.getAll()
    .then((users) => console.log('所有使用者:', users))
    .catch((err) => console.log('錯誤:', err))

UserAPI.create({ name: 'benny', age: 20 })
    .then((res) => console.log('新增成功:', res))
    .catch((err) => console.log('錯誤:', err))
```

---

# Fetch 方式

## 什麼是 Fetch？

**新的 HTTP 請求 API**

- 原生支援（無需安裝）
- 基於 Promise
- 比 AJAX 簡潔
- 比 Axios 輕量級
- **IE 不支援，其他瀏覽器都支援**

---

## Fetch - CREATE（新增）

```javascript
// 新增使用者
fetch('http://localhost:3000/api/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        name: 'benny',
        age: 20,
    }),
})
    .then((response) => response.json())
    .then((data) => {
        console.log('✅ 新增成功:', data)
    })
    .catch((error) => {
        console.log('❌ 新增失敗:', error.message)
    })
```

---

## Fetch - READ（查詢）

```javascript
// 查詢所有使用者
fetch('http://localhost:3000/api/users')
    .then((response) => response.json())
    .then((data) => {
        console.log('✅ 查詢成功:', data)
    })
    .catch((error) => {
        console.log('❌ 查詢失敗:', error.message)
    })

// 查詢單一使用者
fetch('http://localhost:3000/api/users/1')
    .then((response) => response.json())
    .then((data) => {
        console.log('✅ 查詢成功:', data)
    })
```

---

## Fetch - UPDATE（修改）

```javascript
// 修改使用者
fetch('http://localhost:3000/api/users/1', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        name: 'alice',
        age: 25,
    }),
})
    .then((response) => response.json())
    .then((data) => {
        console.log('✅ 修改成功:', data)
    })
    .catch((error) => {
        console.log('❌ 修改失敗:', error.message)
    })
```

---

## Fetch - DELETE（刪除）

```javascript
// 刪除使用者
fetch('http://localhost:3000/api/users/1', {
    method: 'DELETE',
})
    .then((response) => response.json())
    .then((data) => {
        console.log('✅ 刪除成功:', data)
    })
    .catch((error) => {
        console.log('❌ 刪除失敗:', error.message)
    })
```

---

## Fetch 完整流程

```javascript
// 建立 API 類別
class FetchAPI {
    constructor(baseURL) {
        this.baseURL = baseURL
    }

    // 通用請求方法
    request(url, options = {}) {
        return fetch(this.baseURL + url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        }).then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`)
            }
            return response.json()
        })
    }

    // GET
    get(url) {
        return this.request(url)
    }

    // POST
    post(url, data) {
        return this.request(url, {
            method: 'POST',
            body: JSON.stringify(data),
        })
    }

    // PUT
    put(url, data) {
        return this.request(url, {
            method: 'PUT',
            body: JSON.stringify(data),
        })
    }

    // DELETE
    delete(url) {
        return this.request(url, {
            method: 'DELETE',
        })
    }
}

// 使用
const api = new FetchAPI('http://localhost:3000/api')

api.get('/users')
    .then((users) => console.log('所有使用者:', users))
    .catch((err) => console.log('錯誤:', err))

api.post('/users', { name: 'benny', age: 20 })
    .then((res) => console.log('新增成功:', res))
    .catch((err) => console.log('錯誤:', err))

api.put('/users/1', { name: 'alice', age: 25 })
    .then((res) => console.log('修改成功:', res))
    .catch((err) => console.log('錯誤:', err))

api.delete('/users/1')
    .then((res) => console.log('刪除成功:', res))
    .catch((err) => console.log('錯誤:', err))
```

---

# 完整例子

## HTML 頁面範例

```html
<!DOCTYPE html>
<html>
    <head>
        <title>CRUD 操作</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.4.0/axios.min.js"></script>
    </head>
    <body>
        <h1>使用者管理</h1>

        <!-- 查詢 -->
        <button onclick="getUsers()">查詢所有使用者</button>

        <!-- 新增 -->
        <button onclick="addUser()">新增使用者</button>

        <!-- 修改 -->
        <button onclick="updateUser()">修改使用者</button>

        <!-- 刪除 -->
        <button onclick="deleteUser()">刪除使用者</button>

        <!-- 結果顯示 -->
        <div id="result"></div>

        <script>
            const baseURL = 'http://localhost:3000/api'

            // 方式1：使用 Axios（推薦）
            const api = axios.create({
                baseURL: baseURL,
            })

            // 查詢
            function getUsers() {
                api.get('/users')
                    .then((res) => {
                        console.log('✅ 查詢成功:', res.data)
                        document.getElementById('result').innerHTML =
                            JSON.stringify(res.data, null, 2)
                    })
                    .catch((err) => console.log('❌ 錯誤:', err.message))
            }

            // 新增
            function addUser() {
                api.post('/users', {
                    name: 'benny',
                    age: 20,
                })
                    .then((res) => {
                        console.log('✅ 新增成功:', res.data)
                        getUsers() // 重新整理列表
                    })
                    .catch((err) => console.log('❌ 錯誤:', err.message))
            }

            // 修改
            function updateUser() {
                api.put('/users/1', {
                    name: 'alice',
                    age: 25,
                })
                    .then((res) => {
                        console.log('✅ 修改成功:', res.data)
                        getUsers() // 重新整理列表
                    })
                    .catch((err) => console.log('❌ 錯誤:', err.message))
            }

            // 刪除
            function deleteUser() {
                api.delete('/users/1')
                    .then((res) => {
                        console.log('✅ 刪除成功:', res.data)
                        getUsers() // 重新整理列表
                    })
                    .catch((err) => console.log('❌ 錯誤:', err.message))
            }
        </script>
    </body>
</html>
```

---

## 三種方式對比代碼

```javascript
// 都是查詢所有使用者

// ❌ AJAX 方式（繁瑣）
const xhr = new XMLHttpRequest()
xhr.open('GET', 'http://localhost:3000/api/users', true)
xhr.onload = () => console.log(JSON.parse(xhr.responseText))
xhr.send()

// ✅ Axios 方式（簡潔，推薦）
axios
    .get('http://localhost:3000/api/users')
    .then((res) => console.log(res.data))

// ✅ Fetch 方式（簡潔）
fetch('http://localhost:3000/api/users')
    .then((r) => r.json())
    .then((data) => console.log(data))
```

---

## 如何選擇？

### 使用 AJAX

- ❌ 不推薦（已過時）
- 只在必須支援老舊瀏覽器時使用

### 使用 Axios（**最推薦**）

- ✅ 代碼簡潔
- ✅ 功能完整
- ✅ 社群活躍
- ✅ 支援攔截器
- ✅ 大多數專案都用它

### 使用 Fetch

- ✅ 原生支援
- ✅ 無需安裝庫
- ✅ 輕量級
- ❌ IE 不支援
- 適合簡單專案

---

## 總結

| 操作       | AJAX                 | Axios            | Fetch                        |
| ---------- | -------------------- | ---------------- | ---------------------------- |
| **CREATE** | `xhr.open('POST')`   | `axios.post()`   | `fetch(, {method:'POST'})`   |
| **READ**   | `xhr.open('GET')`    | `axios.get()`    | `fetch()`                    |
| **UPDATE** | `xhr.open('PUT')`    | `axios.put()`    | `fetch(, {method:'PUT'})`    |
| **DELETE** | `xhr.open('DELETE')` | `axios.delete()` | `fetch(, {method:'DELETE'})` |

---

**記住：日常開發用 Axios，簡單專案用 Fetch！** 🚀
