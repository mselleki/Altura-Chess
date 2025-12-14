# 🚀 Démarrage Rapide

## ✅ Tout est déjà installé !

Les dépendances sont installées. Vous pouvez maintenant lancer le site.

## 📋 Pour lancer le site :

### Option 1 : Utiliser les scripts (RECOMMANDÉ)

1. **Double-cliquez sur `start-backend.bat`** 
   - Ouvre une fenêtre avec le serveur Django
   - Laissez cette fenêtre ouverte

2. **Double-cliquez sur `start-frontend.bat`** (dans une NOUVELLE fenêtre)
   - Ouvre une fenêtre avec le serveur React
   - Laissez cette fenêtre ouverte

3. **Ouvrez votre navigateur** et allez sur : **http://localhost:5173**

### Option 2 : Commandes manuelles

**Terminal 1 (Backend) :**
```bash
cd backend
venv\Scripts\activate
python manage.py runserver
```

**Terminal 2 (Frontend) :**
```bash
cd frontend
npm run dev
```

Puis ouvrez **http://localhost:5173** dans votre navigateur.

---

## ⚠️ Important

- Gardez les **2 fenêtres ouvertes** pendant que vous utilisez le site
- Pour arrêter : fermez les fenêtres ou appuyez sur `Ctrl+C` dans chaque terminal

## 📧 Configuration Email (optionnel)

Pour que le formulaire fonctionne, modifiez `backend/chessformation/settings.py` avec vos paramètres email.

