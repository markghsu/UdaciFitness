import React, {Component} from 'react'
import {View, Text, ActivityIndicator } from 'react-native'
import {connect} from 'react-redux'
import {receiveEntries, addEntry} from '../actions'
import {timeToString, getReminder} from '../utils/helpers'
import {fetchCalendarResults} from '../utils/api'
import UdaciFitnessCalendar from 'udacifitness-calendar'
import {white,purple} from '../utils/colors'
import DateHeader from './DateHeader'
import MetricCard from './MetricCard'
import { AppLoading } from 'expo'

export default class Live extends Component {
	state = {
		coords: null,
		status: 'denied',
		direction: '',
	}
	render() {
		const { status, coords, direction } = this.state

		if (status === null) {
			return <ActivityIndicator style = {{marginTop: 30}} />
		}
		else if (status === 'denied') {
			return <View><Text>Denied</Text></View>
		}
		else if (status === 'undetermined') {
			return <View><Text>undetermined</Text></View>
		}
		else {
			return(
				<View>
				<Text>Live</Text>
				<Text>{JSON.stringify(this.state)}</Text>
				</View>
			)
		}
	}
}