build:
	deno run --unstable --allow-read --allow-write src/main.ts

apply/vscode:
	rm -rf ~/.vscode/extensions/bezbac.concrete-0.1.0 && cp -R './output/vscode' ~/.vscode/extensions/bezbac.concrete-0.1.0
