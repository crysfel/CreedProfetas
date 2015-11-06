"use strict";

var React   = require('react-native');
var Toolbar = require('../common/Toolbar');

var {
    Component,
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    WebView,
} = React;

class Banner extends Component{

    constructor(props) {
        super(props);
        
        this.state = {
            safariSupport : true
        };
    }

    openLink(){
        var me = this;

        if(me.props.onClick){
            me.props.onClick();
        }
    }

    goBack(){
        this.props.navigator.pop();
    }
    
    render(){
        return (
            <View style={styles.mainContainer}>
                <Toolbar 
                    title="My Bible Heroes"
                    backBtn={true} 
                    onPress={this.goBack.bind(this)}
                ></Toolbar>
                <WebView
                    style={styles.webview}
                    url="http://mybibleheroes.com"></WebView>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    mainContainer     : {
        flex    : 1
    },
    webview     : {
        flex    : 1
    }
});

module.exports = Banner;