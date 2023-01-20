import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ImagesAssets } from '../../assets/ImagesAssets';
import { getLogo } from '../backend/Storage';


const LogoMap = {
    'bird': ImagesAssets.bird,
    'chicken': ImagesAssets.chicken,
    'lion': ImagesAssets.lion,
    'monkey': ImagesAssets.monkey,
    'rabbit': ImagesAssets.rabbit
}

const getLogoImage = (logo) => {
    return logo != 0 ? LogoMap[logo] : 0;
}


const TopNav = (props={bgColor: '#8eb69b'}) => {
    const navigation = useNavigation();
    const [logo, setLogo] = useState(null);

    useEffect(() => {
        getLogo().then((val) => setLogo(val));
    })

    return (
        <>
        
        <View style={[styles.container, {backgroundColor: props.bgColor}]}>
            <StatusBar style="auto"/>
            
            {/* Home Button */}     
            <TouchableOpacity style={styles.homeButton}
                onPress={() => navigation.navigate('Home', {})}>
                <FontAwesome name={'home'} size={60} color='black'/>
            </TouchableOpacity>

            {/* Profile */}     
            <TouchableOpacity style={styles.profile}
                onPress={() => navigation.navigate('Profile', {})}>
                    
                {logo && <Image style={{ width: 60, height: 60}} source={getLogoImage(logo)}/>}
                {!logo && <FontAwesome name={'plus-circle'} size={60} color='black'/> }              

            </TouchableOpacity>  
        </View>



        </>


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