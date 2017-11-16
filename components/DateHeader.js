import React, {Component} from 'react'
import {Text} from 'react-native'
import {purple} from '../utils/colors.js'


export default function DateHeader ({date}) {
	return (
		<Text style={{color:purple,fontSize:22,margin:8}}>
			{date}
		</Text>
	)
}