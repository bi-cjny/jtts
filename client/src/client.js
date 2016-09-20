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
        this.setState(function(previousState){
            var choice = this.getChoice(choiceID);
            var nextScene = this.getScene(choice.getNextScene(this.state.history));
            var updatedHistory = previousState.history.concat({
                "scene": this.state.currentSceneID,
                "choice": choiceID,
                "choiceText": choice.getText(previousState.history)
            });
            var nextChoices = nextScene.getChoices(updatedHistory);
            return {
                "currentSceneID": nextScene._id,
                "history": updatedHistory,
                "choices": nextChoices
            }
        });
    },
    render: function(){
        var scene = this.getCurrentScene();
        console.log(this.state.history);
        var lastStep = this.state.history[this.state.history.length-1];
        var sceneText = lastStep ? lastStep.choiceText : "";
        if(scene.getText){
            sceneText = scene.getText()
        }
        return(
            <div className="app container">
                <h1>{this.getCurrentScene().title}</h1>
                <div className="row">
                    <Exposition text={ sceneText } />
                    <Visualization sceneImg={this.getCurrentScene().bgImage} />
                </div>
                <ChoiceList choices={this.state.choices}
                            onChoiceSelect={this.handleChoiceSelection} />
                <History data={ this.state.history }/>
            </div>
        );
    }
});

var Visualization = React.createClass({
    render: function(){
        var defaultImg = "http://nemanjakovacevic.net/wp-content/uploads/2013/07/placeholder.png";
        var sceneImg = "/images/"+this.props.sceneImg;
        if(this.props.sceneImg==""){
            sceneImg = defaultImg;
        }
        return(
            <div className="visualization col-md-8">
                <img src={sceneImg} />
            </div>
        );
    }
});

var Exposition = React.createClass({
    render: function(){
        return (
            <div className="exposition col-md-4">
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
            <div className="choiceList row">
                <h2>Choices</h2>
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

var History = React.createClass({
    render: function(){
        var itemNodes = this.props.data.map(function(step){
            return (
                <li>{step.choiceText}</li>
            );
        });
        return(
            <div className="history row">
                <h2>History</h2>
                <ul>
                    {itemNodes}
                </ul>
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById(reactMountRootId)
);