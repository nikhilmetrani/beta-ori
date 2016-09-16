#Beta-Ori

The fornt-end for Alpha-Umi REST API server.

Dependencies
-------------

- nodejs - current version - https://nodejs.org/en/
- gulp and gulp-cli
- typings
- typescript

Dependency setup
-------

1. Install NodeJs Current version from https://nodejs.org/en/
    >Run `node -v && npm -v` to verify the versions

    ```
    node -v && npm -v
    v6.4.0
    3.10.3
    ```
2. Install npm dependencies

    ```
    npm install gulp -g
    npm install gulp-cli -g
    npm install typings -g
    npm install typescript -g
    ```
    Use sudo prefix on Linux and OSX

Source structure
-------

The source folder structure is described below.

```
beta-ori/
+-- src
    +-- app/
        +-- components/
            +-- **              <= Component sub directories and source files (*.ts, *.html, *.css)
            +-- exports.ts      <= Exported classes
        +-- core/
            +-- **              <= Core sub directories and source files (*.ts)
            +-- exports.ts      <= Exported classes
        +-- app.html
        +-- app.component.ts
        +-- app.module.ts
        +-- app.routes.ts
        +-- main.ts
    +-- index.html
    +-- systemjs.config.js
+-- .gitignore
+-- gulpfile.ts
+-- package.json
+-- Readme.md
+-- tsconfig.json
+-- tslint.json
+-- typings.json
```

Coding conventions
-------

The project adheres to Microsoft [TypeScript coding guidelines](https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines "Open link") and [Angular 2 style guide](https://angular.io/styleguide "Open link").

`In case of conflicts between the two styles, Angular 2 style guide takes priority.`

Running
-------

Clone the repository:

> git clone https://github.com/nikhilmetrani/beta-ori.git

Navigate to `beta-ori` directory:

> cd beta-ori

Install dependencies:

> npm install

`node_modules` and `typings` directories should be created during the install.

If `typings` folder is not created, run `npm run postinstall`

Build the project:

> npm run clean & npm run build

`build` directory should be created during the build

```
> clean - To clean up the output folders - build and int
> build - To build the project
```

Deploy the project:

> npm run deploy

This will deploy the build into resources/public folder of alpha-umi project.

```
parent/
+-- alpha-umi
    +-- src
        +-- main
            +-- resources
                +-- public <= Deployment location (git ignored)
+-- beta-ori
    +-- build <= Build location (git ignored)
    +-- int <= Intermediate build location (git ignored)
    +-- node_modules <= npm packages (git ignored)
    +-- src
    +-- .gitignore
    +-- gulpfile.ts
    +-- package.json
    +-- Readme.md
    +-- tsconfig.json
    +-- tslint.json
    +-- typings.json
```

Watching for changes:

> npm run watch

_This task will watch for changes in src folder and execute the build and deploy tasks._

References
---------

- https://angular.io/
