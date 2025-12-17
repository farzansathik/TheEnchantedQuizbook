import { View, Text, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function PatronusIntro() {
  return (
    <ImageBackground
      source={{ uri: 'https://i.redd.it/potn7vwaxyj91.png' }}
      style={{ flex: 1 }}
      resizeMode="cover"
    ><TouchableOpacity
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
              <Text style={{ color: 'white', marginLeft: 2 }}>Menu</Text>
            </TouchableOpacity>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={{ alignItems: 'center', marginBottom: 30 }}>
          <Image
            source={{
              uri: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a033c1b6-18ff-4b48-ab0d-a83310b96419/dbs5vfh-9257aa1d-9719-40ab-aac3-17ffde853435.jpg/v1/fill/w_1024,h_1280,q_75,strp/harry_potter___patronus_by_cogitat_dbs5vfh-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2EwMzNjMWI2LTE4ZmYtNGI0OC1hYjBkLWE4MzMxMGI5NjQxOVwvZGJzNXZmaC05MjU3YWExZC05NzE5LTQwYWItYWFjMy0xN2ZmZGU4NTM0MzUuanBnIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.yoxy7Gj_sJmoaUX7cpZS79jGX8j1yy9n42VEzUElH20',
            }}
            style={{
              width: 280,
              height: 280,
              borderRadius: 140,
              borderWidth: 4,
              borderColor: '#5e5eff',
              marginBottom: 20,
            }}
          />
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#fff' }}>
            Patronus Quiz
          </Text>
          <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 10, color: '#f5f5f5' }}>
            This spooky woodland near Hogwarts castle is full of mysteries and magical creatures...{'\n'}
            Step inside (at your peril!) and test how much you remember about it.
          </Text>
          <Text style={{ fontSize: 12, color: '#ccc' }}>2nd Apr 2025 | 10 Questions</Text>

          <Link href="/quiz/patronus_run" asChild>
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
            <Text
              style={{
                marginTop: 15,
                fontSize: 14,
                color: '#add8ff',
                textDecorationLine: 'underline',
              }}
            >
              ← More Quizzes
            </Text>
          </Link>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
