
## Directory Structure
```bash
.
├── build                       # Built, ready to serve app. ( hosted on firebase)
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
$ git clone https://github.com/sidzan/ny-times.git
$ cd ny-times
$ npm install
```

## Usage

All commands defaults to development environment with Server Side Rendering Enabled. You can set `NODE_ENV` to `production` or use the shortcuts below.

```bash
# Running

$ npm start # This starts the app in development mode

# go to port 3300 of your machine



# run using docker

$ docker build -t nytimes .
$ docker run -d --rm --env HOST=0.0.0.0 --name nytimes -p 3300:3300 nytimes

# go to port 3300 of your machine

```


## ADVANCED

To Disable Server side- rendering, open `config/main.js` and `config/main.local.js`
```bash
# change     ssr: true,

ssr: false # This starts the app without ssr 
```


# TODOS:
- improve caching
- create production ready
- handle details page when loaded directly
