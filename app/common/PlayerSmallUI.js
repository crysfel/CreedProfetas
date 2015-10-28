"use strict";

var React   = require('react-native');
var Device  = require('../common/Device');
var Video   = require('react-native-video');

var {
    Component,
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight,
    ActivityIndicatorIOS,
    ScrollView
} = React;

class SmallPlayer extends Component{

    constructor(props) {
        super(props);
        
        this.state = {
            isLoading   : false,
            loaded      : false,
            playing     : null,
            url         : null,
            post        : props.post,
            onToggle    : props.onToggle,
            percentage  : 0,
            width       : 0
        };
    }

    setProgressWidth(event){
        this.barWidth = event.nativeEvent.layout.width;
    }

    setCustomProps(obj){
        this.setState(obj);
    }

    toggleSound(){
        var playing = !this.state.playing;

        if(this.state.currentTime === 0 && !this.state.loaded){
            this.state.isLoading = true;
        }

        this.setState({
            playing : playing
        });

        if(this.state.onToggle){
            this.state.onToggle(playing,this.state.post);
        }
    }
    
    render(){
        return (
            <View style={styles.player}>
                <TouchableHighlight
                    style={styles.controlButton}
                    activeOpacity="0.1"
                    underlayColor="#16797f"
                    onPress={this.toggleSound.bind(this)}>

                    {this.renderButton()}

                </TouchableHighlight>
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{this.state.post.title}</Text>
                    <View style={styles.progressBarTotal} onLayout={this.setProgressWidth.bind(this)}>
                        <View style={[styles.progressBar,{width: this.barWidth * this.state.percentage / 100}]} />
                    </View>
                </View>
            </View>
        );
    }

    renderButton(){
        if(!this.state.playing){
            return (
                <Image style={styles.controlButtonImage}
                    source={require('image!player6')} />
            );
        }else{
            return (
                <Image style={styles.controlButtonImage}
                    source={require('image!player12')} />
            );
        }
    }

    renderLoading(){
        if(this.state.isLoading){
            return (
                <View style={styles.loadingContiner}>
                    <ActivityIndicatorIOS
                        animating={true}
                        color="#fff"
                        style={styles.loadingIndicator}
                        size="small"/>
                </View>
            );
        }
    }

}

var styles = StyleSheet.create({
    player:{
        flexDirection:'row',
        backgroundColor:'#6faf9e',
        padding:10,
        borderTopLeftRadius:5,
        borderTopRightRadius:5
    },
    controlButtonImage:{
        width:40,
        height:40,
        tintColor:'#fff',
        borderRadius:5
    },
    controlButton:{
        width:40,
        height:40,
        borderRadius:5,
    },
    infoContainer:{
        paddingLeft:15,
        flex:1
    },
    title:{
        color:'#fff',
        fontSize:11
    },
    progressBarTotal:{
        flex:1,
        height:6,
        backgroundColor:'rgba(255,255,255,0.3)',
        borderRadius:3,
        marginTop:10
    },
    progressBar:{
        backgroundColor:'#fff',
        flex:1,
        height:6,
        borderRadius:3,
    },
});

module.exports = SmallPlayer;