@echo off
title DManager – Dev Server
cd /d "%~dp0"
echo.
echo  ===================================
echo   DManager – startar dev-server...
echo   Öppna: http://localhost:3000
echo  ===================================
echo.
npm run dev
pause
