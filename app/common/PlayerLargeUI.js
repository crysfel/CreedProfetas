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
    TouchableWithoutFeedback,
    ActivityIndicatorIOS,
    ScrollView
} = React;

class Player extends Component{

    constructor(props) {
        super(props);
        
        this.state = {
            isLoading   : false,
            loaded      : false,
            playing     : false,
            url         : props.url,
            progress    : 0,
            duration    : 0,
            currentTime : 0
        };
    }

    setProgressWidth(event){
        this.barWidth = event.nativeEvent.layout.width;
    }

    toggleSound(){
        var playing = !this.state.playing;
        
        if(this.state.currentTime === 0 && !this.state.loaded){
            this.state.isLoading = true;
        }

        this.setState({
            playing : playing,
            url     : this.state.url
        });

        if(this.props.onToggle){
            this.props.onToggle(playing);
        }
    }

    setDuration(song){
        this.setState({
            duration : song.duration,
            isLoading: false,
            loaded   : true
        });
    }

    setTime(song){
        var percentage = 100 * song.currentTime / this.state.duration,
            width = this.barWidth * percentage / 100;
        
        this.setState({
            progress        : width,
            currentTime     : song.currentTime
        });
    }

    onEnd(){}

    timeFormat(seconds) {
        var minutes = Math.floor(seconds / 60);
        var seconds = (seconds % 60).toFixed(0);
        return (minutes<10?'0'+minutes:minutes) + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
    
    render(){
        return (
            <Image style={styles.player}
                source={require('image!gradient')}>
                <View style={styles.backdropView}>
                    <TouchableWithoutFeedback 
                        onPress={this.toggleSound.bind(this)}>
                        
                        {this.renderButton()}
                        
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.progressBarContainer}>
                    <Text style={styles.progressBarTimer}>{this.timeFormat(this.state.currentTime)}</Text>
                    <View style={styles.progressBarTotal} onLayout={this.setProgressWidth.bind(this)}>
                        <View style={[styles.progressBar,{width:this.state.progress}]} />
                    </View>
                    <Text style={styles.progressBarTimer}>{this.timeFormat(this.state.duration)}</Text>
                </View>
                
                {this.renderLoading()}
                {this.renderAudioPlayer()}
            </Image>
        );
    }

    renderButton(){
        if(!this.state.playing){
            return (
                <Image style={styles.largeButton}
                    source={require('image!player6')} />
            );
        }else{
            return (
                <Image style={styles.largeButton}
                    source={require('image!player12')} />
            );
        }
    }

    renderAudioPlayer(){
        if(this.state.url){
            return (
                <Video source={{uri: this.state.url}} // Can be a URL or a local file.
                    rate={1.0}                   // 0 is paused, 1 is normal.
                    volume={1.0}                 // 0 is muted, 1 is normal.
                    muted={false}                // Mutes the audio entirely.
                    paused={!this.state.playing}               // Pauses playback entirely.
                    resizeMode="cover"           // Fill the whole screen at aspect ratio.
                    repeat={false}                // Repeat forever.
                    onLoad={this.setDuration.bind(this)}    // Callback when video loads
                    onProgress={this.setTime.bind(this)}    // Callback every ~250ms with currentTime
                    onEnd={this.onEnd.bind(this)}/>         // Callback when playback finishes
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
        height: 250,
        resizeMode:'stretch'
    },
    backdropView:{
        backgroundColor: 'rgba(0,0,0,0)',
        width:Device.width,
        height:180,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',

    },
    largeButton:{
        width:150,
        height:150,
        tintColor:'#fff'
    },
    progressBarContainer:{
        width:Device.width,
        backgroundColor: 'rgba(0,0,0,0)',
        flexDirection:'row'
    },
    progressBarTotal:{
        flex:1,
        height:6,
        backgroundColor:'rgba(255,255,255,0.3)',
        borderRadius:3,
        marginTop:4
    },
    progressBarTimer : {
        color:'#fff',
        width:50,
        textAlign:'center',
        fontSize:10
    },
    progressBar:{
        backgroundColor:'#fff',
        width:100,
        height:6,
        borderRadius:3,
    },
    loadingContiner:{
        width:Device.width,
        backgroundColor: 'rgba(0,0,0,0)',
        padding:10,
        alignItems:'center'
    },
    loadingText:{
        color:'#fff',
        fontSize:10,
        textAlign:'center',
        marginTop:10
    }
});

module.exports = Player;