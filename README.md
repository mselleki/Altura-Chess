# ChessFormation - React + Django Setup

Un projet minimal avec React (TypeScript + Vite + Tailwind) et Django pour un formulaire de contact.

## Structure du projet

```
ChessFormation/
├── backend/          # Application Django
│   ├── chessformation/  # Configuration Django
│   ├── contact/         # App de contact
│   └── requirements.txt
└── frontend/        # Application React
    ├── src/
    └── package.json
```

## Installation

### Backend (Django)

1. Créez un environnement virtuel :
```bash
cd backend
python -m venv venv
```

2. Activez l'environnement virtuel :
- Windows: `venv\Scripts\activate`
- Linux/Mac: `source venv/bin/activate`

3. Installez les dépendances :
```bash
pip install -r requirements.txt
```

4. Configurez l'email dans `backend/chessformation/settings.py` :
   - `EMAIL_HOST_USER` : Votre adresse email
   - `EMAIL_HOST_PASSWORD` : Votre mot de passe ou app password
   - `DEFAULT_FROM_EMAIL` : Votre adresse email

5. Lancez le serveur Django :
```bash
python manage.py runserver
```

Le serveur sera accessible sur `http://localhost:8000`

### Frontend (React)

1. Installez les dépendances :
```bash
cd frontend
npm install
```

2. Lancez le serveur de développement :
```bash
npm run dev
```

Le serveur sera accessible sur `http://localhost:5173`

## Configuration Email

Pour que l'envoi d'email fonctionne, vous devez configurer les paramètres SMTP dans `backend/chessformation/settings.py`.

### Exemple pour Gmail :

1. Activez l'authentification à deux facteurs
2. Générez un "App Password" dans votre compte Google
3. Utilisez cet app password dans `EMAIL_HOST_PASSWORD`

### Exemple pour d'autres fournisseurs :

Modifiez `EMAIL_HOST`, `EMAIL_PORT`, et `EMAIL_USE_TLS` selon votre fournisseur.

## API Endpoint

- **POST** `/api/contact/`
  - Body (JSON): `{ "name": "...", "email": "...", "message": "..." }`
  - Response: `{ "success": true }` ou `{ "success": false, "errors": [...] }`

## Notes

- Pas de base de données nécessaire
- Pas d'admin Django
- CORS configuré pour `localhost:5173`
- Le site est entièrement en français

