
## Directory Structure
```bash
.
├── build                       # Built, ready to serve app.
├── config                      # Root folder for configurations.
│   ├── types                   # Global type definitions, written by us.
│   ├── utils                   # Utils for config.
│   ├── webpack                 # Webpack configurations.
│   ├── index.js                # Combines main.js and main.local.js
│   ├── main.js                 # Default App configurations.
│   └── main.local.js           # Local App configurations.
├── node_modules                # Node Packages.
├── src                         # Source code.
│   ├── app                     # App folder.
│   │ ├── components            # Unconnected Components.
│   │ ├── constants             # Constants that are used throughout project like Color and FontSize
│   │ ├── containers            # Redux-Connected Components.
│   │ ├── helpers               # Helper Functions.
│   │ ├── images                # Images folder.
│   │ ├── pages                 # Page-like Components.
│   │ ├── redux                 # Redux related code aka data layer of the app.
│   │ │   ├── modules           # Redux modules.     
│   │ │   ├── configureStore.ts # Redux store, contains global app state.
│   │ │   ├── IStore.ts         # Store shape.
│   │ │   └── rootReducer.ts    # Main reducers file to combine them.    
│   │ ├── routes                # Routes.
│   │ ├── sagas                 # Saga files.
│   │ └── selectors             # Redux selectors.
│   ├── vendor                  # Dealing with resources
│   ├── client.tsx              # Entry point for client side rendering.
│   ├── favicon.ico             # Favicon
│   ├── index.html              # html file for client side rendering
│   └── server.tsx              # Entry point for server side rendering.
├── .dockerignore               # Tells docker which files to ignore.
├── .editorconfig               # Configuration for editors.
├── .gitignore                  # Tells git which files to ignore.
├── Dockerfile                  # Dockerfile.
├── LICENSE                     # License file
├── package.json                # Package configuration.
├── package-lock.json           # Package lock
├── README.md                   # This file
├── styleguide.config.js        # Config for doc
├── tsconfig.json               # TypeScript transpiler configuration.
├── tslint.json                 # Configures tslint.
```

## Installation

You can clone from this repository and use master

```bash
$ git clone https://github.com/sidzan/ts-react-boilerplate
$ cd ts-react-boilerplate
$ npm install
```

## Usage

All commands defaults to development environment. You can set `NODE_ENV` to `production` or use the shortcuts below.

```bash
# Running

$ npm start # This starts the app in development mode

# Starting it with the production build
$ NODE_ENV=production npm start # or
$ npm run start:prod

# Building 

$ npm build # This builds the app in development mode

# Commands below builds the production build
$ NODE_ENV=production npm build # or
$ npm run build:prod
```
