"use strict";

var React = require('react-native');

var {
    Component,
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight
} = React;

class Toolbar extends Component{

    goBack(){
        if(this.props.onPress){
            this.props.onPress();
        }
    }

    render(){
        return (
            <View style={styles.container}>
                {[ this.renderBackButton() ]}
                <Text style={styles.toolbarText}>{this.props.title}</Text>
                {[ this.renderEmptyButton() ]}
            </View>
        );
    }

    renderBackButton(){
        if(this.props.backBtn){
            return (
                <TouchableHighlight 
                    style={styles.button}
                    underlayColor='#76B09C'
                    onPress={() => this.goBack()}>
                        <Image style={styles.icon}
                            source={require('image!left207')}/>
                </TouchableHighlight>
            );
        }
    }

    renderEmptyButton(){
        if(this.props.backBtn){
            return (
                <View style={styles.button}>
                </View>
            );
        }
    }

}

var styles = StyleSheet.create({
    container:{
        flexDirection   : 'row',
        backgroundColor : '#16797f',
        padding         : 10,
        paddingTop      : 22,
    },
    toolbarText:{
        color       : '#fff',
        fontWeight  : 'bold',
        fontSize    : 18,
        flex        : 1,
        textAlign: 'center'
    },
    button:{
        width:25,
        height:25,
        paddingLeft:4,
        borderRadius:3
    },
    icon:{
        tintColor:'#fff',
        width:15,
        height:15,
        marginTop:4
    }
});

module.exports = Toolbar;