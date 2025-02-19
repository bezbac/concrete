## Create a new release

`pnpm release`

### Release vscode extension

`cd output/vscode`  
`vsce package`  
`vsce publish`

### Package intelliJ plugin

1. Build the project
2. Open `./output/intellij` in intellij
3. Run "Build" -> "Prepare Plugin Module 'concrete' for Deployment"
