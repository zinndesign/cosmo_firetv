/* Model
 *
 * Model for MRSS feed data 
 */

(function (exports) {
    "use strict";

    // the model for the Media Sample Data
    // {Object} appSettings are the user-defined settings from the index page
    function MRSSMediaModel(appSettings) {
         // mixin inheritance, initialize this as an event handler for these events:
         Events.call(this, ['error']);

         this.mediaData       = [];
         this.categoryData    = [];
         this.currData = [];
         this.currentCategory = 0;
         this.currentItem     = 0;
         this.defaultTheme    = "default";
         this.currentlySearchData = false;

         //timeout default to 1 min
         this.TIMEOUT = 60000;

        /**
         * This function loads the initial data needed to start the app and calls the provided callback with the data when it is fully loaded
         * @param {function} the callback function to call with the loaded data
         */
        this.loadInitialData = function (dataLoadedCallback) {
             utils.ajaxWithRetry({
                 url: appSettings.dataURL,
                 type: 'GET',
                 crossDomain: true,
                 dataType: 'xml',
                 context : this,
                 cache : true,
                 timeout: this.TIMEOUT,
                 success: function() {
                     var contentData = arguments[0];
                     this.handleXMLData(contentData);
                 }.bind(this),
                 error: function(jqXHR, textStatus) {
                    if (jqXHR.status === 0) {
                        this.trigger("error", ErrorTypes.INITIAL_NETWORK_ERROR, errorHandler.genStack());
                        return;
                    }
                    switch (textStatus) {
                        case "timeout" :
                            this.trigger("error", ErrorTypes.INITIAL_FEED_TIMEOUT, errorHandler.genStack());
                            break;
                        case "parsererror" :
                            this.trigger("error", ErrorTypes.INITIAL_PARSING_ERROR, errorHandler.genStack());
                            break;
                        default:
                            this.trigger("error", ErrorTypes.INITIAL_FEED_ERROR, errorHandler.genStack());
                            break;
                    }
                    dataLoadedCallback = null;
                 }.bind(this),
                 complete: function() {
                    if (dataLoadedCallback) {
                        dataLoadedCallback();
                    }
                 }
             });
        }.bind(this);

       /**
        * Handles mrss feed requests that return XML data 
        * @param {Object} xmlData data returned from request
        */
        this.handleXMLData = function (xmlData) {
            var $xml = $(xmlData);
            var cats = [];
            var itemsInCategory = [];

            $xml.find("item").each(function() {
                var $this = $(this);
                var item = {
                    title: $this.find('media\\:title, title').first().text(),
                    link: $this.find('gopher\\:source, source').text(),
                    description: $this.find('media\\:description, description').eq(0).text(),
                    pubDate: exports.utils.formatDate($this.find('pubDate').text()),
                    author: $this.find('media\\:credit, credit').text(),
                    imgURL: $this.find('media\\:thumbnail, thumbnail').attr('url'),
                    thumbURL: $this.find('media\\:thumbnail, thumbnail').attr('url'),
                    videoURL: $this.find('gopher\\:playlist, playlist').attr('url')
                };

                console.log(item.title);
                console.log(item.description);
                console.log(item.pubDate);
                console.log(item.imgURL);
                console.log(item.videoURL);

                $this.find('media\\:category, category').each(function() {
                    var category = $(this).text();
                    category = category.replace(/&amp;/g, '&');

                    itemsInCategory[category] = itemsInCategory[category] || [];
                    itemsInCategory[category].push(item);

                     //make sure we don't have an empty category
                    if(category.length > 0) {
                        cats.push(category);
                    }
                });
            });

            $.unique(cats); // purge duplicates.
            this.categories = cats;
            this.categoryData = cats;
            this.mediaData = itemsInCategory;
            this.setCurrentCategory(0);
        }.bind(this);

       /***************************
        *
        * Utilility Methods
        *
        ***************************/
       /**
        * Sort the data array alphabetically
        * This method is just a simple sorting example - but the
        * data can be sorted in any way that is optimal for your application
        */
        this.sortAlphabetically = function (arr) {
            arr.sort();
        };

       /***************************
        *
        * Media Data Methods
        *
        ***************************/
        /**
         * For single views just send the whole media object
         */
         this.getAllMedia = function () {
             return mediaData;
         };

       /***************************
        *
        * Category Methods
        *
        ***************************/
        /**
         * Hang onto the index of the currently selected category
         * @param {Number} index the index into the categories array
         */
         this.setCurrentCategory = function (index) {
             this.currentCategory = index;
         };

       /***************************
        *
        * Content Item Methods
        *
        ***************************/
        /**
         * Return the category items for the left-nav view
         */
         this.getCategoryItems = function () {
             return this.categoryData;
         };

        /** 
         * Get and return data for a selected category
         * @param {Function} categoryCallback method to call with returned requested data
         */  
         this.getCategoryData = function (categoryCallback) {
             this.currData = this.mediaData[this.categoryData[this.currentCategory]];
             categoryCallback(this.currData);
         };   

        /**
         * Get and return data for a search term
         * @param {string} searchTerm to search for
         * @param {Function} searchCallback method to call with returned requested data
         */
         this.getDataFromSearch = function (searchTerm, searchCallback) {
            this.currData = [];
            for (var i = 0; i < this.mediaData.length; i++) {
                if (this.mediaData[i].title.toLowerCase().indexOf(searchTerm) >= 0 || this.mediaData[i].description.toLowerCase().indexOf(searchTerm) >= 0) {
                    this.currData.push(this.mediaData[i]);
                }
            }
            searchCallback(this.currData);
         };

       /**
        * Store the refrerence to the currently selected content item
        * @param {Number} index the index of the selected item
        */
        this.setCurrentItem = function (index) {
            this.currentItem = index;
            this.currentItemData = this.currData[index];
        };

       /**
        * Retrieve the reference to the currently selected content item
        */
        this.getCurrentItemData = function () {
            return this.currentItemData;
        };
    }

    exports.MRSSMediaModel = MRSSMediaModel;
})(window);


