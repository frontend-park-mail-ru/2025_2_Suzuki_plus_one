# Set up

## Install dependencies

```bash
npm init -y
# npm install express
# npm install --save-dev nodemon prettier
npm install # Call this if you have a package-lock.json file
```

## Build

This command compiles Handlebars templates into a single JavaScript file.

```bash
npm run build
```

## Lint

```bash
# Make sure to be located in the project root directory
npx prettier . --write
```
