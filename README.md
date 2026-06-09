# TaskFlow

Application full-stack simple pour apprendre Python.

## Objectif

Construire une application de gestion de taches (todo list) avec:

- un backend en Python avec FastAPI
- un frontend simple (HTML/CSS/JS)

## Structure du projet

```text
taskflow/
  backend/   # API FastAPI
  frontend/  # interface web
```

## Checklist de demarrage (30 secondes)

Ouvre **2 terminaux** dans Cursor (`Terminal` → `New Terminal`).

**Terminal 1 — Backend**
```bash
cd /Users/evatharrats/Documents/Cursor/taskflow/backend
source .venv/bin/activate
uvicorn app.main:app --reload
```

**Terminal 2 — Frontend**
```bash
cd /Users/evatharrats/Documents/Cursor/taskflow/frontend
python3 -m http.server 5500
```

**Ouvrir dans le navigateur**
- App: http://127.0.0.1:5500
- API (Swagger): http://127.0.0.1:8000/docs

**Arreter**
- `Ctrl + C` dans chaque terminal

## Backend

Le backend permet de:

- creer une tache
- lister les taches
- modifier le statut (`todo`, `in_progress`, `done`)
- modifier le titre
- supprimer une tache

Le frontend charge les taches automatiquement a l'ouverture.

Le stockage est fait dans `backend/data/tasks.json` (sans base de donnees).
