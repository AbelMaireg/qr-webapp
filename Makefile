DEV_COMPOSE=dev.compose.yml

.PHONY: all

build:
	docker compose -f $(DEV_COMPOSE) build

up:
	docker compose -f $(DEV_COMPOSE) up

down: 
	docker compose -f $(DEV_COMPOSE) down

build-up: build up
