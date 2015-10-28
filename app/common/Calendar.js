"use strict";

var React   = require('react-native');
var Device  = require('../common/Device');

var daysOfWeek = ['DOM','LUN','MAR','MIE','JUE','VIE','SAB'];
var STORAGE_KEY = '@CreedProfetasData:key';

var {
    Component,
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight,
    AsyncStorage
} = React;

class Calendar extends Component{

    constructor(props){
        super(props)

        this.state = {
            currentMonth : this.calculateMonthValues(props.date),
            events       : {}
        };
    }

    componentDidMount() {
        var me = this;

        AsyncStorage.getItem(STORAGE_KEY)
            .then((value) => {
                var response = JSON.parse(value),
                    events = {},
                    len,i;
                
                for(i=0,len=response.data.length;i<len;i++){
                    var post = response.data[i],
                        date = new Date(post.pubDate[0]),
                        key = date.getFullYear() +''+ date.getMonth() +''+ date.getDate();

                    if(!events[key]){
                        events[key] = {
                            date : date,
                            post : post
                        }
                    }
                }

                me.setState({
                    events : events
                });
            })
            .catch((error) => console.log(error.message))
            .done();
    }

    calculateMonthValues(date){
        var firstDay    = new Date(date.getFullYear(), date.getMonth(), 1),
            lastDay     = new Date(date.getFullYear(), date.getMonth()+1, 0),
            startsOn    = firstDay.getDay(),
            endsOn      = lastDay.getDate();

        return {
            month       : date.getMonth(), 
            year        : date.getFullYear(), 
            date        : date,
            today       : new Date(),
            firstDay    : firstDay,
            lastDay     : lastDay,
            startsOn    : startsOn,
            endsOn      : endsOn
        };
    }

    prevMonth(){
        var prev = this.state.currentMonth.month - 1,
            year = this.state.currentMonth.year;

        if(prev < 0){
            prev = 11;
            year -= 1;
        }

        var date = new Date(year, prev+1, 0);

        this.setState({
            currentMonth : this.calculateMonthValues(date)
        });

        if(this.props.onDateChange){
            this.props.onDateChange(date);
        }
    }

    nextMonth(){
        var next = this.state.currentMonth.month + 1,
            year = this.state.currentMonth.year;

        if(next > 11){
            next = 0;
            year += 1;
        }

        var date = new Date(year,next,1);

        this.setState({
            currentMonth : this.calculateMonthValues(date)
        });

        if(this.props.onDateChange){
            this.props.onDateChange(date);
        }
    }

    onDateChange(day,event){
        var date = new Date(this.state.currentMonth.year, this.state.currentMonth.month, day),
            post;

        this.setState({
            currentMonth : this.calculateMonthValues(date)
        });

        if(this.props.onDateChange){
            if(event && event.post){
                post = event.post;
            }
            this.props.onDateChange(date,post);
        }
    }

    render(){
        return (
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    {this.renderColumns()}
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableHighlight 
                        style={styles.button}
                        underlayColor='#16797f'
                        onPress={this.prevMonth.bind(this)}>
                        <Text style={styles.buttonText}>Ante.</Text>
                    </TouchableHighlight>

                    <View style={{flex:1}}></View>

                    <TouchableHighlight 
                        style={styles.button}
                        underlayColor='#16797f'
                        onPress={this.nextMonth.bind(this)}>
                        <Text style={styles.buttonText}>Sig.</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

    renderColumns(){
        var views = [],
            len,i;

        for(i=0,len=daysOfWeek.length;i<len;i++){
            views.push(
                <View key={'day-week-' + i} style={styles.column}>
                    <Text style={styles.calendarWeekDay}>{daysOfWeek[i]}</Text>
                    {this.renderDays(i)}
                </View>
            );
        }

        return (views);
    }

    renderDays(day){
        var currentMonth = this.state.currentMonth,
            dayViews     = [],
            weeks        = 6,
            event,
            id,
            week,
            num;

        for(week=0; week < weeks ; week++){
            id = week * 7 + day;
            if(currentMonth.startsOn > day && week === 0){
                dayViews.push(<Text key={'day-' + id} style={styles.calendarDayButton}> </Text>);
            }else{
                num = id - currentMonth.startsOn + 1;
                
                event = this.state.events[currentMonth.year +''+ currentMonth.month +''+ num];

                if(num <= currentMonth.endsOn){
                    dayViews.push(
                        <TouchableHighlight 
                            key={'day-btn-' + id}
                            style={[
                                styles.calendarDayButton,
                                event?styles.existEvent:null,
                                num === currentMonth.date.getDate()?styles.selectedDay:null
                            ]}
                            underlayColor='#16797f'
                            onPress={ this.onDateChange.bind(this, num, event)}>
                            <Text key={'day-' + id} style={[styles.calendarNumberDay,num === currentMonth.date.getDate()?styles.selectedTextDay:null]}>
                                {num}
                            </Text>
                        </TouchableHighlight>
                    );
                }
            }
        }

        return dayViews;
    }

}

var styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        padding:10,
    },
    container:{
        flexDirection:'row',
        flex:1
    },
    buttonContainer:{
        flexDirection:'row',
        paddingBottom:60
    },
    column:{
        flex:1
    },
    calendarWeekDay:{
        fontSize:13,
        fontWeight:'300',
        textAlign:'center',
        color:'#16797f'
    },
    calendarDayButton:{
        paddingTop:5,
        paddingBottom:5,
        borderRadius:5,
        marginLeft:5,
        marginRight:5,
        marginBottom:5
    },
    calendarNumberDay:{
        textAlign:'center',
        backgroundColor:'transparent',
    },
    existEvent:{
        backgroundColor:'#f1f1f1',
        borderRadius:5
    },
    selectedDay:{
        backgroundColor:'#16797f',
        borderRadius:5
    },
    selectedTextDay:{
        color:'#fff',
    },
    button:{
        backgroundColor:'#6eaf9d',//'#16797f',
        marginTop:10,
        marginLeft:10,
        marginRight:10,
        width:50,
        height:50,
        borderRadius:25,
    },
    buttonText:{
        backgroundColor:'transparent',
        color:'#fff',
        fontWeight:'200',
        marginTop:15,
        textAlign:'center'
    },
});

module.exports = Calendar;