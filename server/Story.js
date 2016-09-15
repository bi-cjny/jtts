var _ = require("lodash");

class Story{
    constructor(id, name, scenes){
        this._id = id;
        this.name = name;
        this.scenes = scenes;
        this.choiceFilters = [];
    };

    getScenes = function(){
        return this.scenes;
    };

    getScene = function(id){
        return _.find(this.scenes, function(scene){
            return scene._id == id;
        })
    };
}
