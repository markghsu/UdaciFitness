import React, {Component} from 'react'
import {View, Text, Slider, StyleSheet} from 'react-native'


export default function UdaciSlider ({max,step,unit,value,onChange}) {
	return (
		<View>
			<Slider
				style={{flex:4}}
				max={max}
				step={step}
				maximumValue={max}
				minimumValue={0}
				value={value}
				onValueChange={onChange}
			/>
			<View style={styles.container}>
				<Text>{value}</Text>
				<Text>{unit}</Text>
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
  });