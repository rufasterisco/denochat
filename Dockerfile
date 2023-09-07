# First stage: Deno build
# FROM denoland/deno:v1.36.3 as deno-build
FROM lukechannings/deno:v1.36.3 as deno-build


ARG GIT_REVISION
ENV DENO_DEPLOYMENT_ID=${GIT_REVISION}

WORKDIR /app
COPY app .

RUN deno cache main.ts

EXPOSE 8000

CMD ["run", "-A", "main.ts"]
