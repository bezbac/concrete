#!/bin/bash
LATEST_INTELLIJ_VERSION="$(ls ~/Library/Application\ Support/JetBrains | grep 'IntelliJ' | tail -1)"

cp "./output/concrete.intellij.jar" "$HOME/Library/Application Support/JetBrains/${LATEST_INTELLIJ_VERSION}/plugins"
