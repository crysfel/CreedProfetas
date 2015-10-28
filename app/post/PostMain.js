"use strict";

var React   = require('react-native');
var PostList = require('./PostList');

var {
    Component,
    NavigatorIOS,
    StyleSheet
} = React;

class PostMain extends Component{

    render(){
        return (
            <NavigatorIOS
                style={styles.container}
                navigationBarHidden={true}
                initialRoute={{
                    component   : PostList,
                    passProps   : {
                        isBible : this.props.isBible
                    }
                }}/>
        );
    }

}

var styles = StyleSheet.create({
    container:{
        flex:1
    }
});

module.exports = PostMain;