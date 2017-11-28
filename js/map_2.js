
var map;
var markers = ko.observableArray();
var place_details = ko.observableArray();


var GoogleMapViewModel = function () {

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
                opening_hours: ko.observable(''),
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
                opening_hours: ko.observable(''),
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
                opening_hours: ko.observable(''),
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
                opening_hours: ko.observable(''),
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
                opening_hours: ko.observable(''),
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
                opening_hours: ko.observable(''),
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

        // Constructor creates a new map - only center and zoom are required.
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 34.123417, lng:  -118.314735},
            zoom: 14,
            styles: styles,
            mapTypeControl: false
        });

        var largeInfowindow = new google.maps.InfoWindow();
   

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


            // Create an onclick event to open the large infowindow at each marker.
            marker.addListener('click', function() {
                toggleBounce(this);
                populateInfoWindow(this, largeInfowindow);
            });

            // call functions to get places and foursquare details
            getPlacesDetails(current_location);
            getFourSquareTips(current_location);
        };

        // make markers visible on map
        showMarkers(markers());

        // search or filter locations list
        self.searchLocation = ko.computed(function() {

            // change the information from user to lower case
            var search_location = self.nameOfLocation().toLowerCase();
          
            for (var i = 0; i < self.locations().length; i++) {
                var currentLocationTitle = self.locations()[i].title.toLowerCase();
                var isEqual = currentLocationTitle.indexOf(search_location) != -1;

                //make location visible based on match with search 
                self.locations()[i].visible_location(isEqual);

                //filter markers visibility
                self.locations()[i].marker.setVisible(isEqual);
            }
        });
};


// animation for marker when clicked
function toggleBounce(marker) {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}


//Custom function to toggle a variable
//call using variableName.toggle() in html
ko.observable.fn.toggle = function () {
    var obs = this;
    return function () {
        obs(!obs())
    };
};


// get foursquare user tips for venue
var foursquare_key = 'IIN353XVTJGXYOKJV2Y2PVGJAVTA41WAFZZ1W5D24NUWH3C1';
var foursquare_client_secret='W13YPRO5VYZMOHSBTLZPXEQAI4NIPVS0ALL1HUP1EJR3NA1M';
var foursquareUrl;

function getFourSquareTips(current_location){

    var fs_id = current_location.foursquare_venue_id;
    foursquareUrl = 'https://api.foursquare.com/v2/venues/' + fs_id + '/tips?sort=recent&limit=5&v='+20150609+'&client_id=' + foursquare_key +'&client_secret=' + foursquare_client_secret;

    this.getFoursquareResponse = function(){
        var fs_tips = [];

        $.getJSON(foursquareUrl,
            function(data) {
                $.each(data.response.tips.items.slice(0,5), function(i, tips){
                  fs_tips.push('<li>' + tips.text + '</li>');
                });
            }).done(function(){
                current_location.foursquareTips('<h4>Recent Visitor Comments from FourSquare:</h4>' + '<ol class="tips">' + fs_tips.join('') + '</ol>');
            }).fail(function(jqXHR, textStatus, errorThrown) {
                current_location.foursquareTips('<h3>Recent Comments</h3>' + '<h4>Sorry. There was a problem retrieving this location\'s user tips.</h4>');        
            });
        }();
}


// get places details from google 
function getPlacesDetails(current_location) {
    var g_id =current_location.g_place_id;
    var service = new google.maps.places.PlacesService(map);

    service.getDetails({
        placeId: g_id
    }, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            if (place.formatted_address) {
                current_location.formatted_address(place.formatted_address);
            }
            if (place.formatted_phone_number) {
                current_location.formatted_phone_number(place.formatted_phone_number);
            }
            if (place.opening_hours) {
                current_location.opening_hours ('<br><br><strong>Hours:</strong><br>' +
                    place.opening_hours.weekday_text[0] + '<br>' +
                    place.opening_hours.weekday_text[1] + '<br>' +
                    place.opening_hours.weekday_text[2] + '<br>' +
                    place.opening_hours.weekday_text[3] + '<br>' +
                    place.opening_hours.weekday_text[4] + '<br>' +
                    place.opening_hours.weekday_text[5] + '<br>' +
                    place.opening_hours.weekday_text[6]);
            }
            if (place.photos) {
                current_location.photos(place.photos[0].getUrl(
                    {maxHeight: 100, maxWidth: 200}));
            }
        }
    });
}


// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infowindow) {
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
                    infowindow.setContent('<div>' + marker.title + '</div><div id="pano"></div>');
                    var panoramaOptions = {
                         position: nearStreetViewLocation,
                            pov: {
                                heading: heading,
                                pitch: 30
                            }
                };
              var panorama = new google.maps.StreetViewPanorama(
                document.getElementById('pano'), panoramaOptions);
            } else {
                infowindow.setContent('<div>' + marker.title + '</div>' +
                    '<div>No Street View Found</div>');
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


ko.applyBindings(new GoogleMapViewModel());




