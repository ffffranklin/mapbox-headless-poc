mapbox-headless-poc
===================

### Getting Started

Perform capture with the following command

```sh
npm run capture
```

the output should look something like this

<img src="https://github.com/ffffranklin/mapbox-headless-poc/raw/master/public/log.png" alt="log" width="660" />

The server script will load and serve `index.html` and generate a image and pdf screen shot. For example:

![screenshot](https://github.com/ffffranklin/mapbox-headless-poc/raw/master/screenshot.png)

### Using Vagrant

To generate screenshots with the Vagrant Ubunto v16.04 virtual machine first initialize the VM with

```sh
npm run vm:init
```

Then you should be ready to capture with the following command

```sh
npm run vm:capture
```
