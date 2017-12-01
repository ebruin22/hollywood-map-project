
var map;
var markers = ko.observableArray();



var googleMapViewModel = function () {

    var self = this;
    self.nameOfLocation = ko.observable('');

    //locations array
    self.locations = ko.observableArray(
        [{
            location: {lat: 34.1341151, lng: -118.3215482},
            title: 'Hollywood Sign',
            g_place_id: 'ChIJm5Vk8XC_woARFW1mrqLL-n4',
            foursquare_venue_id: '4afee5f7f964a5205a3122e3',
            formatted_address: ko.observable(''),
            formatted_phone_number: ko.observable(''),
            popular_hours: ko.observable(''),
            website: ko.observable(''),
            photos: ko.observable(''),
            showDiv: ko.observable(false),
            foursquareTips: ko.observable(''),
            visible_location: ko.observable(true) 
        },
        {
            location: {lat: 34.1197351, lng: -118.2960682},
            title: 'Greek Theatre',
            g_place_id: 'ChIJRUJ9pJjAwoARhqQ6EhQynzs',
            foursquare_venue_id: '4a331c91f964a520039b1fe3',
            formatted_address: ko.observable(''),
            formatted_phone_number: ko.observable(''),
            popular_hours: ko.observable(''),
            website: ko.observable(''),
            photos: ko.observable(''),
            showDiv: ko.observable(false),
            foursquareTips: ko.observable(''),
            visible_location: ko.observable(true)   
        },
        {
            location: {lat: 34.1184341, lng: -118.3003935},
            title: 'Griffith Observatory',
            g_place_id: 'ChIJywjU6WG_woAR3NrWwrEH_3M', 
            foursquare_venue_id:'4a6e5d0df964a52093d41fe3',
            formatted_address: ko.observable(''),
            formatted_phone_number: ko.observable(''),
            popular_hours: ko.observable(''),
            website: ko.observable(''),
            photos: ko.observable(''),
            showDiv: ko.observable(false),
            foursquareTips: ko.observable(''),
            visible_location: ko.observable(true)   
        },
        {
            location: {lat: 34.11224 , lng: -118.339128} ,
            title: 'Hollywood Bowl',
            g_place_id: 'ChIJMwknwRu_woAR_eI2OM9ib2o',
            foursquare_venue_id: '4161e400f964a5206f1d1fe3',
            formatted_address: ko.observable(''),
            formatted_phone_number: ko.observable(''),
            popular_hours: ko.observable(''),
            website: ko.observable(''),
            photos: ko.observable(''),
            showDiv: ko.observable(false),
            foursquareTips: ko.observable(''),
            visible_location: ko.observable(true)   
        },
        {
            location: {lat: 34.101699, lng: -118.333677},
            title: 'Hollywood Walk of Fame',
            g_place_id: 'ChIJXyC7WTu_woARPvVMCHBXd4U', 
            foursquare_venue_id: '5117525be4b02a04bc1e15ef',
            formatted_address: ko.observable(''),
            formatted_phone_number: ko.observable(''),
            popular_hours: ko.observable(''),
            website: ko.observable(''),
            photos: ko.observable(''),
            showDiv: ko.observable(false),
            foursquareTips: ko.observable(''),
            visible_location: ko.observable(true)   
        },
        {
            location: {lat: 34.102117, lng: -118.34093810000002},
            title: "TCL Chinese Theatre",
            g_place_id: 'ChIJw4DCAdrX3IAR-1_GYNuCOfc',
            foursquare_venue_id: '42af6f80f964a5205b251fe3',
            formatted_address: ko.observable(''),
            formatted_phone_number: ko.observable(''),
            popular_hours: ko.observable(''),
            website: ko.observable(''),
            photos: ko.observable(''),
            showDiv: ko.observable(false),
            foursquareTips: ko.observable(''),
            visible_location: ko.observable(true) 
        }
        ]);

    // Create a styles array to use with the map.
    var styles = [
        {
            featureType: 'water',
            stylers: [
              { color: '#19a0d8' }
            ]
        },{
            featureType: 'administrative',
            elementType: 'labels.text.stroke',
            stylers: [
              { color: '#ffffff' },
              { weight: 6 }
            ]
        },{
            featureType: 'administrative',
            elementType: 'labels.text.fill',
            stylers: [
              { color: '#e85113' }
            ]
        },{
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [
              { color: '#efe9e4' },
              { lightness: -40 }
            ]
        },{
            featureType: 'transit.station',
            stylers: [
              { weight: 9 },
              { hue: '#e85113' }
            ]
        },{
            featureType: 'road.highway',
            elementType: 'labels.icon',
            stylers: [
              { visibility: 'off' }
            ]
        },{
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [
              { lightness: 100 }
            ]
        },{
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [
              { lightness: -100 }
            ]
        },{
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
              { visibility: 'on' },
              { color: '#f0e4d3' }
            ]
        },{
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [
              { color: '#efe9e4' },
              { lightness: -25 }
            ]
        }
    ];

    // load map based on mobile or tablet/desktop
    if ($(window).width() <= 767) { 
        map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 34.133417, lng:  -118.320735},
        zoom: 12,
        styles: styles,
        mapTypeControl: false
        });
     } else {
        // Constructor creates a new map - only center and zoom are required.
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 34.114417, lng:  -118.320735},
            zoom: 13,
            styles: styles,
            mapTypeControl: false
        });
    }


    // center map after 5 seconds
    map.addListener('center_changed', function() {
        if ($(window).width() <= 767) { 
            window.setTimeout(function() {
                map.panTo({lat: 34.133417, lng:  -118.320735});
                map.setZoom(12);
              }, 5000);
            
        } else {
              window.setTimeout(function() {
                map.panTo({lat: 34.134417, lng:  -118.320735});
                map.setZoom(13);
              }, 4000);
        }
    });


    var largeInfowindow = new google.maps.InfoWindow();

    // create marker for each location
    for (var i = 0; i < self.locations().length; i++) {
        var position = self.locations()[i].location;
        var title = self.locations()[i].title;
        var g_id =self.locations()[i].g_place_id;
        var current_location = self.locations()[i];

        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            visible_location: ko.observable(true),
            id: i
        });
      
        // Push the marker to our array of markers.
        markers().push(marker);

        //push markers array to location 
        self.locations()[i].marker = marker;

        // call functions to get places and foursquare details
        getVenueDetails(current_location);
        // getPlacesDetails(current_location);
        getFourSquareTips(current_location);

        // Create an onclick event to open the large infowindow at each marker.
        marker.addListener('click', function() {
            // focus and zoom in when marker is clicked
            map.setZoom(16);
            map.setCenter(marker.getPosition());
            // animate marker and populate infowindow
            toggleBounce(this);
            populateInfoWindow(this, largeInfowindow, current_location);
        });

    };

    // make markers visible on map
    showMarkers(markers());

    // search or filter locations list
    self.searchLocation = ko.computed(function() {

        // change the information from user to lower case
        var searchLocationTerm = self.nameOfLocation().toLowerCase();
      
        for (var i = 0; i < self.locations().length; i++) {
            var currentLocationTitle = self.locations()[i].title.toLowerCase();
            var isEqual = currentLocationTitle.indexOf(searchLocationTerm) != -1;

            //make location visible based on match with search 
            self.locations()[i].visible_location(isEqual);

            //filter markers visibility
            self.locations()[i].marker.setVisible(isEqual);
        }
    });

};


