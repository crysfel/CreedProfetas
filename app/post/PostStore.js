"use strict";

var React   = require('react-native');

var STORAGE_KEY = '@CreedProfetasData:key';
var LATEST_KEY = '@CreedProfetasLatest:key';

var {
    AsyncStorage,
    AlertIOS
} = React;

class PostStore{

    constructor(props) {
        super(props);

        this.state = {
            isLoading   : false,
            isBible     : props.isBible,
            url         : props.url
        };
    }

    load(){
        var me = this;

        fetch(me.state.url)
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
            })
            .catch(function(error){
                AlertIOS.alert('Alerta','Al parecer no tienes conexión a internet, es necesario conectarte para acceder a las últimas actualizaciones.');
                me.setState({
                    isLoading   : false
                });
            })
            .done();
    }

    saveLocalData(data){
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

    getLocalData(){
        AsyncStorage.getItem(STORAGE_KEY)
            .then((value) => {
                var response = JSON.parse(value);

                this.setState({
                    dataSource  : this.state.dataSource.cloneWithRows(response.data.filter((item) => {
                        if(me.status.isBible){
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
}


module.exports = PostStore;