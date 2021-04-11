build:
	deno run --unstable --allow-read --allow-write src/main.ts

publish/vscode:
	cd output/vscode && vsce publish

apply/vscode:
	rm -rf ~/.vscode/extensions/bezbac.concrete-vscode-0.1.0 && cp -R './output/vscode' ~/.vscode/extensions/bezbac.concrete-vscode-0.1.0
