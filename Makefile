SHELL := /bin/bash
PATH := node_modules/.bin:$(PATH)
JEST_ARGS :=

up:
	docker-compose up --force-recreate

test:
	docker-compose run --rm app npm run test

services:
	docker-compose up --force-recreate postgres