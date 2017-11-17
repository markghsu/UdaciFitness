import React, {Component} from 'react'
import {View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import {connect} from 'react-redux'
import {receiveEntries, addEntry} from '../actions'
import {timeToString, getReminder} from '../utils/helpers'
import {fetchCalendarResults} from '../utils/api'
import UdaciFitnessCalendar from 'udacifitness-calendar'
import {white,purple} from '../utils/colors'
import DateHeader from './DateHeader'
import MetricCard from './MetricCard'
import { AppLoading } from 'expo'

class History extends Component {
	state = {
		ready:false
	}
	componentDidMount(){
		const {dispatch} = this.props

		fetchCalendarResults().then((entries)=>dispatch(receiveEntries(entries)))
		.then((entries)=>{
			if(!entries[timeToString()]){
				dispatch(addEntry({[timeToString()]:getReminder()}))
			}
		}).then (()=>this.setState(()=>({ready:true})))
	}
	renderItem = ({today, ...metrics},formattedDate,key) => (
		<View style={styles.item}>
			{today?
				<View>
					<DateHeader date={formattedDate} />
					<Text style={styles.noDataText}>
					{JSON.stringify(today)}
					</Text>
				</View>
			:<TouchableOpacity onPress={()=>{console.log('pressed')}}>
				<MetricCard metrics={metrics} date={formattedDate} />
			</TouchableOpacity>}
		</View>
	)
	renderEmptyDate = (formattedDate) => (
		<View style={styles.item}>
			<DateHeader date={formattedDate}/>
			<Text style={styles.noDataText}>No Data For this Day</Text>
		</View>
		)
	render(){
		const {entries} = this.props
		const {ready} = this.state

		if(ready === false) {
			return <AppLoading />
		}
		return(
				<UdaciFitnessCalendar
					items={entries}
					renderItem={this.renderItem}
					renderEmptyDate={this.renderEmptyDate}
				/>
		)
	}
}

const styles = StyleSheet.create({
	item:{
		backgroundColor:white,
		borderRadius: Platform.OS === 'ios'?16:2,
		padding: 20,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 17,
		justifyContent: 'center',
		shadowRadius: 3,
		shadowOpacity: 0.8,
		shadowColor: 'rgba(0,0,0,0.24)',
		shadowOffset: {
			width: 0,
			height: 3,
		}
	},
	noDataText: {
		paddingTop:20,
		paddingBottom:20,
		fontSize:20
	}
})

function mapStateToProps(entries){
	return {
		entries
	}
}

export default connect(mapStateToProps)(History)