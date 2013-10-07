# jQuery PassScore

So, you dont wanna your clients typing short and weak passwords? With jQuery PassScore you can do that in a fast and lightweight way! 

## Live

See the [live preview] in the JsFiddle right now!

[live preview]: http://jsfiddle.net/h6Ezt/ "live preview"

## Overview & Features

Be simple. That's the goal for the jQuery PassScore, here some incredibles features:

* Uses border property by default to show the strength bar and don't mess with your layout
* Smooth color effect when you're typing
* Compatible with any browser
* Don't need to import thousand of scripts and css, just the plugin itself
* Build-in solidly with [Jquery Boilerplate](http://jqueryboilerplate.com)

## Usage

1. Include jQuery:

	```html
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	```

2. Include passScore code:

	```html
	<script src="dist/jquery.passscore.min.js"></script>
	```

3. Call the passScore:

	```javascript
	$("#element").passScore();
	```

## Options

```javascript
force: "weak" / "normal" / "strong" / "impossible"
```
By default "normal"

```javascript
pos: "top" / "right" / "bottom" / "left"
```
By default "bottom" 

```javascript
style: "solid" / "dashed" / "dotted"
```
By default "solid" 

```javascript
width: 0 - 4
```
By default 2

```javascript
showScore: false / true
```
By default false 

## Structure

The basic structure of the project is given in the following way:

```
├── demo/
|   ├── lib/
|   │   └── bootstrap-3.0.0/
|   │       ├── css/
|   │       |    ├── bootstrap.min.css
|   │       |    └── passscore.css
|   │       └── fonts/
|   |            ├── glyphicons-halflings-regular.eot
|   |            ├── glyphicons-halflings-regular.svg
|   |            ├── glyphicons-halflings-regular.ttf
|   │            └── glyphicons-halflings-regular.woff
│   └── index.html
├── dist/
│   ├── jquery.passscore.js
│   └── jquery.passscore.min.js
├── src/
│   └── jquery.passscore.coffee
├── .editorconfig
├── .gitignore
├── .jshintrc
├── Gruntfile.js
└── package.json
```