FROM docker.lnd.bz/nginx:1.20_non-root

ARG APP

COPY ./dist/$APP /var/www/
