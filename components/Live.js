import React, {Component} from 'react'
import {View, Text, ActivityIndicator, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import {Foundation} from '@expo/vector-icons'
import {white,purple} from '../utils/colors'

export default class Live extends Component {
	state = {
		coords: null,
		status: 'denied',
		direction: '',
	}
	askPermission:()=>{}
	render() {
		const { status, coords, direction } = this.state

		if (status === null) {
			return <ActivityIndicator style = {{marginTop: 30}} />
		}
		else if (status === 'denied') {
			return (
				<View style={styles.center}>
					<Foundation name='alert' size={50} />
					<Text>You denied location. You can fix this by visiting your settings and enabling location services.</Text>
					
				</View> 
			)
		}
		else if (status === 'undetermined') {
			return (
				<View style={styles.center}>
					<Foundation name='alert' size={50} />
					<Text>You need to enable location services for this app.</Text>
					<TouchableOpacity onPress={this.askPermission} style={styles.button}>
						<Text style={styles.buttonText}>
						Enable
						</Text>
					</TouchableOpacity>
				</View> 
			)
		}
		else {
			return(
				<View>
				<Text>Live</Text>
				<Text>{JSON.stringify(this.state)}</Text>
				</View>
			)
		}
	}
}

const styles = StyleSheet.create({
	container: {
	 flex: 1,
	 justifyContent: 'space-between'
	},
	center: {
	 flex: 1,
	 justifyContent: 'center',
	 alignItems: 'center',
	 marginLeft: 30,
	 marginRight: 30,
	},
	button: {
	 padding: 10,
	 backgroundColor: purple,
	 alignSelf: 'center',
	 borderRadius: 5,
	 margin: 20,
	},
	buttonText :{
	 color: white,
	 fontSize: 20,
	}
})