// function to both toggle ShowDiv and marker bouncing
function clickLocation (marker, showDiv) { 
    // call marker animation
    toggleBounce(marker);
    
    //toggle showDiv 
    return function() {
        showDiv(!showDiv())
    }
}

// animation for marker when clicked
function toggleBounce(marker) {

    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
          marker.setAnimation(null)}, 700);
    }
}


// get foursquare user tips for venue
var foursquare_key = 'YOUR_CLIENT_ID';
var foursquare_client_secret='YOUR_CLIENT_SECRET';
var foursquareUrl;

function getFourSquareTips(current_location){

    var fs_id = current_location.foursquare_venue_id;
    foursquareUrl = 'https://api.foursquare.com/v2/venues/' + fs_id + '/tips?sort=recent&v='+20150609+'&client_id=' + foursquare_key +'&client_secret=' + foursquare_client_secret;

    this.getFoursquareResponse = function(){
        var fs_tips = [];

        $.getJSON(foursquareUrl,
            function(data) {
                // console.log(data.response);
                $.each(data.response.tips.items.slice(0,5), function(i, tips){
                  fs_tips.push('<li>' + tips.text + '</li>');
                });
            }).done(function(){
                current_location.foursquareTips('<h4>Visitor tips from Foursquare:</h4>' + '<ol class="tips">' + fs_tips.join('') + '</ol>');
            }).fail(function(jqXHR, textStatus, errorThrown) {
                current_location.foursquareTips('<h3>Recent Comments</h3>' + '<h4>Sorry. There was a problem retrieving this location\'s user tips.</h4>');        
            });
        }();
}

