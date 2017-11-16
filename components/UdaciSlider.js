import React, {Component} from 'react'
import {View, Text, Slider, StyleSheet} from 'react-native'
import {white,orange,blue,purple,lightPurp,gray,red,pink} from '../utils/colors.js'


export default function UdaciSlider ({max,step,unit,value,onChange}) {
	return (
		<View style={styles.container}>
			<Slider
				style={{flex:1}}
				max={max}
				step={step}
				maximumValue={max}
				minimumValue={0}
				value={value}
				onValueChange={onChange}
			/>
			<View style={styles.counter}>
				<Text style={{fontSize:24,textAlign:'center'}}>{value}</Text>
				<Text style={{fontSize:18,textAlign:'center',color:gray}}>{unit}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'row',
    },
    counter: {
		width: 80,
		justifyContent: 'center',
		alignItems:'center'
	}
  });