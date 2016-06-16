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

	// stage: http://jzinn:pr1m3au@stage.services.hearstmags.com/api/js/Ereader/Video?ipad_ap_id=63&per_page=50&thumb_size=750x422
	// prod: https://services.hearstmags.com/api/js/Ereader/Video?ipad_ap_id=63&per_page=50&thumb_size=750x422
	// test: http://zinndesign.com/hearst/firetv/cors_data_test.php

    var json_settings = {
        Model: JSONMediaModel,
        PlayerView: PlayerView,
        PlaylistView: PlaylistPlayerView,
	    localDataURL: "./assets/cosMediaData.json",
	    dataURL: "http://zinndesign.com/hearst/firetv/cors_data_test.php",
        showSearch: true,
        displayButtons: false,
	    categoryKeywords: {
		    'Fashion & Beauty' : ['plfashion','plbeauty'],
		    'Snack Time' : ['plfood','plsweet','plsavory','pldrink','plcocktail'],
		    'News & Entertainment' : ['plcelebrity','plpolitcs'],
		    'Health & Fitness' : ['plscience','plfitness','plsports'],
		    'Sex & Relationships' : ['plrelationships'],
		    'Lifestyle' : ['plfunny','pltravel','pldécor','pldiy']
	    }
    };

    exports.app = new App(json_settings);
}(window));
