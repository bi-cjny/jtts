import React from 'react';
import ReactDOM from 'react-dom';

var reactMountRootId = 'app';

var App = React.createClass({
    getInitialState: function(){
        return {
            currentText: "You got arrested at a bus stop :(",
            currentChoices: [
                {"text": "Shit on the ground"},
                {"text": "Go quietly"},
                {"text": "Play dead"}
            ]
        };
    },
    componentDidMount: function(){
        this.loadStoryFromServer();
    },
    loadStoryFromServer: function(){
        this.state.story = {};
    },
    render: function(){
        return(
            <div className="app">
                <Visualization />
                <Exposition text={this.state.currentText} />
                <ChoiceList choices={this.state.currentChoices} />
            </div>
        );
    }
});

var Visualization = React.createClass({
    getInitialState: function(){
        return {};
    },
    componentDidMount: function(){

    },
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