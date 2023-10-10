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
- Python3 et pip
- Node et npm
- Docker

### Installation du frontend :
```bash
cd frontend/
npm i
```

### Installation du backend : 
> Si votre IDE ne trouve pas les paquets après l'installation, veillez à sélectionner le bon interpréteur Python.
```bash
cd backend/
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
```


### Lancer les conteneurs docker : 
> Lors du premier lancement des conteneurs, Django est prêt avant la base de données, ce qui génère une erreur, pour corriger cette erreur et pouvoir éffectuer la migration, il faut : relancer les conteneurs **ou** relancer django dans le conteneur.
```bash
docker-compose up --build --detach
make backend-reload-migration
```
