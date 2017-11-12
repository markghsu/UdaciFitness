import React, {Component} from 'react'
import {View, Text, Slider} from 'react-native'


export default function UdaciSlider ({max,step,unit,value,onChange}) {
	return (
		<View>
			<Slider
				max={max}
				step={step}
				maximumValue={max}
				minimumValue={0}
				value={value}
				onValueChange={onChange}
			/>
			<View>
				<Text>{value}</Text>
				<Text>{unit}</Text>
			</View>
		</View>
	)
}