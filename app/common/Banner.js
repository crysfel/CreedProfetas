"use strict";

var React   = require('react-native');
var Device = require('../common/Device');
var SafariView = require('react-native-safari-view');

var {
    Component,
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight
} = React;

class Banner extends Component{

    constructor(props) {
        super(props);
        
        this.state = {
            
        };
    }

    openLink(){
        SafariView.show({
            url: 'http://mybibleheroes.com/'
        });
    }

    
    render(){
        return (
            <TouchableHighlight 
                        style={styles.mainContainer}
                        underlayColor='#16797f'
                        onPress={this.openLink.bind(this)}>
                <Image style={styles.bannerImage}
                    resizeMode='cover'
                    source={require('image!banner-default')}>
                    
                    <Image style={styles.iosImage}
                        source={require('image!ios')}></Image>

                </Image>
            </TouchableHighlight>
        );
    }


}

var styles = StyleSheet.create({
    mainContainer   : {
        height  : 70
    },
    bannerImage     : {
        width   : Device.width,
        height  : 80,
        // flexDirection: 'row',
        alignItems:'center'
    },
    iosImage        : {
        width   : 87,
        height  : 25,
        backgroundColor: 'transparent',
        marginTop:25
    }
});

module.exports = Banner;