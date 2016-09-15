import React from 'react';
import ReactDOM from 'react-dom';
import { story } from './story.js';


var reactMountRootId = 'app';

var App = React.createClass({
    getInitialState: function(){
        var initalHistory = [];
        var initialChoices = story.scenes.find(function(scene){
            return scene._id == story.initialSceneID;
        }).getChoices(initalHistory);
        return {
            "story": story,
            "currentSceneID": story.initialSceneID,
            "choices": initialChoices,
            "history": initalHistory
        };
    },
    getScene: function(id){
        return this.state.story.scenes.find(function(scene){
            return scene._id == id;
        });
    },
    getCurrentScene : function(){
        return this.getScene(this.state.currentSceneID);
    },
    getChoice: function(choiceID){
        return this.state.choices.find(function(choice){
            return choice._id == choiceID;
        });
    },
    handleChoiceSelection: function(choiceID){
        var choice = this.getChoice(choiceID);
        var nextScene = this.getScene(choice.getNextScene(this.state.history));
        this.setState(function(previousState){
            var updatedHistory = previousState.history.concat({
                "scene": this.state.currentSceneID,
                "choice": choiceID
            });
            return {
                "currentSceneID": nextScene._id,
                "history": updatedHistory,
                "choices": nextScene.getChoices(updatedHistory)
            }
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
                <h1>{this.getCurrentScene().title}</h1>
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
        var choiceNodes = [];
        var onChoiceSelect = this.props.onChoiceSelect;
        this.props.choices.forEach(function(choice){
            choiceNodes.push(
                <Choice data={choice} key={choice._id} onChoiceSelect={onChoiceSelect} />
            );
        });
        return (
            <div className="choiceList">
                <ul>
                    {choiceNodes}
                </ul>
            </div>
        );
    }
});

var Choice = React.createClass({
    render: function(){
        var onClick = (function(e){
            e.preventDefault();
            return this.props.onChoiceSelect(this.props.data._id);
        }).bind(this);
        return(
            <li className="choice" onClick={onClick}>
                {this.props.data.getText()}
            </li>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById(reactMountRootId)
);