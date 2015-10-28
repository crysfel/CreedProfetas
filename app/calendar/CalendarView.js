"use strict";

var React   = require('react-native');
var Toolbar = require('../common/Toolbar');
var Device  = require('../common/Device');
var Calendar  = require('../common/Calendar');
var PostView  = require('../post/PostView');

var MONTHS = ['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'];

var {
    Component,
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight,
    AsyncStorage
} = React;

class CalendarView extends Component{

    constructor(props){
        super(props);

        this.state = {
            date    : new Date(),
            post    : null
        };
    }

    onDateChange(date, post){
        this.setState({
            date : date,
            post : post
        });
    }

    showPost(){
        var post = this.state.post;
        if(post){
            this.props.navigator.push({
                title       : post.title,
                component   : PostView,
                passProps   : {post}
            });
        }
    }

    render(){
        return (
            <View style={styles.mainContainer}>
                <Toolbar title="Calendario">
                </Toolbar>

                <Image style={styles.detail}
                    source={require('image!gradient')}>
                    <View style={styles.backdropView}>
                        <View style={styles.containerFlex}>
                            <View style={styles.calendarDetail}>
                                <Text style={styles.calendarDetailMonth}>{MONTHS[this.state.date.getMonth()]}</Text>
                                <Text style={styles.calendarDetailYear}>{this.state.date.getFullYear()}</Text>
                            </View>
                            <Text style={styles.calendarDetailDay}>{this.state.date.getDate()}</Text>
                        </View>
                        
                        {this.renderPostPreview()}
                        
                    </View>
                </Image>

                <Calendar 
                    style={styles.calendar}
                    date={this.state.date}
                    onDateChange={this.onDateChange.bind(this)}>
                </Calendar>
            </View>
        );
    }

    renderPostPreview(){
        if(this.state.post){
            return (
                <View style={styles.containerFlex}>
                    <Text style={styles.postTitle}>{this.state.post.title}</Text>
                    <TouchableHighlight 
                        style={styles.button}
                        underlayColor='#76B09C'
                        onPress={() => this.showPost()}>
                            <Text style={styles.buttonText}>Escuchar</Text>
                    </TouchableHighlight>
                </View>
            );
        }
    }

}

var styles = StyleSheet.create({
    mainContainer:{
        flex:1
    },
    detail : {
        height : 150,
        width:Device.width,
        resizeMode:'stretch'
    },
    backdropView:{
        backgroundColor: 'rgba(0,0,0,0)',
        width:Device.width,
        flexDirection:'row'

    },
    containerFlex:{
        flex:1,
        padding:10
    },
    calendarDetail:{
        flexDirection:'row'
    },
    calendarDetailMonth:{
        color:'#fff',
        fontSize:14,
    },
    calendarDetailYear:{
        color:'#fff',
        fontSize:14,
        paddingLeft:5,
        fontWeight:'300'
    },
    calendarDetailDay:{
        color:'#fff',
        fontSize:35
    },
    postTitle:{
        marginTop:40,
        color:'#fff',
        fontSize:14
    },
    button:{
        backgroundColor:'rgba(255,255,255,0.4)',
        borderRadius:3,
        padding:5,
        marginTop:15,
        width:80
    },
    buttonText:{
        color:'#fff',
        fontSize:14,
        textAlign:'center'
    },
    calendar:{
        flex:1
    }
});

module.exports = CalendarView;