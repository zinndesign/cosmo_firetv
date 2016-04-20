(function(exports) {
    'use strict';
    
    //initialize the app
    var settings = {
        Model: MRSSMediaModel,
        PlayerView: PlayerView,
        PlaylistView: PlaylistPlayerView,
        dataURL: "./assets/genericMediaData.xml",
        showSearch: true,
        displayButtons: false
    };

    var json_settings = {
        Model: JSONMediaModel,
        PlayerView: PlayerView,
        PlaylistView: PlaylistPlayerView,
        dataURL: "./assets/cosMediaData.json",
        showSearch: true,
        displayButtons: false,
	    categoryKeywords: {
		    'Celebs': ['celebrities','entertainment','celebs','celebrity'],
		    'Beauty': ['beauty','makeup','hair','hairstyle'],
		    'Sex & Love': ['sex','love','relationship','couples','romance','sex positions'],
		    'Style & Fashion': ['style','fashion'],
		    'Politics': ['politics'],
		    'Travel': ['travel','leisure'],
		    'Tutorials': ['tutorial','how to','how-to'],
		    'Health & Fitness': ['health','fitness','exercise','working out','cosmobody'],
		    'Food & Drink': ['drinks','recipes','food','cocktails','dining','restaurants','eating','drinking'],
		    'Funny': ['funny','humor']
	    }
    };

    exports.app = new App(json_settings);
}(window));
