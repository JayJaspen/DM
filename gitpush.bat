@echo off
cd /d "C:\Users\info\Desktop\dm"
"C:\Program Files\Git\cmd\git.exe" config user.email "john@jaspen.se"
"C:\Program Files\Git\cmd\git.exe" config user.name "JayJaspen"
"C:\Program Files\Git\cmd\git.exe" config credential.helper manager
"C:\Program Files\Git\cmd\git.exe" add .
"C:\Program Files\Git\cmd\git.exe" commit -m "Initial commit - DManager MDM"
"C:\Program Files\Git\cmd\git.exe" branch -M main
"C:\Program Files\Git\cmd\git.exe" remote set-url origin https://github.com/JayJaspen/DM.git
"C:\Program Files\Git\cmd\git.exe" push -u origin main
echo.
echo === KLAR ===
