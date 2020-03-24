# Uix Documentation


## Installation And Test

You will need to have [node](https://nodejs.org/) setup on your machine. That will output the built distributables to `./dist/*` and `./examples/*.html`.



**Step 1.** Download the latest version from [Github](https://github.com/xizon/uix-documentation). For nodejs you have to install some dependencies.

```sh
$ git clone git://github.com/xizon/uix-documentation.git
```


**Step 2.** First, using an absolute path into your `"uix-documentation/"` folder directory.

```sh
$ cd /{your_directory}/uix-documentation
```


**Step 3.** Before doing all dev stuff make sure you have `Node 10+` installed. After that, run the following code in the main directory to install the node module dependencies.

```sh
$ sudo npm install --only=dev --unsafe-perm --production
```


**Step 4.** Run the following code to enter development mode. The converted ES5 files will be created.

```sh
$ npm run build
```

**Step 5.** When you done, this will spin up a server that can be accessed at

```sh
http://localhost:8080/examples/
```


### Note:
 
**ERROR: npm update check failed.**

```sh
$ sudo chown -R $USER:$(id -gn $USER) /Users/{username}/.config
```



* * *


## File Structures



```sh

uix-documentation/
├── README.md
├── LICENSE
├── webpack.config.js
├── package-lock.json
├── package.json
├── dist/
│   ├── css/
│   │   ├── app.css
│   │   ├── app.css.map
│   │   ├── app.min.css
│   │   └── app.min.css.map
│   └── js/
│   │   ├── app.js
│   │   ├── app.js.map
│   │   ├── app.min.js
│   │   └── app.min.js.map
├── src/
│   ├── index.js
│   ├── components/
├── examples/
└──
```



## Licensing

Licensed under the [MIT](https://opensource.org/licenses/MIT).


