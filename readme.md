mapbox-headless-poc
===================

### Getting Started

Set up locally by cloning this repoository and installing the dependencies with `npm` (node `v9.11.1` recommended)

```sh
git clone https://github.com/ffffranklin/mapbox-headless-poc.git
cd ./mapbox-headless-poc
npm install
```

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

### FAQ

Q: I ran `npm run vm:capture` and received the following assertion error:

![screenshot](https://raw.githubusercontent.com/ffffranklin/mapbox-headless-poc/master/public/assertion-error.png?cache_bust=1)

A: Re-initialize the vm by removing the `node_modules` folder and running `npm run vm:init`.  This happens because `npm run capture` and `npm run vm:capture` depend on different sets of resources for some reason (probably due to OS differences).
