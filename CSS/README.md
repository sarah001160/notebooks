# CSS id、class 選擇器

抓 id 名字為 name 的元素

-   抓元素 data-set 屬性以 widege- 開頭的元素，使用`^=`
    例如`<div data-customize-partial-id="widget-post">...</div>`

    `^=` 是「開頭為」的意思

    `\*`= 是「包含」的意思

    `$=` 是「結尾為」的意思

    css 可以這樣抓 data-set 屬性~

    ```css
    [data-customize-partial-id^='widget'] {
        /* 這裡的元素 data-customize-partial-id 是以 widget 開頭的 */
        border: 1px solid red;
    }
    ```

-   抓 id 名稱以 widege- 開頭的元素，例如`<div id="widget-post">...</div>`

    css 無法這樣抓 id ，只能從 JS 撈符合條件的 dom 元素

    ```js
    const blocks = document.querySelectorAll('[id^="block"]')
    console.log(blocks)
    ```

抓 元素內有 data-set 屬性的元素
比方說 `<div data-date >2025/1/1</div>`

```css
[data-date] {
    color: red;
}
```

# A 連結

`a:hover` 滑鼠懸浮 a 連結
`a:focus` 滑鼠點著不放

a 連結樣式，有底線、或方框

底線 `text-decoration:underline;`，或選擇不要底線，值改為`none`

方框 `outline: 1px solid;` 或選擇不要方框，值改為`none`
