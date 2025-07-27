# 想實作看看，先存筆記

# ClickUp Slack 整合

**Created:** 6/29/2025 22:39  
**Updated:** 6/29/2025 22:41  
**Exported:** 6/29/2025 22:41

## Prompt:

做爬蟲工具 node.js 把 clickup 上面指派給我的項目、截止日期 抓給我回傳到 slack 讓我一目了然

## Response:

你想要製作一個 **Node.js 爬蟲工具或整合應用**，抓取 ClickUp 上指派給你（Assigned to me）的任務與截止日期，然後自動發送到 Slack，是可以實作的，以下提供完整實作方向與範例框架。

---

## 🛠️ 工具與技術

| 功能                 | 使用工具                             |
| -------------------- | ------------------------------------ |
| 抓取 ClickUp 任務    | ClickUp API                          |
| 發送訊息到 Slack     | Slack Webhook                        |
| 實作語言             | Node.js（可使用 axios / node-fetch） |
| 自動執行排程（可選） | `node-cron`（定時抓取）              |

---

## ✅ 實作步驟概覽

1.  **取得 ClickUp 的 API Token**
2.  **取得你的 Workspace ID & User ID**
3.  **用 ClickUp API 查任務**
4.  **整理成格式文字**
5.  **送到 Slack Webhook URL**

---

## 📦 Step 1：安裝必要套件

```bash
npm init -y
npm install axios dotenv
```

如果你也要定時執行：

```bash
npm install node-cron
```

---

## 📁 Step 2：`.env` 檔案設定

```env
CLICKUP_API_TOKEN=your_clickup_api_token
CLICKUP_USER_ID=your_clickup_user_id
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/XXXX/XXX/XXXX
```

---

## 🧠 Step 3：Node.js 程式碼範例

```js
// index.js
require('dotenv').config()
const axios = require('axios')

const CLICKUP_API_TOKEN = process.env.CLICKUP_API_TOKEN
const CLICKUP_USER_ID = process.env.CLICKUP_USER_ID
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL

async function fetchTasks() {
    const headers = {
        Authorization: CLICKUP_API_TOKEN,
    }

    try {
        const res = await axios.get(
            `https://api.clickup.com/api/v2/user/${CLICKUP_USER_ID}/task`,
            { headers }
        )

        const tasks = res.data.tasks

        const message = tasks
            .map((task) => {
                const dueDate = task.due_date
                    ? new Date(Number(task.due_date)).toLocaleString()
                    : 'No due date'
                return `• [${task.name}](${task.url}) - ⏰ ${dueDate}`
            })
            .join('\n')

        await axios.post(SLACK_WEBHOOK_URL, {
            text: `📋 *你被指派的 ClickUp 任務列表：*\n${message}`,
        })

        console.log('Slack message sent.')
    } catch (err) {
        console.error('Error fetching tasks or sending Slack message:', err)
    }
}

fetchTasks()
```

---

## ⏰（可選）Step 4：加上排程

```js
const cron = require('node-cron')

// 每天早上 9 點抓一次
cron.schedule('0 9 * * *', () => {
    fetchTasks()
})
```

---

## 📌 說明補充

-   若你要過濾「只看 Assigned to me」的任務，使用 `/team/team_id/task` 這個 API，並加上參數 `assignees[]=${YOUR_USER_ID}`
-   ClickUp API 文件參考：https://clickup.com/api

---

## 🔐 安全提醒

-   Slack Webhook 建議只給可信任的來源呼叫
-   ClickUp Token 請妥善儲存於 `.env`

---

如果你願意提供你的 `ClickUp workspace id`、`user id`、`task folder id` 等資訊，我可以幫你精準組出對應 API URL。  
你要不要我幫你進一步整理這些資料要去哪裡找？

你是否喜歡這種個性？

---

Powered by [ChatGPT Exporter](https://www.chatgptexporter.com)
