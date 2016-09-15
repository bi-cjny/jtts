class Choice{
    constructor(_id, text, nextScene){
        this._id = _id;
        this.text = text;
        this.nextScene = nextScene;
    }

    getChoiceFilters = function(){
        return [];
    };
}