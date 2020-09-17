##
## Stage 1 - Build using node as builder (contains yarn, node and other)
##
FROM docker.lnd.bz/nodejs:10 as builder

## important! declare ARGS for each stage where you need to use it
USER root
COPY . /opt
WORKDIR /opt

RUN yarn install
RUN yarn build:ssr

##
## Stage 2 - Create image with frontend javascript chunks and ssr server which serves node
##
FROM docker.lnd.bz/nodejs:10

ENTRYPOINT ["node", "dist/server/main.js"]

COPY --from=builder /opt/dist /opt/dist/

EXPOSE 80
WORKDIR /opt
