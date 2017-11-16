import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {white,orange,blue,purple,lightPurp,gray,red,pink} from '../utils/colors.js'


export default function TextButton ({children,onPress,style={}}) {
	return (
		<View>
			<TouchableOpacity onPress={onPress}>
				<View>
					<Text style={[styles.reset, style]}>{children}</Text>
				</View>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	reset:{
		textAlign: 'center',
		color: purple
	}
})