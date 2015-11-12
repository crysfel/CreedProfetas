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
    constructor(props){
        super(props);

        this.state = {
            downloadBtn : props.downloadBtn,
            downloaded  : props.downloaded
        };

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            downloaded     : nextProps.downloaded
        });
    }

    goBack(){
        if(this.props.onPress){
            this.props.onPress();
        }
    }

    onRemove(){
        if(this.props.onRemove){
            this.props.onRemove();
        }
    }

    onDownload(){
        if(this.props.onDownload){
            this.props.onDownload();
        }
    }

    render(){
        return (
            <View style={styles.container}>
                {[ this.renderBackButton() ]}
                <Text style={styles.toolbarText}>{this.props.title}</Text>
                {[ this.renderEmptyButton() ]}
                {[ this.renderDownloadButton() ]}
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
        if(this.props.backBtn && !this.state.downloadBtn){
            return (
                <View style={styles.button}>
                </View>
            );
        }
    }

    renderDownloadButton(){
        if(this.state.downloadBtn){
            if(this.state.downloaded){
                return (
                    <TouchableHighlight 
                        style={styles.button}
                        underlayColor='#76B09C'
                        onPress={() => this.onRemove()}>
                            <Image style={styles.icon}
                                source={require('image!delete97')}/>
                    </TouchableHighlight>
                );
            }else{
                return (
                    <TouchableHighlight 
                        style={styles.button}
                        underlayColor='#76B09C'
                        onPress={() => this.onDownload()}>
                            <Image style={styles.icon}
                                source={require('image!cloud107')}/>
                    </TouchableHighlight>
                );
            }
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
        width:28,
        height:28,
        paddingLeft:2,
        borderRadius:3
    },
    icon:{
        tintColor:'#fff',
        width:25,
        height:25,
        marginTop:1
    }
});

module.exports = Toolbar;