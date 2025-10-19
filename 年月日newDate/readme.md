## 取得今日

```
const today = new Date();
console.log(today)
```

## 取得某個月份有幾天

new Date(year, month, day)

`year`: 年份

`month`: 月份（0-11，0 是 1 月，11 是 12 月）

`day`: 日期（1-31）`

當 day 設為 0，表示上個月分的最後一天

假設現在是 2024 年 10 月（currentMonth = 9，因為月份從 0 開始)

```js
let today = new Date()
let currentMonth = today.getMonth() // 9 (10月)
// currentMonth +1 =10 (11月)
const currentYear = today.getFullYear()
new Date(2024, 10, 0)
// 2024年11月第0天
// 等同10月的最後一天
const daysInMonth = new Date(year, month + 1, 0).getDate()
// 結果31，10月有31天
```

```js
new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
```

## 待研究寫法，加入事件、刪除事件

```js
<script setup>
import { ref, computed } from 'vue';

const today = new Date();
const currentMonth = ref(today.getMonth());
const currentYear = ref(today.getFullYear());

// 儲存事件的資料結構
const events = ref({
  // 格式: '2024-10-20': [{ title: '會議', time: '14:00' }]
});

const monthYearText = computed(() => {
  return `${currentYear.value} 年 ${currentMonth.value + 1} 月`
})

// 檢查某個日期是否有事件
const hasEvent = (year, month, day) => {
  const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  return events.value[dateKey] && events.value[dateKey].length > 0;
};

// 取得某個日期的事件
const getEvents = (year, month, day) => {
  const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  return events.value[dateKey] || [];
};

// 日曆 UI 格數
const calendarDays = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1).getDay();
  const daysInMonth = new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
  const days = [];

  // 添加空白格
  for (let i = 0; i < firstDay; i++) {
    days.push({ isEmpty: true });
  }

  // 添加日期
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = day === today.getDate() &&
      currentMonth.value === today.getMonth() &&
      currentYear.value === today.getFullYear();

    const hasEventFlag = hasEvent(currentYear.value, currentMonth.value, day);

    days.push({
      date: day,
      isEmpty: false,
      isToday: isToday,
      hasEvent: hasEventFlag
    })
  }

  return days;
});

const pad = (n) => {
  return n < 10 ? '0' + n : n;
};

const formatDateWithTimezone = (date) => {
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  const offset = -date.getTimezoneOffset();
  const sign = offset >= 0 ? '+' : '-';
  const offsetHours = pad(Math.floor(Math.abs(offset) / 60));
  const offsetMinutes = pad(Math.abs(offset) % 60);

  return `${year}/${month}/${day}T${hours}:${minutes}:${seconds}${sign}${offsetHours}:${offsetMinutes}`;
};

// 新增事件
const addEvent = (year, month, day, eventTitle) => {
  const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  if (!events.value[dateKey]) {
    events.value[dateKey] = [];
  }

  events.value[dateKey].push({
    title: eventTitle,
    time: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })
  });
};

// 刪除事件
const deleteEvent = (year, month, day, eventIndex) => {
  const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  if (events.value[dateKey]) {
    events.value[dateKey].splice(eventIndex, 1);

    // 如果該日期沒有事件了，刪除這個日期的 key
    if (events.value[dateKey].length === 0) {
      delete events.value[dateKey];
    }
  }
};

