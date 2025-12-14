# Guide d'installation simple

## Étape 1 : Installer tout

Double-cliquez sur ces fichiers dans l'ordre :

1. **install-backend.bat** - Installe le backend Django
2. **install-frontend.bat** - Installe le frontend React

## Étape 2 : Lancer le site

Ouvrez **DEUX** fenêtres de terminal et double-cliquez sur :

1. **start-backend.bat** - Lance le serveur Django (http://localhost:8000)
2. **start-frontend.bat** - Lance le serveur React (http://localhost:5173)

## Étape 3 : Ouvrir le site

Ouvrez votre navigateur et allez sur : **http://localhost:5173**

---

## Configuration Email (optionnel)

Pour que le formulaire de contact fonctionne, modifiez le fichier :
`backend/chessformation/settings.py`

Et ajoutez vos paramètres email :
- `EMAIL_HOST_USER` = "votre.email@gmail.com"
- `EMAIL_HOST_PASSWORD` = "votre_mot_de_passe"
- `DEFAULT_FROM_EMAIL` = "votre.email@gmail.com"

---

## Problèmes ?

- **Python non trouvé** : Installez Python depuis python.org
- **npm non trouvé** : Installez Node.js depuis nodejs.org
- **Erreur de permissions** : Exécutez les fichiers .bat en tant qu'administrateur

