"use strict";

var React = require('react-native');
var AboutView = require('../about/AboutView');
var PostMain = require('../post/PostMain');
var CalendarMain   = require('../calendar/CalendarMain');

var {
    TabBarIOS,
    Component,
    View,
    StyleSheet,
} = React;

class PhoneView extends Component{


    constructor(props) {
        super(props);
        this.state = {
            selectedTab : 'bible',
            showPlayerUI: false,
            url         : '',
            isLoading   : false,
            loaded      : false,
            playing     : false,
            duration    : 0,
            percentage  : 0,
            post        : null
        };
    }

    render(){
        return (
            <TabBarIOS 
                selectedTab={this.state.selectedTab}
                tintColor="#238789">
                <TabBarIOS.Item
                    selected={this.state.selectedTab === 'bible'}
                    icon={require('image!christianity')}
                    title='Biblia'
                    onPress={() => {
                        this.setState({
                            selectedTab: 'bible'
                        });
                    }}>
                    <PostMain isBible={true}/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    selected={this.state.selectedTab === 'egw'}
                    icon={require('image!book263')}
                    title='EGW'
                    onPress={() => {
                        this.setState({
                            selectedTab: 'egw'
                        });
                    }}>
                    <PostMain isBible={false}/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    selected={this.state.selectedTab === 'calendar'}
                    icon={require('image!calendar146')}
                    title='Calendario'
                    onPress={() => {
                        this.setState({
                            selectedTab: 'calendar'
                        });
                    }}>
                    <CalendarMain/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    selected={this.state.selectedTab === 'info'}
                    icon={require('image!information15')}
                    title='Qué es BHP?'
                    onPress={() => {
                        this.setState({
                            selectedTab: 'info'
                        });
                    }}>
                    <AboutView/>
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
}

module.exports = PhoneView;