# Razor syntax

.cshtml 檔案，用 razor 寫法

## @

Razor 使用 @ 來從 HTML 切換到 C# 代碼：

```cshtml
<h1> Hello @name </h1>
<p> 現在是 @DateTime.Now </p>
```

## 代碼區塊 @{}

使用 @{ } 來寫多行 C# 代碼：
