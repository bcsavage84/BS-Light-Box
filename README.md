# BS-Light-Box
A light box for images that allows you to cycle through all of them. It has two modes, fit screen and resize.

## ToC
* [Built With](#built-with)
* [Getting Started](#getting-started)
* [Example](#example)
* [Running Included Example](#running-included-example)
* [Testing](#testing)
* [Author](#auther)

## Built With
JavaScript

## Getting Started
Place BSLightBox.js in a location you can access.

Include the file in your web page doing it the way you would any other script.

Give any imgs you want to appear in the light box a class name of "bsLightBox".

Make sure the images are not links so clicking them does not trigger a page redirect.

### Example
```
<html>
<body>
<img class="bsLightBox" src="http://bsava.wiotm.com/imgs/mysticBeach.jpg" alt="Mysterious Beach Design">
<img class="bsLightBox" src="http://bsava.wiotm.com/imgs/retouchedFlowers.jpg" alt="Flowers retouched with color added">
<script type="text/javascript" src="scripts/BSLightBox.js"></script>
</body>
</html>
```

### Running Included Example
Place sample.html and BSLightBox.js in the same location then open sample.html in a web browser.

### Testing
You should be able to click on an image and have the light box open.

The light box should show the total number of images and which one you are viewing at the bottom of it.

The next/prev buttons should work.

Fit screen should size the image to fit the inside of the light box window if it is bigger than the light box.

Resize will change the image size using a percentage and if it becomes larger than the light box window a set of scroll bars will appear.

Pressing the close button should close the light box and return you to the previos screen and location, without reloading.

## Author
Brandon Savage