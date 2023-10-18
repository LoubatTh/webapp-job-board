# Description: Backend Makefile

.PHONY: help

init: install makemigrations migrate ## Initialize the application

up: ## Start the application
	@echo "Starting the application..."
	docker-compose up --build --detach --force-recreate --remove-orphans

down: ## Stop the application
	@echo "Stopping the application..."
	docker-compose down

restart: down up ## Restart the application

reload-migration: makemigrations migrate ## Reload the migration

makemigrations: ## Make migrations
	@echo "Making migrations"
	docker-compose exec backend python3 manage.py makemigrations

migrate: ## Migrate the database
	@echo "Migrating"
	docker-compose exec backend python3 manage.py migrate

install: ## Install Python dependencies
	@echo "Migrating"
	docker-compose exec backend pip install -r requirements.txt

help:
	@echo "Job board Backend Tasks"
	@cat $(MAKEFILE_LIST) | grep -e "^[a-zA-Z_\-]*: *.*## *" | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
	@echo ""