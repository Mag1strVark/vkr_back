## Docker

```
# Сборка
docker build -t client .

# Запуск
docker run -d -p 80:80 client
```

### или

```
docker compose up --build -d
```

## Команды

> Заметка: запускать через `yarn «имя команды»`

| Команда      | Описание                                       |
|--------------|------------------------------------------------|
| `install`    | Установить зависимости                         |
| `start:dev`  | Запустить Development режим                    |
| `start:prod` | Запустить Production режим                     |
| `lint`       | Проверяет наличие ошибок во всём проекте       |
| `lint --fix` | Исправление ошибок во всём проекте             |
| `build`      | Собрать проект                                 |
| `preview`    | Просмотр собранного проекта                    |
| `format`     | форматирование всего кода по правилам prettier |


## Environment variables

_Примечание: Переменные, не имеющие значений по умолчанию, являются обязательными_

| Название          | Значение                                                                                                                                         | Описание             |
|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|----------------------|
| POSTGRES_USER     | root                                                                                                                                             | Имя пользователя     |
| POSTGRES_PASSWORD | root                                                                                                                                             | Пароль               |
| POSTGRES_DB       | db                                                                                                                                               | Имя базы данных      |
| PORT              | 5432                                                                                                                                             | Порт БД              |
| DATABASE_URL      | postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@dpg-cqbfftrv2p9s73eqlqvg-a.singapore-postgres.render.com:${PORT}/${POSTGRES_DB}?schema=public | URL БД               |
| URL_CLIENT        | http://localhost:3000                                                                                                                            | URL Клиентской части |
| REDIS_HOST        | redis                                                                                                                                            | Имя пользователя     |
| REDIS_PORT        | 6379                                                                                                                                             | Имя пользователя     |
| JWT_SECRET        | qrUFW323rgrth43fewpo                                                                                                                             | Имя пользователя     |

