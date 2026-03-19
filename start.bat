@echo off
REM -------------------------------
REM Start script para Windows
REM Usa solo nodemon local
REM -------------------------------

SETLOCAL

SET ROOT_DIR=%~dp0
SET NODE_MODULE_BIN=%ROOT_DIR%node_modules\.bin
SET FILE=server.js

REM Abrir index.html en navegador predeterminado (no bloquea)
start "" "index.html"

REM Comprobar nodemon local
IF EXIST "%NODE_MODULE_BIN%\nodemon.cmd" (
    echo Iniciando con nodemon local...
    "%NODE_MODULE_BIN%\nodemon.cmd" %FILE%
    GOTO END
)

REM Ninguno encontrado
echo ⚠️ No se encontró nodemon local!
pause

:END
ENDLOCAL
