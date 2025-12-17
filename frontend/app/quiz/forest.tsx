import { View, Text, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ForestQuizIntro() {
  return (
    <ImageBackground
      source={{ uri: 'https://4kwallpapers.com/images/wallpapers/hogwarts-harry-2560x1080-13694.jpg' }}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <TouchableOpacity
        onPress={() => router.back()} // Use router.back()
        style={{
          position: 'absolute',
          top: 40,
          left: 20,
          zIndex: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
        <Text style={{ color: 'white', marginLeft: 5 }}>Menu</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={{ alignItems: 'center', marginBottom: 30 }}>
          <Image
            source={{ uri: 'https://wallpapers.com/images/featured/platform-9-3-4-xx8smevnxy5gvrz6.jpg' }}
            style={{
              width: 280,
              height: 280,
              borderRadius: 140,
              borderWidth: 4,
              borderColor: '#5e5eff',
              marginBottom: 20,
            }}
          />
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: 'white' }}>
            The Forbidden Forest Quiz
          </Text>
          <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 10, color: 'white' }}>
            This spooky woodland near Hogwarts castle is full of mysteries and magical creatures...{'\n'}
            Step inside (at your peril!) and test how much you remember about it.
          </Text>
          <Text style={{ fontSize: 12, color: '#ddd' }}>18th May 2025 | 15 Questions</Text>

          <Link href="/quiz/forest_run" asChild>
            <TouchableOpacity
              style={{
                marginTop: 25,
                backgroundColor: '#5e5eff',
                paddingVertical: 12,
                paddingHorizontal: 25,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Start Quiz</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/" asChild>
            <Text style={{ marginTop: 15, fontSize: 14, color: '#5e5eff', textDecorationLine: 'underline' }}>
              ← More Quizzes
            </Text>
          </Link>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
