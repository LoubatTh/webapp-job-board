# ⚒️ Job Board (T-WEB-501-TLS_5) 

## Équipe
- Thomas Loubat
- Talal Bounaama

## Stack
- React (+ Tailwind)
- Django
- Postgres

## Installation

**Pré-requis**
- Python3
- Node (and npm)
- Docker

Installation des paquets du frontend :
```bash
cd frontend/
npm i
```

Installation du backend : 
```bash
cd backend/
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
```
*Si VSCode ne trouve pas les paquets après l'installation, veillez à sélectionner le bon interpréteur*


Lancer les conteneurs docker
```bash
docker-compose up --build --detach
```