#!/bin/sh
set -e

echo "==> Waiting for database connection..."
MAX_TRIES=30
COUNT=0
while [ $COUNT -lt $MAX_TRIES ]; do
  if npx prisma db execute --stdin > /dev/null 2>&1 <<EOF
SELECT 1;
EOF
  then
    echo "==> Database is ready!"
    break
  fi
  COUNT=$((COUNT + 1))
  echo "Database not ready yet... retry $COUNT/$MAX_TRIES"
  sleep 2
done

echo "==> Running Prisma migrations..."
npx prisma migrate deploy

echo "==> Starting Shomakal backend..."
exec node dist/main
