#!make

logs:
	docker-compose logs -f;

start:
	docker-compose up;

stop:
	docker-compose down;

build:
	docker-compose build;
	docker-compose up -d;

rebuild:
	docker-compose down;
	sudo rm -rf data;
	docker-compose build;
	docker-compose up -d;