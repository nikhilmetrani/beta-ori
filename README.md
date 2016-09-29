#Beta-Ori

The fornt-end for Alpha-Umi REST API server.

[![Build Status](https://travis-ci.com/nikhilmetrani/beta-ori.svg?token=bQkogbxFfYCzp5uJhLW7&branch=devcenter)](https://travis-ci.com/nikhilmetrani/beta-ori)

Dependencies
-------------

<a href="https://david-dm.org/nikhilmetrani/beta-ori"><img src="https://david-dm.org/nikhilmetrani/beta-ori.svg" alt="Dependency Status"></a>
<a href="https://david-dm.org/nikhilmetrani/beta-ori/?type=dev"><img src="https://david-dm.org/nikhilmetrani/beta-ori/dev-status.svg" alt="devDependency Status"></a>

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
            +-- **              <= Component sub directories and source files (*.ts, *.html, *.scss)
            +-- index.ts      <= Exported classes
        +-- core/
            +-- **              <= Core sub directories and source files (*.ts)
            +-- index.ts      <= Exported classes
        +-- app.component.html
        +-- app.component.scss
        +-- app.component.ts
        +-- app.module.ts
        +-- app.routing.ts
    +-- public/
        +-- error/
            +-- 404.css
            +-- 404.html
            +-- 404.png
        +-- img/
            +-- favicon.ico
        +-- index.html
        +-- service-worker.js
    +-- style/
        +-- app.scss
    +-- main.ts
    +-- polyfills.ts
    +-- vendor.ts
+-- .gitignore
+-- gulpfile.js
+-- karma-shim.js
+-- karma.conf.js
+-- package.json
+-- protractor.conf.js
+-- README.md
+-- tsconfig.json
+-- tslint.json
+-- typedoc.json
+-- webpack.conf.json
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
    +-- coverage <= Test coverage reports build location (git ignored)
    +-- dist <= Build output location (git ignored)
    +-- doc <= Documentation output location (git ignored)
    +-- node_modules <= npm packages (git ignored)
    +-- src
    +-- *
```

Watching for changes:

```
> npm run watch
> npm run gulp-watch
```

_These tasks will watch for changes in src folder and execute the build and deploy tasks respectively._

References
---------

- https://angular.io/
