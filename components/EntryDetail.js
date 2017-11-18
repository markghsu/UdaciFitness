import React, {Component} from 'react'
import {View,Text, StyleSheet} from 'react-native'
import {purple} from '../utils/colors.js'

class EntryDetail extends Component {
	static navigationOptions = ({navigation}) => {
		const{ entryID } = navigation.state.params
		const year = entryID.slice(0,4)
		const month = entryID.slice(5,7)
		const day = entryID.slice(8)

		return{
			title: `${month}/${day}/${year}`
		}
	}
	render(){
		return (
			<View>
				<Text style={{color:purple,fontSize:22,margin:8}}>
					Entry Detail View - {this.props.navigation.state.params.entryID}
				</Text>
			</View>
		)
	}
}

export default EntryDetail
