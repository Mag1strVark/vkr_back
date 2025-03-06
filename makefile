init:
	yarn prisma init

compose:
	docker compose up --build -d

migrate:
	yarn prisma migrate dev --name init

generate:
	yarn prisma generate
