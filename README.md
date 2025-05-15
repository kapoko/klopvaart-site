# klopvaart-site

Wordpress website for Klopvaart, a cohousing association 

## Requirements 

- Node v23 or higher
- Docker

## Development

Copy `.env.example` to `.env` and fill in the variables. Run `composer install`.

Run:

```
docker compose up
```

```
npm run start
```

### WP-Cli

Run wp cli commands in the container with:

```
docker compose run --rm wordpress-cli --path='web/wp' <cli command>
```
