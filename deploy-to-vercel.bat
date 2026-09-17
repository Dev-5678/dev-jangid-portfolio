@echo off
echo ===================================================
echo   DEV JANGID PORTFOLIO - VERCEL DEPLOYMENT SCRIPT
echo ===================================================
echo.
echo 1. Verifying production build...
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Production build failed. Please resolve errors before deploying.
    pause
    exit /b %errorlevel%
)
echo [OK] Build passed cleanly!
echo.
echo 2. Launching Vercel Deployment...
echo Follow the on-screen prompts to log into your Vercel account.
echo.
call npx --yes vercel
echo.
echo ===================================================
echo Deployment completed! Share your live Vercel link!
echo ===================================================
pause
