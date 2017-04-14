# Sample App

To run the dev server:

```
yarn install
yarn start
```

Navigate your browser to http://localhost:4000/sample-app

If you want to run the Spring Server:

```
./gradlew bootRun
```

It starts up on http://localhost:8093/sample-app. This isn't necessary, but I left it in as it is the server I am using.

When switching between **master** and **react-router-4** branches, clean up the `node_modules` directory to get the 
correct dependencies.

```
rm ./node_modules
yarn install
yarn start
```

## Troubles with Hot Module Replacement - UPDATE: Fixed as of April 14/17

This is only a problem when using `react-router 3.0.2` in the master branch. Version 4.0.0 works fine, react-router-4 branch.  

Make changes to some JSX while webpack dev-server is running. Changes are detected. App recompiles. Browser does not update. Changes are reflected if the browser is refreshed.

Console log:

```
[WDS] App updated. Recompiling...
[WDS] App hot update...
[HMR] Checking for updates on the server...
[WDS] App hot update...
XHR finished loading: GET "http://localhost:4000/sample-app/9dca3639ba77c6e730eb.hot-update.json".
[HMR] Updated modules:
[HMR]  - ./src/main/web/app/routes/About/index.js
[HMR] App is up to date.
```
