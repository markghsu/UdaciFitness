import React, {Component} from 'react'
import {View,Text, StyleSheet} from 'react-native'
import {purple,white, lightPurp} from '../utils/colors.js'
import {connect} from 'react-redux'
import MetricCard from './MetricCard'

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
		const {metrics} = this.props
		return (
			<View style={styles.container}>
				<Text style={{color:purple,fontSize:22,margin:8}}>
					Entry Detail View - {this.props.entryID}
				</Text>
				<MetricCard metrics={metrics} />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex:1,
		backgroundColor: white,
		padding:15
	}
})

function mapStateToProps(state,{navigation}){
	const{entryID} = navigation.state.params

	return{
		entryID,
		metrics: state[entryID]
	}
}

export default connect(mapStateToProps)(EntryDetail)
