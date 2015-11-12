"use strict";

var React   = require('react-native');
var Toolbar = require('../common/Toolbar');
var Device = require('../common/Device');
var Player = require('../common/PlayerLargeUI');
var RNFS = require('react-native-fs');

var STORAGE_KEY = '@CreedProfetasData:key';

var {
    Component,
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight,
    ScrollView,
    AlertIOS
} = React;

class PostView extends Component{

    constructor(props) {
        super(props);

        this.state = {
            downloaded  : false,
            url         : null,
            fileName    : null
        };
    }

    componentDidMount(){
        var post    = this.props.post,
            words   = post.mp3.url.split('/'),
            fileName= words[words.length - 1];;

        RNFS.stat(RNFS.DocumentDirectoryPath + '/'+ fileName)
            .then((metadata) => {
                this.setState({
                    downloaded  : true,
                    fileName    : fileName,
                    url         : RNFS.DocumentDirectoryPath + '/'+ fileName
                });
            })
            .catch(() => {
                this.setState({
                    downloaded  : false,
                    fileName    : fileName,
                    url         : post.mp3.url
                });
            });
    }


    onToggle(playing){
        
    }

    goBack(){
        this.props.navigator.pop();
    }

    downloadFile(post){
        var me      = this,
            words   = post.mp3.url.split('/'),
            fileName= words[words.length - 1],
            player  = this.refs.player;


        if(!player.state.isLoading){
            player.setState({isLoading : true});
            RNFS.downloadFile(post.mp3.url,RNFS.DocumentDirectoryPath + '/'+ fileName)
                .then(function(){
                    me.setState({
                        downloaded  : true,
                        fileName    : fileName,
                        url         : RNFS.DocumentDirectoryPath + '/'+ fileName
                    });
                    player.setState({isLoading : false});
                    AlertIOS.alert('Alerta','El audio se ha descargado correctamente, ahora podrás reproducir la lectura sin necesidad de conexión a internet.');
                })
                .catch(function(){
                    player.setState({isLoading : false});
                    AlertIOS.alert('Error','Se ha ocacionado un error al descargar el archivo mp3.');
                });
        }else{
            AlertIOS.alert('Alerta','Actualmente se está descargando el audio, por favor espera...');
        }
    }

    onRemove(post){
        var words   = post.mp3.url.split('/'),
            fileName= words[words.length - 1];

        AlertIOS.alert(
          'Confirmación',
          'Estás seguro de querer borrar este archivo? Para escucharlo tendrás que tener conexión a internet.',
          [
            {text: 'No', onPress: () => console.log('Foo Pressed!')},
            {text: 'Si', onPress: () => {
                RNFS.unlink(RNFS.DocumentDirectoryPath + '/'+ fileName)
                    .spread((success, path) => {
                        this.setState({
                            downloaded  : false,
                            url         : post.mp3.url
                        });
                        AlertIOS.alert('Alerta','Archivo borrado con éxito!');
                    })
                    .catch((err) => {
                        console.log(err.message);
                        AlertIOS.alert('Error','Lo sentimos pero se ocacionó un error al borrar este archivo.');
                    });;
            }},
          ]
        )
    }

    render(){
        var post = this.props.post;

        return (
            <View style={styles.mainContainer}>
                <Toolbar 
                    title={post.title} 
                    backBtn={true} 
                    onPress={this.goBack.bind(this)}
                    downloadBtn={true}
                    downloaded={this.state.downloaded}
                    onDownload={this.downloadFile.bind(this,post)}
                    onRemove={this.onRemove.bind(this,post)}>
                </Toolbar>
                
                <Player ref="player" url={this.state.url} onToggle={this.onToggle.bind(this)}></Player>
                
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