import React, {Component} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'


export default function TextButton ({children,onPress}) {
	return (
		<View>
			<TouchableOpacity onPress={onPress}>
				<View>
					<Text>{children}</Text>
				</View>
			</TouchableOpacity>
		</View>
	)
}