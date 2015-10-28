'use strict';
var React = require('react-native');
var Viewport = require('./app/main/Viewport');

var {
    AppRegistry,
    Component
} = React;

class CreedProfetas extends Component{
    render() {
        return (
            <Viewport></Viewport>
        );
    }
}

AppRegistry.registerComponent('CreedProfetas', () => CreedProfetas);