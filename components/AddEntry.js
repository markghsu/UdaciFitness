import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {getMetricMetaInfo} from '../utils/helpers'

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
				...state,
				[metric]: count > max ? max:count
			}
		})
	}
	decrement = (metric) => {
		const {step} = getMetricMetaInfo(metric)
		this.setState((s)=>{
			const count = s[metric] - step
			return {
				...state,
				[metric]: count < 0 ? 0:count
			}
		})
	}
	slide = (metric,value) => {
		this.setState(()=>({[metric]:value}))
	}
	render(){
		console.log(getMetricMetaInfo('bike'))
		return (
			<View>
					{getMetricMetaInfo('bike').getIcon()}
			</View>
		)
	}
}