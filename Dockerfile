FROM denoland/deno:latest


ARG GIT_REVISION
ENV DENO_DEPLOYMENT_ID=${GIT_REVISION}

WORKDIR /app
COPY app .

RUN deno cache main.ts

EXPOSE 8000

CMD ["run", "-A", "main.ts"]
