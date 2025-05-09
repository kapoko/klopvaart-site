# klopvaart-site

Wordpress website for Klopvaart, a cohousing association 

## Requirements 

- Node v23 or higher
- Docker

## Development

Copy `.env.example` to `.env` and fill in the variables.

### WP-Cli

```
docker compose run --rm wordpress-cli --path='web/wp' <cli command>
```
