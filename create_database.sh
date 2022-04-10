docker run \
  --name ignite-challenge-database-queries \
  -e POSTGRES_DB=queries_challenge \
  -e POSTGRES_PASSWORD=docker \
  -p 5432:5432 \
  -d postgres
