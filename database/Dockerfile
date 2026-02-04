FROM postgres:16-alpine

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=books

# This command copies new table structure into the auto-run folder
COPY init.sql seed.sql /docker-entrypoint-initdb.d/

EXPOSE 5432