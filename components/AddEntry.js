import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {getMetricMetaInfo} from '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciSteppers from './UdaciSteppers'

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
		const metaInfo = getMetricMetaInfo()
		return (
			<View>
				{
					Object.keys(metaInfo).map((key) => {
						const {type,getIcon,...rest} = metaInfo[key]
						const value = this.state[metaInfo[key]]
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
			</View>
		)
	}
}