# TaskFlow

Application full-stack simple pour apprendre Python.

## Objectif

Construire une application de gestion de taches (todo list) avec:

- un backend en Python avec FastAPI
- un frontend (a venir)

## Structure du projet

```text
taskflow/
  backend/   # API FastAPI (pret)
  frontend/  # interface web (a venir)
```

## Backend (etat actuel)

Le backend permet de:

- creer une tache
- lister les taches
- modifier le statut (`todo`, `in_progress`, `done`)
- supprimer une tache

Le stockage est fait dans `backend/data/tasks.json` (sans base de donnees).

## Lancer le backend

```bash
cd backend
source .venv/bin/activate
uvicorn app.main:app --reload
```

Puis ouvrir:

- http://127.0.0.1:8000/docs
