# Lead Scoring Prototipo

Questo repository contiene il prototipo "RailConnect B2B".

Deploy su Netlify
1. Collega il repo a Netlify (New site → Import from Git).
2. In Netlify Site settings → Environment → aggiungi `GEMINI_API_KEY` con la chiave Google.
3. (Opzionale) Aggiungi i segreti GitHub `NETLIFY_AUTH_TOKEN` e `NETLIFY_SITE_ID` per il deploy automatico via Action.

Ignora la cartella `old/` (già presente in .gitignore).

Per fare il push da locale:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/hfold/lead_scoring_ti.git
git push -u origin main
```

Se vuoi che io esegua il push, aggiungi le credenziali Git (o esegui tu i comandi).