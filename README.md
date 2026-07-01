# React Query — кастомная реализация

Реализация клиентского кэширования запросов.

- Кастомный `CacheProvider` с ручной инвалидацией кэша
- Дедупликация запросов `inflightRequests`
- Подписка на изменения кэша `subscribers`
- Написан Dockerfile

## Docker

```bash
# Сборка образа
docker build -t react-query-app .

# Запуск
docker run -d -p 8080:80 react-query-app
```
