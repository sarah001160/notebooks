# Razor syntax

MVC 架構的專案，使用C#，.cshtml檔案內會使用到 razor 語法
打開專案的方式透過 visual studio 雙擊開啟.sln 檔案
新增檔案的方式，在 visual studio 方案內案右鍵新增，會自動幫你建立 .css、.cshtml、.cs 檔案(一組的)
不建議在 visual studio code內手動建立.cshtml。容易出錯且不會自動被 visual studio 列入專案。

## .cshtml razor syntax

```razor
C# 專案
razor語法

hello.schtml

@{
// contorller的變數放這
]}

@section Style{
<link ref="stylesheet" href="~/path">
}

<div>
  hello
</div>

@section Script {
<script src="~/path/jquery.js"></script>
<script src="~/path/tool.js"></script>
}

```

## @

Razor 使用 @ 來從 HTML 切換到 C# 代碼：

```cshtml
<h1> Hello @name </h1>
<p> 現在是 @DateTime.Now </p>
```

## 代碼區塊 @{}

使用 @{ } 來寫多行 C# 代碼：
