"use strict";

var React = require('react-native');
var Toolbar = require('../common/Toolbar');
var Device  = require('../common/Device');

var {
    Component,
    View,
    Text,
    StyleSheet,
    Image
} = React;

class AboutView extends Component{

    render(){
        return (
            <View style={styles.mainContainer}>
                <Toolbar title="¿Qué es BHP?">
                </Toolbar>
                <Image style={styles.bakgroundImage}
                    source={require('image!gradient')}>
                    <View style={styles.backdropView}>
                        <Text style={styles.aboutText}>{"Creed en Sus Profetas, la continuación de Reavivados por su Palabra, es un programa de cinco años de leer la Biblia y los escritos de Elena G. de White seleccionados, incluyendo El Camino a Cristo, vida del gran Maestro, Historia de los Patriarcas y Profetas, Profetas y Reyes, El Deseado de toda Las Gentes, Los Hechos de los Apóstoles y El Conflicto de los Siglos. \n\nRecibe las lecturas diarias de la Biblia, blogs interactivos y seleccione escritos inspiradores."}</Text>
                    </View>
                </Image>
            </View>
        );
    }

}

var styles = StyleSheet.create({
    mainContainer:{
        flexDirection:'column',
        width: Device.width,
        height: Device.height
    },
    bakgroundImage:{
        flex:1,
        resizeMode:'stretch'
    },
    backdropView:{
        backgroundColor: 'rgba(0,0,0,0)',
        width:Device.width,
    },
    aboutText:{
        color:'#fff',
        fontSize:15,
        lineHeight:23,
        padding:20
    }
});

module.exports = AboutView;