#!/bin/bash

# set HOST variable
HOST="--host=0.0.0.0"
if [ $ENV ]
then
    echo "APP ENVIRONMENT: $ENV"
    echo "COMMAND: yarn $YARN_RUN -c $ENV $HOST"
else
    echo "COMMAND: yarn $YARN_RUN $HOST"
fi

yarn install

{
    if [ $ENV ]
    then
        yarn $YARN_RUN -c $ENV $HOST
    else
        yarn $YARN_RUN $HOST
    fi

} || { # catch
    echo "YARN_RUN ($YARN_RUN) or ENV ($ENV) arguments are not correctly set."
    echo "RUN COMMAND: yarn start --host=0.0.0.0"
    yarn start --host=0.0.0.0
}
