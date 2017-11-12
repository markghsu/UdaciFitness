import React, {Component} from 'react'
import {View, TouchableOpacity, Text} from 'react-native'
import {getMetricMetaInfo, timeToString} from '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciSteppers from './UdaciSteppers'
import DateHeader from './DateHeader'

function SubmitBtn ({onPress}) {
	return (
		<TouchableOpacity onPress={onPress}>
			<Text>Submit</Text>
		</TouchableOpacity>
	)
}


export default class addEntry extends Component {
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

		//Navigate to Home

		//Save to DB

		//Clear local notification
	}
	render(){
		const metaInfo = getMetricMetaInfo()
		return (
			<View>
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
			</View>
		)
	}
}