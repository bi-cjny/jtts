import React from 'react';
import ReactDOM from 'react-dom';

var reactMountRootId = 'app';

var App = React.createClass({
    render: function(){
        return(
            <div className="app">WTF</div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById(reactMountRootId)
);