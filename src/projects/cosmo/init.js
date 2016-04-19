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
        displayButtons: false
    };

    exports.app = new App(json_settings);
}(window));
