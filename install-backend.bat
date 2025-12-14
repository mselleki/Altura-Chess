@echo off
echo ========================================
echo Installation du backend Django
echo ========================================
cd backend

echo.
echo Creation de l'environnement virtuel...
if not exist venv (
    py -m venv venv
    echo Environnement virtuel cree!
) else (
    echo Environnement virtuel existe deja.
)

echo.
echo Activation de l'environnement virtuel...
call venv\Scripts\activate.bat

echo.
echo Installation des dependances Python...
.\venv\Scripts\python.exe -m pip install -r requirements.txt

echo.
echo ========================================
echo Backend installe avec succes!
echo ========================================
pause

