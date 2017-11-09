import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {getMetricMetaInfo} from '../utils/helpers'

export default class addEntry extends Component {
	render(){
		console.log(getMetricMetaInfo('bike'))
		return (
			<View>
					{getMetricMetaInfo('bike').getIcon()}
			</View>
		)
	}
}