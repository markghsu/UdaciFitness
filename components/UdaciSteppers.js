import React, {Component} from 'react'
import {View, Text, TouchableOpacity,StyleSheet, Platform} from 'react-native'
import {FontAwesome, Entypo} from '@expo/vector-icons'
import {white,orange,blue,purple,lightPurp,gray,red,pink} from '../utils/colors.js'

const styles = StyleSheet.create({
	row:{
		flex:1,
		flexDirection: 'row',
		alignItems: 'center'
	},
	container:{
		justifyContent: 'space-around'
	},
	iosButton:{
		backgroundColor: white,
		borderColor: purple,
		borderRadius: 3,
		borderWidth:1 ,
		padding:5,
		paddingLeft:25,
		paddingRight:25
	},
	androidButton:{
		margin:5,
		padding:10,
		borderRadius:2,
		backgroundColor:purple,

	},
	counter: {
		width: 80,
		justifyContent: 'center',
		alignItems:'center'
	}
})

export default function UdaciSteppers ({max,unit,step,value,onIncrement,onDecrement}) {
	return (
		<View style={[styles.container,styles.row]}>
		{Platform.OS==='ios'?
			<View style={styles.row}>
				<TouchableOpacity style={[styles.iosButton,{borderTopRightRadius:0,borderBottomRightRadius:0}]} onPress={onDecrement}>
					<View>
						<FontAwesome name='minus' color='purple' size={30} />
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.iosButton,{borderTopLeftRadius:0,borderBottomLeftRadius:0}]} onPress={onIncrement}>
					<View>
						<FontAwesome name='plus' color='purple' size={30} />
					</View>
				</TouchableOpacity>
			</View>
			:
			<View style={styles.row}>
				<TouchableOpacity style={[styles.androidButton,{borderTopRightRadius:0,borderBottomRightRadius:0}]} onPress={onDecrement}>
					<View>
						<Entypo name='minus' color='purple' size={30} />
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.androidButton,{borderTopLeftRadius:0,borderBottomLeftRadius:0}]} onPress={onIncrement}>
					<View>
						<Entypo name='plus' color='purple' size={30} />
					</View>
				</TouchableOpacity>
			</View>
		}
			<View style={styles.counter}>
				<Text style={{fontSize:24,textAlign:'center'}}>{value}</Text>
				<Text style={{fontSize:18,textAlign:'center',color:gray}}>{unit}</Text>
			</View>
		</View>
	)
}