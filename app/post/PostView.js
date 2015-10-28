"use strict";

var React   = require('react-native');
var Toolbar = require('../common/Toolbar');
var Device = require('../common/Device');
var Player = require('../common/PlayerLargeUI');

var STORAGE_KEY = '@CreedProfetasData:key';

var {
    Component,
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight,
    ScrollView
} = React;

class PostView extends Component{

    constructor(props) {
        super(props);
    }


    onToggle(playing){
        
    }

    goBack(){
        this.props.navigator.pop();
    }

    render(){
        var post = this.props.post;

        return (
            <View style={styles.mainContainer}>
                <Toolbar 
                    title={post.title} 
                    backBtn={true} 
                    onPress={this.goBack.bind(this)}>
                </Toolbar>
                
                <Player url={post.mp3.url} onToggle={this.onToggle.bind(this)}></Player>
                
                <ScrollView style={styles.postContainer}>
                    <Text style={styles.content}>{post.content}</Text>
                </ScrollView>
            </View>
        );
    }

}

var styles = StyleSheet.create({
    mainContainer:{
        flex:1
    },
    content:{
        padding:10,
        fontSize:14,
        lineHeight:21
    }
});

module.exports = PostView;