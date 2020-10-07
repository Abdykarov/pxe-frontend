FROM docker.lnd.bz/nodejs:10

LABEL maintainer="devops@lundegaard.eu"
LABEL author="ondrej.kopal@lundegaard.eu"

ENV ENV $ENV
ENV YARN_RUN $YARN_RUN

WORKDIR /opt

EXPOSE 4200

# Run
ENTRYPOINT ["./run-application.sh"]
