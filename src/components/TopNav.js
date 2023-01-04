import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function TopNav(props={bgColor: '#8eb69b'}) {
    const navigation = useNavigation();
    return (
        <View style={[styles.container, {backgroundColor: props.bgColor}]}>
            <StatusBar style="auto"/>
            
            {/* Home Button */}     
            <TouchableOpacity style={styles.homeButton}
                onPress={() => navigation.navigate('Home', {})}>
                <FontAwesome name={'home'} size={60} color='black'/>
            </TouchableOpacity>

            {/* Profile */}     
            <TouchableOpacity style={styles.profile}
                onPress={() => Alert.alert("Points: ")}>
                <FontAwesome name={'plus-circle'} size={60} color='black'/>
            </TouchableOpacity>  
        </View>
    );
    };
      

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
      },
    homeButton: {
      top: 60,
      left: 30,
      justifyContent: 'center', 
      alignItems: 'center',
      position: 'absolute',
      
    },
    profile: {
      top: 60,
      right: 30,
      justifyContent: 'center', 
      alignItems: 'center',
      position: 'absolute',
      
    },
});
export default TopNav;