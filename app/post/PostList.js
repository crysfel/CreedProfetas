"use strict";

var React   = require('react-native');
var Toolbar = require('../common/Toolbar');
var Banner = require('../common/Banner');
var PostView = require('./PostView');

var STORAGE_KEY = '@CreedProfetasData:key';
var DAYS_WEEK = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
var MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

var {
    Component,
    View,
    Text,
    Image,
    StyleSheet,
    AsyncStorage,
    ListView,
    TouchableHighlight,
    NavigatorIOS
} = React;

class PostList extends Component{

    constructor(props) {
        super(props);
        this.state = {
            dataSource  : new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            })
        };
    }

    componentDidMount() {
        var me = this;

        AsyncStorage.getItem(STORAGE_KEY)
            .then((value) => {
                var response = JSON.parse(value);

                this.setState({
                    dataSource  : this.state.dataSource.cloneWithRows(response.data.filter((item) => {
                        if(me.props.isBible){
                            return !item.book;
                        }else{
                            return item.book;
                        }
                    })),
                });

            })
            .catch((error) => console.log(error.message))
            .done();
    }

    showPost(post){
        this.props.navigator.push({
            title       : post.title,
            component   : PostView,
            passProps   : {
                post    : post
            }
        });
    }

    render(){
        var title;

        if(this.props.isBible){
            title = "Capítulo diario de la Biblia";
        }else{
            title = "Ellen G. White";
        }

        return (
            <View style={styles.mainContainer}>
                <Toolbar title={title}></Toolbar>
                <Banner></Banner>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderPost.bind(this)}
                    style={styles.listView} /> 
            </View>
        );
    }

    renderPost(post){
        var date = new Date(post.pubDate[0]);

        post.preview = `${DAYS_WEEK[date.getDay()]} ${date.getDate()}, ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;

        return (
            <TouchableHighlight 
                style={styles.postContainer}
                underlayColor='#dddddd'
                onPress={() => this.showPost(post)}>
                <View style={styles.postItem}>
                    <Image style={styles.postImage}
                    source={{uri:post.tns}} />
                    <View style={styles.postContent}>
                        <Text style={styles.title}>{post.title}</Text>
                        <Text style={styles.preview}>{post.preview}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

}

var styles = StyleSheet.create({
    mainContainer:{
        flex:1
    },
    listView:{
        flex:1
    },
    postContainer:{
        margin:5,
        backgroundColor:'#fff',
        overflow:'hidden',
        borderRadius:3,
    },
    postItem  :{
        flexDirection: 'row'
    },
    postImage:{
        height: 50,
        width : 50,
        borderRadius:3,
    },
    postContent:{
        paddingLeft: 10,
        flex   : 1
    },
    title:{
        fontWeight:'bold',
        fontSize:14
    },
    preview:{
        color: '#656565',
        lineHeight:16,
        fontSize:11
    },
});

module.exports = PostList;