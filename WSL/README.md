## 如何開啟 wsl

在 Windows 上開啟 WSL（Windows Subsystem for Linux）的方法有好幾種，這裡整理幾個常見的：

1. 透過命令提示字元或 PowerShell 開啟 WSL
   按下 Win + R，輸入 cmd 或 powershell 開啟命令提示字元或 PowerShell 視窗。

輸入指令：
`wsl`
這樣會直接進入預設的 Linux 發行版的 shell。

2. 直接開啟指定的 Linux 發行版
   如果你安裝了多個 Linux 發行版（Ubuntu、Debian 等），你可以直接從「開始選單」搜尋安裝好的發行版名稱，比如：

搜尋「Ubuntu」並點擊開啟

或輸入 PowerShell/命令提示字元：
`wsl -d Ubuntu`

3. 在 Windows Terminal 裡開啟
   如果你有安裝 Windows Terminal，它內建支援多個 shell，裡面通常會有「Ubuntu」或其他 Linux 發行版的分頁，可以直接點開。

4. 如果你還沒安裝 WSL，可以這樣安裝（Windows 10 2004 以上版本）
   開啟 PowerShell（以管理員身分執行）

輸入安裝指令：
`wsl --install`
重新啟動電腦

開機後，系統會引導你設定 Linux 發行版帳號密碼 5. 其他常用指令
查看已安裝的發行版：
`wsl -l -v`
設定預設發行版：
`wsl --set-default <發行版名稱>`
