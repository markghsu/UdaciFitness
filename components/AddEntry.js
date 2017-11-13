import React, {Component} from 'react'
import {View, ScrollView, TouchableOpacity, Text} from 'react-native'
import {getMetricMetaInfo, timeToString} from '../utils/helpers'
import {Ionicons} from '@expo/vector-icons'
import UdaciSlider from './UdaciSlider'
import UdaciSteppers from './UdaciSteppers'
import TextButton from './TextButton'
import DateHeader from './DateHeader'
import { submitEntry,removeEntry } from '../utils/api'
import {connect} from 'react-redux'
import {addEntry} from '../actions'


function SubmitBtn ({onPress}) {
	return (
		<TouchableOpacity onPress={onPress}>
			<Text>Submit</Text>
		</TouchableOpacity>
	)
}

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
			[key]:null
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
				<View>
					<Ionicons name='ios-happy-outline'
					size={100}
					/>
					<Text>You have already submitted your information for today</Text>
					<TextButton onPress={this.reset}>Reset</TextButton>
				</View>
			)
		}
		else {
			return (
				<ScrollView>
					<DateHeader date={(new Date()).toLocaleDateString()}/>
					{
						Object.keys(metaInfo).map((key) => {
							const {type,getIcon,...rest} = metaInfo[key]
							const value = this.state[key]
						return (
							<View key={key}>
							{getIcon()}
							{type === 'slider' ?
								<UdaciSlider 
									value={value}
									onChange={(val)=>this.slide(key,val)}
									{...rest}
								/>
							:
								<UdaciSteppers 
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
		alreadyLogged: state[key]
	}
}

export default connect(mapStateToProps)(AddEntry)