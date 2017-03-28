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
