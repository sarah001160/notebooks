# 拖曳 Drag Drop

| 事件 (Event) | 觸發對象   | 說明                                                     |
| ------------ | ---------- | -------------------------------------------------------- |
| dragstart    | 被拖拽元素 | 拖拽開始，通常在此設定傳遞的數據。                       |
| dragover     | 目標放置區 | 元素在上方移動。必須執行 preventDefault() 才能允許放置。 |
| drop         | 目標放置區 | 放開滑鼠，執行最終邏輯（如交換位置）。                   |
| dragend      | 被拖拽元素 | 拖拽結束（不論成功與否），通常用於清除樣式。             |

### 原生 JS

```js
<div class="item" draggable="true" id="item1">拖我</div>
<div class="dropzone">目的地</div>

<script>
  const item = document.querySelector('.item');
  const zone = document.querySelector('.dropzone');

  // 1. 開始拖拽
  item.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.id);
    e.target.style.opacity = '0.5';
  });

  // 2. 經過目標區 (必要：阻止預設行為)
  zone.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  // 3. 放置
  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const draggableElement = document.getElementById(id);
    zone.appendChild(draggableElement); // 物理移動 DOM
  });
</script>

```

### vue

```html
<template>
    <ul>
        <li
            v-for="(item, index) in list"
            :key="item.id"
            draggable="true"
            @dragstart="handleDragStart(index, $event)"
            @dragover.prevent
            @drop="handleDrop(index)"
            @dragend="dragIndex = null"
        >
            {{ item.name }}
        </li>
    </ul>
</template>

<script setup>
    import { ref } from 'vue'

    const list = ref([
        { id: 1, name: '項目 A' },
        { id: 2, name: '項目 B' },
        { id: 3, name: '項目 C' },
    ])

    const dragIndex = ref(null)

    // 記錄起點 index
    const handleDragStart = (index, event) => {
        dragIndex.value = index
        event.dataTransfer.effectAllowed = 'move'
    }

    // 處理放置：交換陣列順序
    const handleDrop = (targetIndex) => {
        const movedItem = list.value.splice(dragIndex.value, 1)[0]
        list.value.splice(targetIndex, 0, movedItem)
    }
</script>
```

事件(都是小寫)

dragstart 開始拖曳

dragend 簡單來說，不管你最後是成功把東西丟進目標（Drop），還是拖到一半不想丟了直接放手（取消），dragend 只要你放開滑鼠就一定會執行。

dragover 拖曳進入目標區域

drop 目標區域取貨並執行動作 `event.dataTransfer.getData("name-name")`

```javascript
function handleDragStart(index, $event) {
    const draggedIndex = index
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/html', event.target.innerHTML)
}
function handleDragEnd() {}
function handleDragOver() {}
function handleDrop() {}
```

`event.dataTransfer.effectAllowed = 'move'`

被拖拉對象允許被移動move

`effectAllowed`: 指被拖拉對象允許的動作

`move` 只允許移動。 普通箭頭或移動圖示。

`copy` 只允許複製（原物保留）。 箭頭旁邊會出現一個 + 號。

`link` 只允許建立捷徑。 箭頭旁邊會出現一個小箭頭標誌。

`all` 允許所有操作。 視目標區域而定。

`'text/html'` 指定資料格式為 HTML 字串。這會告訴接收方，這不是普通的純文字，而是一段帶有格式的代碼

`event.target` 指的是你現在正在拖動的那個元素。

` .innerHTML` 取得該元素內部的所有東西
