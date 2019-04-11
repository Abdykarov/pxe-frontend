##
FROM docker.lnd.bz/nodejs:10 as builder

## important! declare ARGS for each stage where you need to use it
USER root
COPY . /opt
WORKDIR /opt

RUN yarn install
RUN yarn build:ssr


FROM docker.lnd.bz/nodejs:10
EXPOSE 4200


FROM docker.lnd.bz/nodejs:10

COPY --from=builder /opt/dist /opt/dist/

WORKDIR /opt
ENTRYPOINT ["node", "dist/server.js"]
