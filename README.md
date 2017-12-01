# Hollywood, CA Map Project #

This repo contains project files for a single page website that shows a map of Hollywood California. The webpage includes place markers for sites of interest and a list view of locations with general information such as hours of operation. The list view also includes tips from Foursquare users. Place markers when clicked also show an infowindow with Google view of the location.

## Built With ##
* Vanilla JS
* Jquery
* Bootstrap
* KnockoutJS


## APIs Used ##

* Google Maps Javascript API
* Google Maps Roads API
* Google Static Maps API
* Google Street View API
* Google Places API Web Service 
* Foursquare API

## Installation ##

1. Download or clone this repo. 
2. Enter your Google Maps API key in index.html file at script tag src YOUR_API_KEY by your API key. You can get a key from Google by:
	1. Visiting the APIs Console at https://code.google.com/apis/console and log in with your Google Account.
	2. Click the Services link from the left-hand menu.
	3. Activate the Google Maps API v3 service.
	4. Click the API Access link from the left-hand menu. Your API key is available from the API Access page, in the Simple API Access section. Maps API applications use the Key for browser apps.
3. Enter your foursquare client key and client secret in app.js by replacing 'YOUR_CLIENT_ID' with the client id and 'YOUR_CLIENT_SECRET' with the client secret. You can get both of these keys by:
		1. Visiting https://developer.foursquare.com/ 
		2. Creating an account
		3. Creating an application

