"use strict";

var React   = require('react-native');
var CalendarView = require('./CalendarView');

var {
    Component,
    NavigatorIOS,
    StyleSheet
} = React;

class CalendarMain extends Component{

    render(){
        return (
            <NavigatorIOS
                style={styles.container}
                navigationBarHidden={true}
                initialRoute={{
                    component   : CalendarView
                }}/>
        );
    }

}

var styles = StyleSheet.create({
    container:{
        flex:1
    }
});

module.exports = CalendarMain;