'use strict';

var React = require('react-native');
var Device = require('../common/Device');
var PhoneView = require('./PhoneView');

var REQUEST_URL = 'http://crysfel.com/creedprofetas/data.json';
var DEFAULT_REQUEST_URL = 'data.json';
var STORAGE_KEY = '@CreedProfetasData:key';
var LATEST_KEY = '@CreedProfetasLatest:key';

var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Component,
    ActivityIndicatorIOS,
    AsyncStorage,
    AlertIOS
} = React;

class Viewport extends Component{

    constructor(props) {
        super(props);

        this.state = {
            isLoading   : true
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData(){
        var me = this;

        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {

                AsyncStorage.getItem(LATEST_KEY)
                    .then((value) => {
                        if (value !== null){
                            if(value !== responseData.updatedAt[0]){
                                this.saveData(responseData);    
                            }else{
                                this.setState({
                                    isLoading   : false
                                });
                            }
                        } else {
                            this.saveData(responseData);
                        }
                    })
                    .catch((error) => console.log(error.message))
                    .done();
            })
            .catch(function(error){
                AlertIOS.alert('Alerta','Al parecer no tienes conexión a internet, es necesario conectarte para acceder a las últimas actualizaciones.');
                
                fetch(DEFAULT_REQUEST_URL)
                    .then((response) => response.json())
                    .then((responseData) => {
                        
                        AsyncStorage.getItem(LATEST_KEY)
                            .then((value) => {
                                if (value !== null){
                                    if(value !== responseData.updatedAt[0]){
                                        me.saveData(responseData);    
                                    }else{
                                        me.setState({
                                            isLoading   : false
                                        });
                                    }
                                } else {
                                    me.saveData(responseData);
                                }
                            })
                            .catch((error) => console.log(error.message))
                            .done();

                        me.setState({
                            isLoading   : false
                        });
                    })
                    .done();
            })
            .done();
    }

    saveData(data){
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
            .then(() => {
                this.setState({
                    isLoading   : false
                });

                AsyncStorage.setItem(LATEST_KEY, data.updatedAt[0])
                    .done();
            })
            .catch((error) => console.log(error.message))
            .done();
    }

    render() {
        if(this.state.isLoading){
            return this.renderLoadingView();
        }

        if(Device.isIpad()){
            return (
                <View style={styles.container}>
        
                </View>
            );
        }else{
            return (
                <PhoneView style={styles.container}></PhoneView>
            );
        }
    }

    renderLoadingView() {
        return (
            <View style={styles.loading}>
                <ActivityIndicatorIOS
                    size='large'/>
                <Text>
                    Cargando contenido...
                </Text>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    loading: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center'
    }
});

module.exports = Viewport;
