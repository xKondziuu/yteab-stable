@echo off


:: Kopiowanie skompilowanych plików css z folderu ./src do wyjściowego dist/.top

setlocal enabledelayedexpansion

set "source_dir=src"
set "destination_dir=dist\.top"

for /d %%I in (%source_dir%\*) do (
  set "src_folder=%%I"
  set "dest_folder=%destination_dir%\%%~nxI\css"
  xcopy "!src_folder!\scss\css" "!dest_folder!" /e /c /i /y
)

timeout 1 > nul
endlocal



:: Kopiowanie zawartości folderu ogólnego do folderów z zawartością do przeglądarek

cd "dist/.top"

xcopy "*" "../chrome/" /e /c /i /y
xcopy "*" "../mozilla/" /e /c /i /y

cd ../..


echo Done!