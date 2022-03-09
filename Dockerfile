FROM docker.lnd.bz/nginx:1.20

ARG APP

COPY ./dist/$APP /var/www/
