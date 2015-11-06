"use strict";

var React   = require('react-native');
var Device = require('../common/Device');


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
            safariSupport : true
        };
    }

    openLink(){
        var me = this;

        if(me.props.onClick){
            me.props.onClick();
        }
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
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>My Bible Heroes</Text>
                        <Text style={styles.description}>Historias animadas de la Biblia</Text>
                    </View>
                </Image>
            </TouchableHighlight>
        );
    }

    renderWebview(){
        if(!this.state.safariSupport){
            return (
                <View style={styles.webviewContainer}>
                    <Text>Cerrar</Text>
                </View>
            );
        }
    }
}

var styles = StyleSheet.create({
    mainContainer   : {
        height  : 70
    },
    bannerImage     : {
        width   : Device.width,
        height  : 70,
        flexDirection: 'row',
        alignItems:'center'
    },
    iosImage        : {
        width   : 87,
        height  : 25,
        backgroundColor: 'transparent',
        marginLeft:15
    },
    textContainer   : {
        margin:10,
        backgroundColor: 'transparent',
    },
    title           : {
        backgroundColor: 'transparent',
        color   : '#f57f20',
        fontWeight  : 'bold',
        fontSize    : 20,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
          height: 1,
          width: 0
        }
    },
    description     : {
        backgroundColor: 'transparent',
        color   : '#ffffff',
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
          height: 1,
          width: 0
        }
    }
});

module.exports = Banner;