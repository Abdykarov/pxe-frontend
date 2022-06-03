FROM docker.lnd.bz/nginx:1.20_non-root

ARG APP

COPY --chown=nginx:nginx ./dist/$APP /var/www/
