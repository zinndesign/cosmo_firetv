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

	// dataURL: "./assets/cosMediaData.json",
    var json_settings = {
        Model: JSONMediaModel,
        PlayerView: PlayerView,
        PlaylistView: PlaylistPlayerView,
	    dataURL: "https://services.hearstmags.com/api/js/Ereader/Video?ipad_ap_id=63&per_page=40&thumb_size=750x422",
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
