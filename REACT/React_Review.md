# React 快速複習筆記

## 1. Component 元件

```jsx
function App() {
    return <div>Hello React</div>
}

export default App
```

箭頭函式寫法：

```jsx
const App = () => {
    return <div>Hello React</div>
}

export default App
```

---

## 2. JSX

React 使用 JSX 語法：

```jsx
return (
    <div>
        <h1>標題</h1>
        <p>內容</p>
    </div>
)
```

---

## 3. useState

類似 Vue 的 `ref`

```jsx
import { useState } from 'react'

function App() {
    const [count, setCount] = useState(0)

    return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

---

## 4. Props 父傳子

父元件：

```jsx
<UserCard name="Sara" />
```

子元件：

```jsx
function UserCard({ name }) {
    return <h1>{name}</h1>
}
```

---

## 5. 條件渲染

### if

```jsx
{
    show && <div>Hello</div>
}
```

### 三元運算子

```jsx
{
    show ? <div>顯示</div> : <div>隱藏</div>
}
```

---

## 6. 迴圈渲染

```jsx
const users = [
  { id: 1, name: 'Tom' },
  { id: 2, name: 'Sara' }
]

<ul>
  {
    users.map(user => (
      <li key={user.id}>
        {user.name}
      </li>
    ))
  }
</ul>
```

### key 必須唯一

```jsx
key={user.id}
```

---

## 7. useEffect

### 頁面載入時執行一次

```jsx
import { useEffect } from 'react'

useEffect(() => {
    console.log('mounted')
}, [])
```

---

### 監聽變數

```jsx
useEffect(() => {
    console.log(count)
}, [count])
```

---

## 8. 表單綁定

React 沒有 v-model

```jsx
import { useState } from 'react'

function App() {
    const [name, setName] = useState('')

    return <input value={name} onChange={(e) => setName(e.target.value)} />
}
```

---

## 9. API 請求

### Axios

```jsx
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get('/api/users').then((res) => {
            setUsers(res.data)
        })
    }, [])

    return (
        <>
            {users.map((user) => (
                <p key={user.id}>{user.name}</p>
            ))}
        </>
    )
}
```

---

## 10. Fetch

```jsx
useEffect(() => {
    fetch('/api/users')
        .then((res) => res.json())
        .then((data) => {
            setUsers(data)
        })
}, [])
```

---

## 11. 自訂 Hook

類似 Vue 的 composable

### useCounter.js

```jsx
import { useState } from 'react'

function useCounter() {
    const [count, setCount] = useState(0)

    const increment = () => {
        setCount((prev) => prev + 1)
    }

    return {
        count,
        increment,
    }
}

export default useCounter
```

使用：

```jsx
const { count, increment } = useCounter()
```

---

## 12. useMemo

避免重複計算

```jsx
import { useMemo } from 'react'

const total = useMemo(() => {
    return price * qty
}, [price, qty])
```

---

## 13. useRef

取得 DOM

```jsx
import { useRef } from 'react'

function App() {
    const inputRef = useRef()

    const focusInput = () => {
        inputRef.current.focus()
    }

    return (
        <>
            <input ref={inputRef} />
            <button onClick={focusInput}>Focus</button>
        </>
    )
}
```

---

## Vue vs React 對照表

| Vue        | React            |
| ---------- | ---------------- |
| ref        | useState         |
| computed   | useMemo          |
| watch      | useEffect        |
| onMounted  | useEffect([])    |
| composable | custom hook      |
| v-if       | &&               |
| v-for      | map              |
| v-model    | value + onChange |
| props      | props            |

---

## React 面試高頻題

### 必背

- useState
- useEffect
- Props
- map + key
- Controlled Input
- Custom Hook
- Axios / Fetch

### 進階

- useMemo
- useCallback
- useRef
- Context API
- Redux Toolkit

---

## React 開發流程

```text
Component
    ↓
useState
    ↓
畫面渲染
    ↓
API取得資料
    ↓
setState
    ↓
重新渲染畫面
```
