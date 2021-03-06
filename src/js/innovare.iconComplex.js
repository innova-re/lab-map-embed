/*!
 * Innovare.Map.Main JavaScript Library v0.1
 * https://github.com/innova-re/map
 *
 * Copyright 2014, Antonio Pierro
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * reference: https://developers.google.com/maps/documentation/javascript/examples/icon-complex
 */
/* global window */
(function ($, float, setTimeout) {
	'use strict';


	/**
	 * @param $placeList
	 * @constructor
	 */
	var IconComplex = function (icons) {
		this.icons = icons;
		this.map = new google.maps.Map($('.map-canvas').get(0), this.getMapOptions());
		this.init();
		this.action = $('input[name="map-detail"]').val();
	};

	IconComplex.prototype = {

		constructor: IconComplex,

		init: function () {
			this.setMarkers(this.map, this.getIcons());
		},

		/*
		 * getIcons function
		 *
		 * it returns an array of values,
		 * each array matches a laboratory and contains the following values
		 * [latitude, longitude, z-index, the selected text, the selected value]
		 *
		 * @return (array)
		*/
		getIcons: function() {
			var icons = [];
			$.each(this.icons, function (i, value) {
				var $value = $(value);
				var array = $.map($value.attr('map-latLng').split(','), function (value) {
					return float(value, 10);
				});
				array.push($value.text());
				array.push($value.val());
				icons.push(array);
			});
			return icons;
		},

		getMapOptions: function () {
			return {
				zoom: 13,
				center: new google.maps.LatLng(39.246660, 9.118609),
				mapTypeId: google.maps.MapTypeId.ROAD
			}
		},

		setInfoWindow: function (marker, location) {
			var content = $('<div>').attr('class', 'info-icon');
			content.append($('<a>').attr('href', './' + this.action + '?labName=' + location[4]).html(location[3]));
			this.infoWindow = new google.maps.InfoWindow({
				content: content[0]
			});
			this.infoWindow.open(this.map, marker);
		},

		setMarkers: function (map, locations) {
			for (var i = 0; i < locations.length; i++) {
				setTimeout($.proxy(this.setMarker(locations[i], this.map), this), i * 800);
			}
		},

		setMarker: function (location, map) {
			return function () {
				var myLatLng = new google.maps.LatLng(location[0], location[1]);
				var marker = new google.maps.Marker({
					position: myLatLng,
					animation: google.maps.Animation.DROP,
					map: map,
					// icon: 'src/images/univ.small.png',
					title: location[3],
					zIndex: location[2]
				});
				google.maps.event.addListener(marker, 'click', $.proxy(this.setInfoWindow, this, marker, location));
			}
		}
	};

	$(function() {
		new IconComplex($('select option'));
	});

})(window.jQuery, window.parseFloat, window.setTimeout);