// get foursquare venue details
function getVenueDetails (current_location) {

    var venueId = current_location.foursquare_venue_id;

    // photos url 
    var foursquarePhotosUrl = 'https://api.foursquare.com/v2/venues/' + venueId + '/photos?sort=recent&v='+20150609+'&limit=1&client_id=' + foursquare_key +'&client_secret=' + foursquare_client_secret;

     $.getJSON(foursquarePhotosUrl,
            function(data) {
                    var prefix = data.response.photos.items[0].prefix;
                    var suffix = data.response.photos.items[0].suffix;
                    var photoUrl = prefix +'500x500' + suffix;
                    current_location.photos(photoUrl);
        });

     // location details
     var foursquareDetailsUrl = 'https://api.foursquare.com/v2/venues/'+ venueId +'?&v=' +20150609+ '&client_id=' + foursquare_key +'&client_secret=' + foursquare_client_secret;
     
     $.getJSON(foursquareDetailsUrl,
            function(data) {
                var formattedPhone = data.response.venue.contact.formattedPhone;
                var formattedAddress = data.response.venue.location.formattedAddress;
                var website = data.response.venue.url;
                var popularHours = '<br><br><strong>Popular Visiting Hours:</strong><br>';;
                if (data.response.venue.popular){
                    for (var i = 0; i < data.response.venue.popular.timeframes.length; i++) {
                        // popularHours = '<br><br><strong>Hours:</strong><br>'; 
                        popularHours += data.response.venue.popular.timeframes[i].days+ ', ' + data.response.venue.popular.timeframes[i].open[0].renderedTime +'<br>';
                    }
                }else{
                    popularHours = '<h4>Hours not available</h4>';
                }
                if (formattedPhone){
                    current_location.formatted_phone_number(formattedPhone);  
                } else{
                    current_location.formatted_phone_number('Phone number not available');
                }
                current_location.formatted_address(formattedAddress);
                if(website){
                    current_location.website(website);
                } else {
                    current_location.website('Website not available');
                }
                current_location.popular_hours(popularHours);  
        });
}


// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infowindow, current_location) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
        // Clear the infowindow content to give the streetview time to load.
        infowindow.setContent('');
        infowindow.marker = marker;
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
        });
        var streetViewService = new google.maps.StreetViewService();
        var radius = 50;
        // In case the status is OK, which means the pano was found, compute the
        // position of the streetview image, then calculate the heading, then get a
        // panorama from that and set the options
        function getStreetView(data, status) {
            if (status == google.maps.StreetViewStatus.OK) {
                var nearStreetViewLocation = data.location.latLng;
                var heading = google.maps.geometry.spherical.computeHeading(
                    nearStreetViewLocation, marker.position);
                    infowindow.setContent('<div class="infoWindow">' + marker.title + '</div><div class="infoWindow">' + current_location.formatted_address() + '</div><div class="infoWindow">'
                        + current_location.formatted_phone_number() + '</div></div><div id="pano"></div>');
                    var panoramaOptions = {
                         position: nearStreetViewLocation,
                            pov: {
                                heading: heading,
                                pitch: 20
                            }
                };
              var panorama = new google.maps.StreetViewPanorama(
                document.getElementById('pano'), panoramaOptions);
            } else {
                infowindow.setContent('<div class="infoWindow">' + marker.title + '</div><div class="infoWindow">' + current_location.formatted_address() + '</div><div class="infoWindow">'
                        + current_location.formatted_phone_number() + '</div><div>No Street View Found</div>');
            }
        }
        // Use streetview service to get the closest streetview image within
        // 50 meters of the markers position
        streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);    
        // Open the infowindow on the correct marker.
        infowindow.open(map, marker);
    }
  }


// show markers on map
function showMarkers(markers) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map); 
    }
} 


// error message for asynch load of Google Maps
function googleLoad () {
    ko.applyBindings(new googleMapViewModel());           
}

// error message if google maps fails
function googleFail () {
    alert("Could not load data from Google Maps!");
}






