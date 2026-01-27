為什麼網站需要 Cookie Consent？

在歐盟、美國、各國隱私法規要求下：

只要你的網站有用到：

Google Analytics

Facebook Pixel

廣告追蹤

記住登入狀態的 Cookie（非必要類型）

個人化內容

就必須取得使用者同意才能放 Cookie。

# 登入功能原理

登入頁面讓 user 輸入帳號、密碼(加密過後)傳送到後端，通常是為了取得 token(有些實作會存在 Cookie)，有了 token 後才能訪問後台頁面。
之後你每次請求網站不需再輸入密碼。
因為你的瀏覽器會自動附上那個 Cookie，網站會知道你是誰
真正讓你保持登入的就是 Cookie 內的 Session token

chatgpt 說
但很多重要網站會防範（例如銀行、不少大型平台）：

Cookie 設為 HttpOnly（JS 讀不到，降低被竊風險）

Token 綁定 Cookie、IP、User-Agent、設備指紋

Token 會很快過期

有額外的 device check、MFA 驗證

工程師會測試，把自己登入網站後的 Cookie 複製起來。

開啟無痕頁面手動貼上 Cookie、不用輸入密碼直接登入成功。
(tested, right)

# Document.Cookie WebAPI

[Cookie MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie)

## 如何把資料存進 Cookie

allCookies = document.cookie;

相當於
window.allCookies = document.cookie;
你沒宣告變數，js 在非嚴格模式下會把它當成全域，這樣很容易互相汙染變數的值。

安全寫法? const allCookies = document.cookie;

如何把資料從 Cookie 刪除

syntax
