import React from 'react';
import ReactDOM from 'react-dom';
import { story } from 'story.js';


var reactMountRootId = 'app';

var App = React.createClass({
    getInitialState: function(){
        return {
            "story": story,
            "currentSceneID": 0,
            "choices": this.getChoices(),
            "history": []
        };
    },
    getScene: function(id){
        this.state.story.scenes.find(function(scene){
            return scene._id == id;
        });
    },
    getCurrentScene : function(){
        return this.getScene(this.state.currentSceneID);
    },
    getChoicesFromCurrentScene: function(){
        var scene = this.getCurrentScene();
        return scene.getChoices(this.state.history);
    },
    getChoiceFromCurrentScene: function(choiceID){
        var choices = this.getChoicesFromCurrentScene();
        return choices.find(function(choice){
            return choice._id = choiceID;
        });
    },
    handleChoiceSelection: function(choiceID){
        var scene = this.getCurrentScene();
        var choice = this.getChoiceFromCurrentScene(choiceID);
        var history = this.state.history.push({
            "scene": scene._id,
            "choice": choice._id
        });
        this.setState({
            "story": this.state.story,
            "currentSceneID": choice.getNextScene(this.state.history),
            "history": history
        });
    },
    render: function(){
        var scene = this.getCurrentScene();
        var sceneText = "";
        if(scene.getText){
            sceneText = scene.getText()
        }
        return(
            <div className="app">
                <Visualization />
                <Exposition text={ sceneText } />
                <ChoiceList choices={this.state.choices}
                            onChoiceSelect={this.handleChoiceSelection} />
            </div>
        );
    }
});

var Visualization = React.createClass({
    render: function(){
        return(
            <div className="visualization">
                <img src="http://nemanjakovacevic.net/wp-content/uploads/2013/07/placeholder.png" />
            </div>
        );
    }
});

var Exposition = React.createClass({
    render: function(){
        return (
            <div className="exposition">
                {this.props.text}
            </div>
        );
    }
});

var ChoiceList = React.createClass({
    render: function(){
        var choiceNodes = this.props.choices.map(function(choice){
            return(
                <Choice data={choice} />
            )
        });
        return (
            <div className="choiceList">
                {choiceNodes}
            </div>
        );
    }
});

var Choice = React.createClass({
    render: function(){
        return(
            <div className="choice">
                {this.props.data.text}
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById(reactMountRootId)
);