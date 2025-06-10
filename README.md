# klopvaart-site

Wordpress website for Klopvaart, a cohousing association.

## Requirements

- Node v23 or higher
- Composer
- Docker

## Development

Copy `.env.example` to `.env` and fill in the variables. Run `composer install` and `npm install`.

To start development:

```
docker compose up
```

```
npm run start
```

### WP-Cli

Run [wp cli](https://developer.wordpress.org/cli/commands/) commands in the container with:

```sh
docker compose run --rm wordpress-cli --path='web/wp' <cli command>
```
#### Import database 
For example, to import a copy of the database, put it at `./database/db.sql` and run:
```sh
docker compose run --rm -v ./database:/tmp/ wordpress-cli --path='web/wp' db import /tmp/db.sql
```
Change `import` to `export` to get a dump of the local database. 

If the copy comes from the server, replace the live urls in the db with the local equivalent:
```sh
docker compose run --rm wordpress-cli --path='web/wp' search-replace https://klopvaart.nl http://localhost:8080
```

### Uploads

To get an exact copy of the live website, import the db as described above and copy the `uploads` folder in `wp-content` from the server to your local environment at `web/wp-content`.
