import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {connect} from 'react-redux'
import {receiveEntries, addEntry} from '../actions'
import {timeToString, getReminder} from '../utils/helpers'
import {fetchCalendarResults} from '../utils/api'

class History extends Component {
	componentDidMount(){
		const {dispatch} = this.props

		fetchCalendarResults().then((entries)=>dispatch(receiveEntries(entries)))
		.then((entries)=>{
			if(!entries[timeToString()]){
				dispatch(addEntry({[timeToString()]:getReminder()}))
			}
		})
	}
	render(){
		return(
			<View>
				<Text>{JSON.stringify(this.props)}</Text>
			</View>
		)
	}
}

function mapStateToProps(entries){
	return {
		entries
	}
}

export default connect(mapStateToProps)(History)