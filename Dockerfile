FROM docker.lnd.bz/nginx:1.20

COPY ./dist/app/ /var/www/
