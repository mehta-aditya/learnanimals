import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import TopNav from './components/TopNav.js';
import { ImagesAssets } from '../assets/ImagesAssets.js';
import { storeLogo, getLogo } from './backend/Storage.js';


//component for each image
const LogoImage = (props) => {
    const [logo, setLogo] = useState(null);
    getLogo().then((val) => setLogo(val));
    return (
        <TouchableOpacity onPress={() => {
            storeLogo(props.name).then(() => {
                props.rerender();
            })
            
            }}>

            <View style={{position: 'relative', marginTop: 20}}>
                {/* Selected Icon */}
                {logo === props.name && 
                <>
                    <Image style={{ position: 'relative', width: 100, height: 100}} source={props.source}/>
                </>
                }

                {/* Grayed out Icons */}
                {logo != props.name && 
                <>
                    <Image style={{position: 'absolute', width:100, height: 100,  tintColor: 'gray'}} source={props.source}/>
                    <Image style={{ position: 'relative', width: 100, height: 100, opacity: 0.2}} source={props.source}/>
                </>
                }
                
            </View>
        </TouchableOpacity>
    )
}


const Profile = () => {
    const [render, setRender] = useState(0);
    const reRender = () => {
        setRender(render+1);
    } 

    return (
        <View style={styles.container}>
            <TopNav/>
            <Text style={styles.title}>Profile</Text>

            {/* Profile Logos */}
            <LogoImage source={ImagesAssets.chicken} name="chicken" rerender={reRender}/>
            <LogoImage source={ImagesAssets.bird} name="bird" rerender={reRender}/>
            <LogoImage source={ImagesAssets.rabbit} name="rabbit" rerender={reRender}/>
            <LogoImage source={ImagesAssets.monkey} name="monkey" rerender={reRender}/>
            <LogoImage source={ImagesAssets.lion} name="lion" rerender={reRender}/>
        </View>
    );
  };
    
  const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#8eb69b',
        alignItems: 'center',
        justifyContent: 'center',
      },
      title: {
        fontSize: 40,
        position: 'absolute',
        marginTop: 30,
        top: 40,
        fontWeight: 'bold',
        color: 'white'
      },
      animalImage: {
        position: 'relative',
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 3,
        textAlign: 'center',
        fontSize: 24,
        borderColor: 'black',
        borderWidth: 3,
        borderRadius: 6,
      }
  });
    
  export default Profile;