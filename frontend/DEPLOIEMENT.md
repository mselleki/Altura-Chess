# Guide de déploiement sur Vercel

## ✅ Configuration effectuée

- ✅ `vercel.json` créé pour gérer les routes
- ✅ Variable d'environnement `VITE_API_URL` configurée dans le code
- ✅ Fichier `.env.example` créé pour référence

## 📋 Étapes de déploiement

### 1. Préparer le projet localement

```bash
cd frontend
npm install
npm run build
npm run preview
```

Vérifiez que le build fonctionne sans erreur.

### 2. Pousser sur GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <votre_repo_url>
git push -u origin main
```

### 3. Déployer sur Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur **Add New → Project**
3. Connectez votre compte GitHub
4. Sélectionnez votre repository
5. Vercel détectera automatiquement Vite. Sinon, configurez :
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Root Directory:** `frontend` (si votre repo contient frontend et backend)
6. Cliquez sur **Deploy**

### 4. Configurer les variables d'environnement

Si vous avez un backend Django déployé :

1. Dans Vercel, allez dans **Project → Settings → Environment Variables**
2. Ajoutez :
   - **Key:** `VITE_API_URL`
   - **Value:** L'URL de votre backend (ex: `https://api.votresite.com`)
   - **Environments:** Production + Preview
3. Cliquez sur **Save**
4. **Redeploy** le projet pour appliquer les changements

### 5. Domaine personnalisé (optionnel)

1. Dans Vercel, allez dans **Project → Settings → Domains**
2. Ajoutez votre domaine
3. Configurez les DNS selon les instructions de Vercel

## 🔧 Configuration locale

Pour le développement local, créez un fichier `.env` dans le dossier `frontend` :

```env
VITE_API_URL=http://localhost:8000
```

⚠️ **Important:** Ne commitez jamais le fichier `.env` (il est déjà dans `.gitignore`)

## 📝 Notes importantes

- Le fichier `vercel.json` gère les routes pour éviter les erreurs 404 au refresh
- Les variables d'environnement doivent commencer par `VITE_` pour être exposées par Vite
- Le dossier de build est `dist` (par défaut pour Vite)

## 🐛 Dépannage

### Erreur 404 au refresh
- Vérifiez que `vercel.json` est présent à la racine du dossier `frontend`

### Variables d'environnement non prises en compte
- Vérifiez que le nom commence par `VITE_`
- Faites un **Redeploy** après avoir ajouté/modifié les variables

### Build échoue
- Vérifiez que `npm run build` fonctionne en local
- Consultez les logs de build dans Vercel

