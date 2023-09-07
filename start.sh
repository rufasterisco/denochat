#!/bin/bash
export GIT_REVISION=$(git rev-parse HEAD || echo $RANDOM)
docker-compose up --build
