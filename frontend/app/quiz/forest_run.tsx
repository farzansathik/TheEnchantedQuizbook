import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// REMOVE these imports if you are only using `router` for navigation
// import { useNavigation, NavigationProp } from '@react-navigation/native';

// *** Import `router` from `expo-router` ***
import { router } from 'expo-router';

// REMOVE or simplify your RootStackParamList if you're not using useNavigation with it
// type RootStackParamList = {
//   QuizScreen: undefined;
//   LeaderboardScreen: undefined;
// };

interface QuizData {
  question: string;
  choice: string[];
  answer: string;
}

export default function QuizScreen() {
  // *** REMOVE this line that is causing the error ***
  // const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [quizDataList, setQuizDataList] = useState<QuizData[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [username, setUsername] = useState('');

  const fetchQuiz = async () => {
    try {
      // NOTE: ngrok URLs change frequently for the free tier.
      // Ensure this URL 'https://8dfd-161-200-191-144.ngrok-free.app/Kl' is still valid.
      const res = await fetch(
        ' https://c126-27-131-132-4.ngrok-free.app/Kl'
      );
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setQuizDataList(data);
        setCurrentIndex(0);
        setSelectedChoice(null);
        setScore(0); // reset score on quiz reload
      } else {
        console.error('Invalid quiz data format:', data);
      }
    } catch (err) {
      console.error('Error fetching quiz:', err);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  const handleChoice = (choice: string) => {
    if (selectedChoice) return;
    setSelectedChoice(choice);

    // Score tracking
    if (choice === quizDataList[currentIndex].answer) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      const isLast = currentIndex + 1 >= quizDataList.length;
      if (isLast) {
        setShowUsernameModal(true);
      } else {
        setCurrentIndex((prev) => prev + 1);
        setSelectedChoice(null);
      }
    }, 1500);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        name: username,
        score: score,
      };

      // NOTE: ngrok URLs change frequently for the free tier.
      // Ensure this URL 'https://8dfd-161-200-191-144.ngrok-free.app/Ldb' is still valid.
      await fetch('http://192.168.56.1:5000/Ldb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      Alert.alert(
        'Thank you!',
        `Score submitted for ${username} (${score}/15)`,
        [
          {
            text: 'OKAY',
            onPress: () => {
              setShowUsernameModal(false);
              // *** Use router.navigate with the file-based route name ***
              router.navigate('/quiz/leaderboard');
            },
          },
        ],
      );

    } catch (err) {
      Alert.alert('Error', 'Failed to submit score.');
      console.error('Submission error:', err);
    }
  };

  const quizData = quizDataList[currentIndex];

  return (
    <ImageBackground
      source={{
        uri:
          'https://wallpapercat.com/w/full/e/f/4/2164305-2560x1440-desktop-hd-hogwarts-castle-background-image.jpg',
      }}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      {/* Back Button - Use router.back() for consistency with Expo Router */}
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
        <Text style={{ color: 'white', marginLeft: 5 }}>Back</Text>
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}
      >
        {quizDataList.length === 0 ? (
          <Text style={{ color: 'white', fontSize: 18 }}>
            Loading question...
          </Text>
        ) : (
          <View
            style={{
              width: '100%',
              backgroundColor: 'rgba(0,0,0,0.6)',
              padding: 20,
              borderRadius: 15,
              }}
          >
            <Text
              style={{ fontSize: 22, color: 'white', marginBottom: 15 }}
            >{`Q${currentIndex + 1}: ${quizData.question}`}</Text>

            {quizData.choice.map((choice, index) => {
              const isCorrect =
                selectedChoice === quizData.answer && choice === quizData.answer;
              const isWrong =
                selectedChoice === choice && choice !== quizData.answer;

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleChoice(choice)}
                  disabled={!!selectedChoice}
                  style={{
                    backgroundColor: isCorrect
                      ? 'green'
                      : isWrong
                      ? 'red'
                      : '#fff',
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 10,
                    }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: isCorrect || isWrong ? '#fff' : '#000',
                      }}
                  >
                    {choice}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>

      {/* Username Modal */}
      <Modal transparent={true} visible={showUsernameModal} animationType="slide">
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.8)',
          justifyContent: 'center',
          alignItems: 'center',
          }}
      >
        <View
          style={{
            width: '80%',
            backgroundColor: '#fff',
            padding: 20,
            borderRadius: 15,
            }}
        >
          <Text style={{ fontSize: 18, marginBottom: 10 }}>
            Quiz Complete! Your score: {score}/15
          </Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Enter username"
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              padding: 10,
              borderRadius: 8,
              marginBottom: 15,
              }}
          />
          <TouchableOpacity
          onPress={handleSubmit} // ✅ CALLS your function that submits and navigates
          style={{ backgroundColor: '#4caf50', padding: 12, borderRadius: 10 }}
          >
          <Text
            style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}
          >
            Submit
          </Text>
            </TouchableOpacity>

        </View>
      </View>
    </Modal>
    </ImageBackground>
  );
}