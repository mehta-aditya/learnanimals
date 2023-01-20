import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import TopNav from './components/TopNav.js';
import { ImagesAssets } from '../assets/ImagesAssets';

const Home = ({navigation}) => {
    return (
      <View style={styles.container}>
        <TopNav/>
        <Text
          style={styles.title}>
          Guess the Animals!
        </Text>

        {/* Background Image */}
        <Image style={styles.bgIMG} source={ImagesAssets.bearinforest}/>
        <View style={styles.container}>
          
        </View>
        {/* Start Button */}
        <TouchableOpacity 
          style={styles.startButton}
          onPress={() => navigation.navigate('Game', {})}>
          <Text style={styles.buttonText}>START</Text>
        </TouchableOpacity>
      </View>
    );
  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8eb69b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButton: {
    width: 150,
    height: 60, 
    bottom: 0,
    marginBottom: 30,
    borderRadius: 10,
    backgroundColor: '#309B94',
    justifyContent: 'center', 
    alignItems: 'center',
    fontWeight: 'bold',
    position: 'relative',
  },
  buttonText: {
    color: 'white',
    fontSize: 18
  },
  bgIMG: {
    width: '100%',
    height: 400, 
    margin: 30,
    marginBottom: 20,
    position: 'relative',
  },
  title: {
    fontSize: 40,
    position: 'relative',
    marginTop: 100,
    fontWeight: 'bold',
    color: 'white'
  }
});

export default Home