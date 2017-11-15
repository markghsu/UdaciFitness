import React, {Component} from 'react'
import {View, ScrollView, TouchableOpacity, Text, StyleSheet, Platform} from 'react-native'
import {getMetricMetaInfo, timeToString, getReminder} from '../utils/helpers'
import {Ionicons} from '@expo/vector-icons'
import UdaciSlider from './UdaciSlider'
import UdaciSteppers from './UdaciSteppers'
import TextButton from './TextButton'
import DateHeader from './DateHeader'
import { submitEntry,removeEntry } from '../utils/api'
import {connect} from 'react-redux'
import {addEntry} from '../actions'
import {white, purple, lightPurp} from '../utils/colors'


function SubmitBtn ({onPress}) {
	return (
		<TouchableOpacity onPress={onPress} style={Platform.OS === 'ios'?styles.iosSubmit:styles.androidSubmit}>
			<Text style={styles.submitBtnText}>Submit</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor: '#fff',
		padding:20
	},
	date: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	day: {
		flex: 1,
		flexDirection: 'row'
	},
	iosSubmit:{
		backgroundColor: purple,
		padding:10,
		borderRadius:7,
		height:45,
		marginLeft:40,
		marginRight:40
	},
	androidSubmit:{
		backgroundColor: purple,
		padding:10,
		paddingLeft:30,
		paddingRight:30,
		borderRadius:2,
		height:45,
		alignSelf:'flex-end',
		justifyContent: 'center',
		alignItems: 'center'
	},
	submitBtnText:{
		color:white,
		fontSize: 22,
		textAlign: 'center'
	},
	center:{
		flex:1,
		justifyContent: 'center',
		alignItems: 'center',

	}
});

class AddEntry extends Component {
	state = {
		run:0,
		bike:0,
		swim:0,
		sleep:0,
		eat:0
	}
	increment = (metric) => {
		const {max,step} = getMetricMetaInfo(metric)
		this.setState((s)=>{
			const count = s[metric] + step
			return {
				...s,
				[metric]: count > max ? max:count
			}
		})
	}
	decrement = (metric) => {
		const {step} = getMetricMetaInfo(metric)
		this.setState((s)=>{
			const count = s[metric] - step
			return {
				...s,
				[metric]: count < 0 ? 0:count
			}
		})
	}
	reset = () => {
		const key = timeToString() 
		//Update Redux
		this.props.dispatch(addEntry({
			[key]:getReminder()
		}))
		//Navigate to Home

		//Save to DB
		submitEntry ({key})

		this.setState(()=> ({
			run:0,
			bike:0,
			swim:0,
			sleep:0,
			eat:0
		}))
	}
	slide = (metric,value) => {
		this.setState(()=>({[metric]:value}))
	}
	submit = () => {
		const key = timeToString()
		const entry = this.state

		this.setState(()=> ({
			run:0,
			bike:0,
			swim:0,
			sleep:0,
			eat:0
		}))
		//Update Redux
		this.props.dispatch(addEntry({
			[key]:entry
		}))
		//Navigate to Home

		//Save to DB
		submitEntry ({entry, key})

		//Clear local notification
	}
	render(){
		const metaInfo = getMetricMetaInfo()
		if (this.props.alreadyLogged){
			return (
				<View style={styles.center}>
					<Ionicons name={Platform.OS==='ios'?'ios-happy-outline':'md-happy'}
					size={100}
					/>
					<Text>You have already submitted your information for today</Text>
					<TextButton style={{padding:10,color:lightPurp}} onPress={this.reset}>Reset</TextButton>
				</View>
			)
		}
		else {
			return (
				<ScrollView style={styles.container}>
					<DateHeader date={(new Date()).toLocaleDateString()}/>
					{
						Object.keys(metaInfo).map((key) => {
							const {type,getIcon,...rest} = metaInfo[key]
							const value = this.state[key]
						return (
							<View key={key} style={styles.day}>
							{getIcon()}
							{type === 'slider' ?
								<UdaciSlider 
									style={{flex:4}}
									value={value}
									onChange={(val)=>this.slide(key,val)}
									{...rest}
								/>
							:
								<UdaciSteppers
									style={{flex:4}}
									value={value}
									onIncrement={()=>this.increment(key)}
									onDecrement={()=>this.decrement(key)}
									{...rest}
								/>
							}
							</View>
						)
					})}

						<SubmitBtn onPress={this.submit}/>
				</ScrollView>
			)
		}
	}
}

function mapStateToProps(state){
	const key = timeToString()

	return {
		alreadyLogged: state[key] && typeof state[key].today === 'undefined'
	}
}

export default connect(mapStateToProps)(AddEntry)