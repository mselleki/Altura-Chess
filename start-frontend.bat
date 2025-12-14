@echo off
echo ========================================
echo Demarrage du serveur React
echo ========================================

cd /d "%~dp0frontend"
if not exist package.json (
    echo.
    echo ERREUR: Le fichier package.json est introuvable!
    echo Assurez-vous d'etre dans le dossier ChessFormation.
    echo.
    pause
    exit /b 1
)

echo.
echo Verification de l'installation des dependances...
if not exist node_modules (
    echo.
    echo Les dependances ne sont pas installees.
    echo Installation en cours...
    call npm install
    echo.
)

echo.
echo Demarrage du serveur sur http://localhost:5173
echo Appuyez sur Ctrl+C pour arreter le serveur
echo.
call npm run dev

pause

