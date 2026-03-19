#!/bin/bash

FILE="server.js"

# Revisar nodemon local
if [ -f "node_modules/.bin/nodemon" ]; then
  echo "Iniciando con nodemon local..."
  xdg-open index.html
  ./node_modules/.bin/nodemon $FILE
  exit 0
fi

# Revisar nodemon global
if command -v nodemon > /dev/null; then
  echo "Iniciando con nodemon global..."
  xdg-open index.html
  nodemon $FILE
  exit 0
fi

# Revisar node
if command -v node > /dev/null; then
  echo "Nodemon no encontrado, iniciando con node..."
  xdg-open index.html
  node $FILE
  exit 0
fi

# Ninguno encontrado
echo "⚠️ No se encontró Node.js ni Nodemon!"
read -p "Presiona Enter para salir..."
exit 1
