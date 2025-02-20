# This script was based on https://github.com/openmindculture/intellij-cute-pink-light-theme/blob/main/build.sh
echo "build theme distribution ..."
mkdir -pv build/concrete
rm -rf build/concrete/*
mkdir -pv build/concrete/lib
mkdir -pv build/concrete
cp -rv resources/* build/concrete/
cd build/concrete/
zip -rv ../../../concrete.intellij.jar ./*
