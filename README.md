Quick start:

1. If you haven't got webpack: `npm install webpack -g`

2. `npm install` to install dependencies.

3. Before running webpack  you need to change the file 'webpack.server.config': 
    
    14: target: ''  , will be haii endpoint url
    
4. Run webpack dev server `npm run dev-server`
    - Development server will be started at localhost: 8084
    - Source code changes will be tracked and bundle rebuild will perform automatically

To get development assets, run `npm run build-dev`. Assets will appear in the ./build directory.

To run the project without Dev tools you can use command `npm run prod-server`. This command should also run the project in a production environment.

To get production assets, run `npm run build`. Assets will appear in the ./build directory. Compressed assets will appear in ./build/gzip directory.

If you have an error in the CSS files after opening any page of the site, you need to run the command `npm rebuild node-sass`