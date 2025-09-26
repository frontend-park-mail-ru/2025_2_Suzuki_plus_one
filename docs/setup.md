# Set up

## Quick start

```bash
# Update your local repository
git pull
# Create and switch to a new branch
git checkout -b <new_branch_name>
# Install node dependencies and build the project
npm run setup
# Start the dev server
npm run hotstart
```

## Install dependencies

```bash
npm init -y
# npm install express
# npm install --save-dev nodemon prettier
npm install # Call this if you have a package-lock.json file
```

## Start

```bash
# Start the server
npm run start
# Start the server with hot reload (development only)
npm run hotstart
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
