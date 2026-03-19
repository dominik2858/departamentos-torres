@echo off
REM -------------------------------
REM Start script para Windows
REM Busca nodemon -> node -> error
REM Compatible con proyectos Node locales
REM -------------------------------

SETLOCAL

REM Ruta del proyecto actual
SET ROOT_DIR=%~dp0
SET NODE_MODULE_BIN=%ROOT_DIR%node_modules\.bin

REM Archivo principal a ejecutar
SET FILE=server.js

REM Comprobar nodemon local primero
IF EXIST "%NODE_MODULE_BIN%\nodemon.cmd" (
    echo Iniciando con nodemon local...
    "%NODE_MODULE_BIN%\nodemon.cmd" %FILE%
    GOTO END
)

REM Comprobar nodemon global
where nodemon >nul 2>&1
IF %ERRORLEVEL%==0 (
    echo Iniciando con nodemon global...
    start "" "index.html"
    nodemon %FILE%
    GOTO END
)

REM Comprobar node global
where node >nul 2>&1
IF %ERRORLEVEL%==0 (
    echo Nodemon no encontrado, iniciando con node...
    start "" "index.html"
    node %FILE%
    GOTO END
)

REM Ninguno encontrado
echo ⚠️ No se encontró Node.js ni Nodemon!
pause

:END
ENDLOCAL
