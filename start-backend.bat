@echo off
echo ========================================
echo Demarrage du serveur Django
echo ========================================
cd backend

echo.
echo Activation de l'environnement virtuel...
call venv\Scripts\activate.bat

echo.
echo Verification de l'installation de Django...
.\venv\Scripts\python.exe -c "import django" 2>nul
if errorlevel 1 (
    echo.
    echo ERREUR: Django n'est pas installe!
    echo Lancez d'abord install-backend.bat
    echo.
    pause
    exit /b 1
)

echo.
echo Demarrage du serveur sur http://localhost:8000
echo Appuyez sur Ctrl+C pour arreter le serveur
echo.
.\venv\Scripts\python.exe manage.py runserver
pause

