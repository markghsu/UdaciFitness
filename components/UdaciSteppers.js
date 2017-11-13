import React, {Component} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {FontAwesome, Entypo} from '@expo/vector-icons'


export default function UdaciSteppers ({max,unit,step,value,onIncrement,onDecrement}) {
	return (
		<View>
			<View>
				<Text>UdaciStepper</Text>
				<TouchableOpacity onPress={onDecrement}>
					<View>
						<FontAwesome name='minus' color='black' size={30} />
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={onIncrement}>
					<View>
						<FontAwesome name='plus' color='black' size={30} />
					</View>
				</TouchableOpacity>
			</View>
			<View>
				<Text>{value}</Text>
				<Text>{unit}</Text>
			</View>
		</View>
	)
}