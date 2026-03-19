#!/bin/bash

FILE="server.js"

# Abrir index.html en el navegador (Linux)
xdg-open index.html &

# Revisar nodemon local
if [ -f "node_modules/.bin/nodemon" ]; then
  echo "Iniciando con nodemon local..."
  ./node_modules/.bin/nodemon $FILE
  exit 0
fi

# Si no existe nodemon local
echo "⚠️ No se encontró nodemon local en node_modules!"
read -p "Presiona Enter para salir..."
exit 1
