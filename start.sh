#!/bin/bash

FILE="server.js"

xdg-open index.html &

# Revisar nodemon local
if [ -f "node_modules/.bin/nodemon" ]; then
  echo "Iniciando con nodemon local..."
  ./node_modules/.bin/nodemon $FILE
  exit 0
fi

# Revisar nodemon global
if command -v nodemon > /dev/null; then
  echo "Iniciando con nodemon global..."
  nodemon $FILE
  exit 0
fi

# Revisar node
if command -v node > /dev/null; then
  echo "Nodemon no encontrado, iniciando con node..."
  node $FILE
  exit 0
fi

# Ninguno encontrado
echo "⚠️ No se encontró Node.js ni Nodemon!"
read -p "Presiona Enter para salir..."
exit 1