const handleDateClick = (day) => {
  if (day.isEmpty) return;

  const selectedDate = new Date(currentYear.value, currentMonth.value, day.date);
  const dateKey = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}-${String(day.date).padStart(2, '0')}`;

  // 顯示該日期的事件
  const dayEvents = getEvents(currentYear.value, currentMonth.value, day.date);

  let message = `日期：${formatDateWithTimezone(selectedDate)}\n\n`;

  if (dayEvents.length > 0) {
    message += '目前事件：\n';
    dayEvents.forEach((event, index) => {
      message += `${index + 1}. ${event.title} (${event.time})\n`;
    });
    message += '\n';
  }

  // 詢問是否新增事件
  const action = prompt(message + '輸入事件名稱以新增，或輸入 "刪除" 來刪除事件：');

  if (action && action.trim() !== '') {
    if (action === '刪除' && dayEvents.length > 0) {
      const deleteIndex = prompt(`請輸入要刪除的事件編號 (1-${dayEvents.length})：`);
      const index = parseInt(deleteIndex) - 1;
      if (index >= 0 && index < dayEvents.length) {
        deleteEvent(currentYear.value, currentMonth.value, day.date, index);
        alert('事件已刪除！');
      }
    } else {
      addEvent(currentYear.value, currentMonth.value, day.date, action);
      alert('事件已新增！');
    }
  }
};

const prevMonth = () => {
  currentMonth.value--;
  if (currentMonth.value < 0) {
    currentMonth.value = 11;
    currentYear.value--;
  }
};

const nextMonth = () => {
  currentMonth.value++;
  if (currentMonth.value > 11) {
    currentMonth.value = 0;
    currentYear.value++;
  }
};

const prevYear = () => {
  currentYear.value--;
};

const nextYear = () => {
  currentYear.value++;
};

const goToToday = () => {
  currentMonth.value = today.getMonth();
  currentYear.value = today.getFullYear();
};
</script>

<template>
  <div>
    <div class="calendar">
      <div class="calendar-header">
        <div class="year-controls">
          <button @click="prevYear" class="year-btn" title="上一年">&lt;&lt;</button>
          <button @click="prevMonth" title="上個月">&lt;</button>
        </div>

        <div class="date-display">
          <div class="month-year">{{ monthYearText }}</div>
          <button @click="goToToday" class="today-btn">今天</button>
        </div>

        <div class="year-controls">
          <button @click="nextMonth" title="下個月">&gt;</button>
          <button @click="nextYear" class="year-btn" title="下一年">&gt;&gt;</button>
        </div>
      </div>

      <div class="calendar-body">
        <!-- 星期 -->
        <div class="day-names">
          <div>日</div>
          <div>一</div>
          <div>二</div>
          <div>三</div>
          <div>四</div>
          <div>五</div>
          <div>六</div>
        </div>
        <!-- 日期 -->
        <div class="calendar-days">
          <div v-for="(day, index) in calendarDays" :key="index" :class="{
            'empty': day.isEmpty,
            'today': day.isToday,
            'has-event': day.hasEvent
          }" @click="handleDateClick(day)">
            <span class="date-number">{{ day.isEmpty ? '' : day.date }}</span>
            <span v-if="day.hasEvent" class="event-dot"></span>
          </div>
        </div>
      </div>

      <!-- 事件列表 -->
      <div class="event-summary" v-if="Object.keys(events).length > 0">
        <h3>本月事件</h3>
        <div class="event-list">
          <div v-for="(eventList, date) in events" :key="date" class="event-item">
            <div class="event-date">{{ date }}</div>
            <div v-for="(event, index) in eventList" :key="index" class="event-detail">
              • {{ event.title }} <span class="event-time">({{ event.time }})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  font-family: "Segoe UI", sans-serif;
  display: flex;
  justify-content: center;
  padding-top: 40px;
  background: #f7f7f7;
  margin: 0;
}

.calendar {
  width: 380px;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #4a90e2;
  color: #fff;
}

.year-controls {
  display: flex;
  gap: 4px;
}

.calendar-header button {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.2em;
  cursor: pointer;
  padding: 4px 12px;
  border-radius: 4px;
  transition: background 0.2s;
}

.calendar-header button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.year-btn {
  font-weight: bold;
}

.date-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.month-year {
  font-size: 1.1em;
  font-weight: bold;
}

.today-btn {
  font-size: 0.75em !important;
  padding: 2px 8px !important;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
}

.today-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.calendar-body {
  padding: 16px;
}

.day-names,
.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
}

.day-names div {
  font-weight: bold;
  color: #666;
  padding-bottom: 8px;
}

.calendar-days div {
  padding: 10px 0;
  border-radius: 4px;
  margin: 2px;
  cursor: pointer;
  position: relative;
  min-height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.calendar-days div:not(.empty):hover {
  background: #e0e0e0;
}

.today {
  background: #4a90e2;
  color: #fff;
  font-weight: bold;
}

.has-event {
  background: #fff3e0;
  font-weight: 600;
}

.has-event.today {
  background: #4a90e2;
}

.event-dot {
  position: absolute;
  bottom: 4px;
  width: 6px;
  height: 6px;
  background: #ff5722;
  border-radius: 50%;
}

.today .event-dot {
  background: #fff;
}

.empty {
  visibility: hidden;
}

.event-summary {
  border-top: 1px solid #e0e0e0;
  padding: 16px;
  max-height: 200px;
  overflow-y: auto;
}

.event-summary h3 {
  margin: 0 0 12px 0;
  font-size: 1em;
  color: #333;
}

.event-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.event-item {
  background: #f5f5f5;
  padding: 8px;
  border-radius: 4px;
  font-size: 0.9em;
}

.event-date {
  font-weight: bold;
  color: #4a90e2;
  margin-bottom: 4px;
}

.event-detail {
  color: #666;
  padding-left: 8px;
}

.event-time {
  color: #999;
  font-size: 0.9em;
}
</style>


```
