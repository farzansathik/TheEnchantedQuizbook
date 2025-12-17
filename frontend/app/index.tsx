import { View, Text, ScrollView, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Link } from 'expo-router';

export default function HomePage() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F5F5DC' }}>
      {/* Hero Section */}
<ImageBackground
  source={{
    uri: 'https://wallpapercat.com/w/full/9/b/a/2165115-3840x1080-desktop-dual-screen-hogwarts-castle-wallpaper.jpg',
  }}
  style={{
    height: 240,  // fixed height instead of flex
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
  }}
>
  <Image
    source={require('../assets/images/app_logo2.png')} // <-- your uploaded logo
    style={{
      width: 600, // increase this
      height: 380, // increase this
      resizeMode: 'contain',
    }}
  />
</ImageBackground>



      {/* Latest Quizzes */}
      <View style={{ padding: 30, backgroundColor: '#f9f5ee' }}>
        <Text
    style={{
    fontSize: 29,
    fontWeight: '900',
    fontStyle: 'italic',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 30,
    color: '#1e1e1e',
  }}
>
  Welcome to the Wizarding Paradise!
</Text>

        {/* Patronus Quiz Card */}
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#0d0b28',
            borderRadius: 16,
            overflow: 'hidden',
            maxWidth: 1000,
            alignSelf: 'center',
            marginBottom: 40,
            flexWrap: 'wrap',
          }}
        >
          <Image
            source={{
              uri: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/05/harry-potter-s-stag-patronus.jpg',
            }}
            style={{
              width: 400,
              height: 250,
              resizeMode: 'cover',
              flexShrink: 0,
            }}
          />
          <View style={{ flex: 1, padding: 25, justifyContent: 'center' }}>
            <Text style={{ fontSize: 12, color: '#aaa', textTransform: 'uppercase' }}>Featured Quiz</Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff', marginVertical: 8 }}>
              The Patronus Quiz
            </Text>
            <Text style={{ fontSize: 16, color: '#ccc', marginBottom: 10 }}>
              What animal is your magical guardian? Take this quiz to discover your Patronus charm!
            </Text>
            <Text style={{ fontSize: 12, color: '#888', marginBottom: 15 }}>By Pottermore</Text>
            <Link href="/quiz/patronus" asChild>
              <TouchableOpacity
                style={{
                  borderColor: '#fff',
                  borderWidth: 1,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 30,
                  alignSelf: 'flex-start',
                }}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>TAKE QUIZ</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {/* Forest Quiz Card */}
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#0d0b28',
            borderRadius: 16,
            overflow: 'hidden',
            maxWidth: 1000,
            alignSelf: 'center',
            marginBottom: 40,
            flexWrap: 'wrap',
          }}
        >
          <Image
            source={{ uri: 'https://the-club.com/wp-content/uploads/Harry_potter.jpg' }}
            style={{
              width:400,
              height: 250,
              resizeMode: 'cover',
              // borderTopLeftRadius: 16,
              // borderBottomLeftRadius: 16,
              flexShrink: 0,
            }}
          />
          <View style={{ flex: 1, padding: 25, justifyContent: 'center' }}>
            <Text style={{ fontSize: 12, color: '#aaa', textTransform: 'uppercase' }}>Featured Quiz</Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff', marginVertical: 8 }}>
              The Forbidden Forest Quiz
            </Text>
            <Text style={{ fontSize: 16, color: '#ccc', marginBottom: 10 }}>
              Could you survive a stroll in Hogwarts’ most terrifying forest? Try our quiz on the spooky wizarding woodlands!
            </Text>
            <Text style={{ fontSize: 12, color: '#888', marginBottom: 15 }}>By Pottermore</Text>
            <Link href="/quiz/forest" asChild>
              <TouchableOpacity
                style={{
                  borderColor: '#fff',
                  borderWidth: 1,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 30,
                  alignSelf: 'flex-start',
                }}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>TAKE QUIZ</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
