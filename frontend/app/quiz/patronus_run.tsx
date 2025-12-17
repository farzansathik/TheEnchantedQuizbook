import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  ImageBackground,
  ScrollView,
  Pressable,
  Modal,
} from 'react-native';

interface Option {
  text: string;
  scores: string[];  // assuming backend expects list of strings per option
}

interface Question {
  id: number;
  question: string;
  options: Option[];
}

const BACKEND_URL = ' https://c126-27-131-132-4.ngrok-free.app'; // <-- CHANGE THIS to your PC IP

export default function PatronusQuiz() {
  const [quizDataList, setQuizDataList] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [selectedScores, setSelectedScores] = useState<number[]>([]);
  const [quizTitle, setQuizTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showSubmit, setShowSubmit] = useState(false);
  const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    borderRadius: '10px',
    background: 'white',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
};
  // const [result, setResult] = useState<{ patronus: string; desccription: string } | null>(null);
  const [result, setResult] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/Pn`);
      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        const quiz = data[0];
        setQuizDataList(quiz.questions);
        setQuizTitle(quiz.title);
        setDescription(quiz.description);
        setCurrentIndex(0);
        setSelectedScores([]);
        setShowSubmit(false);
      } else {
        console.error('Unexpected quiz format:', data);
        Alert.alert('Error', 'Quiz data format is invalid.');
      }
    } catch (error) {
      console.error('Failed to fetch quiz:', error);
      Alert.alert('Error', 'Failed to load quiz from server.');
    }
  };

  const handleChoiceSelect = (option: Option, optionIndex: number) => {
  if (selectedChoice) return; // prevent multiple taps

  setSelectedChoice(option.text);

  setTimeout(() => {
    const updatedScores = [...selectedScores, optionIndex];  // <<< เก็บ index
    setSelectedScores(updatedScores);
    setSelectedChoice(null);

    if (currentIndex < quizDataList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowSubmit(true);
    }
  }, 400);
};

  const handleSubmit = async () => {
    try {
      const res = await fetch(` https://c126-27-131-132-4.ngrok-free.app/patronus`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "answers": selectedScores }),
      });

      if (!res.ok) {
        throw new Error(`Server error ${res.status}`);
      }

      const result = await res.json();
      setResult(result);           // ตั้งผลลัพธ์
      setModalVisible(true);
    } catch (error) {
      console.error('Failed to submit scores:', error);
      Alert.alert('Error', 'Failed to submit scores to server.');
    }
  };

  if (quizDataList.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Loading quiz...</Text>
      </View>
    );
  }

  const currentQuestion = quizDataList[currentIndex];

  return (
    <ImageBackground
            source={{
             uri: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/53e31c2b-ab26-4cac-b4f2-46a9b3e3e9bb/diu5gvr-1c9dc0ad-cf31-4ea8-ab22-a118134142bb.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzUzZTMxYzJiLWFiMjYtNGNhYy1iNGYyLTQ2YTliM2UzZTliYlwvZGl1NWd2ci0xYzlkYzBhZC1jZjMxLTRlYTgtYWIyMi1hMTE4MTM0MTQyYmIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.-Eya2A4ESe-1NXhxUeUmir0HiCENRmVPRLLU2RRJcwE'
            }}
            resizeMode="cover"
            style={{ flex: 1 }}
    >
        <Pressable
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
        </Pressable>
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
      <View style={{
              width: '100%',
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 15,

              }}>
        <Text style={styles.quizTitle}>{quizTitle}</Text>
        <Text style={styles.quizDesc}>{description}</Text>

        {!showSubmit ? (
          <>
            <Text style={styles.question}>
              Q{currentIndex + 1}: {currentQuestion.question}
            </Text>

            {currentQuestion.options.map((item, index) => (
            <TouchableOpacity
              key={item.text}
              style={[
                styles.choice,
                selectedChoice === item.text && styles.selectedChoice,
              ]}
              onPress={() => handleChoiceSelect(item, index)}
              activeOpacity={0.7}
            >
              <Text style={styles.choiceText}>{item.text}</Text>
            </TouchableOpacity>
          ))}

            <Text style={styles.progress}>
              {currentIndex + 1} / {quizDataList.length}
            </Text>
          </>
        ) : (
          <View>
            <Text style={styles.question}>All questions answered!</Text>
            <Pressable style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Show result</Text>
            </Pressable>
            {result && (
    <Modal
      // animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)

      }
    >
    <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.8)',
              justifyContent: 'center',
              alignItems: 'center',
              }}
          >
      <View style={{
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
          Your Patronus
        </Text>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>{result.patronus}</Text>
        <Text style={{ fontSize: 16 }}>{result.desccription}</Text>

        <Pressable
          style={[styles.button, { marginTop: 20 }]}
          onPress={() => {
            setResult(null); // reset ผลลัพธ์
            router.back();   // กลับไปหน้าก่อนหน้า
          }}
        >
          <Text style={styles.buttonText}>Back</Text>
        </Pressable>
      </View>
    </View>
    </Modal>
    )}
          </View>
        )}
      </View>
    )}
          </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    flex: 1,
    backgroundColor: '#f7f4ff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quizTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  quizDesc: {
    fontSize: 16,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  choice: {
    backgroundColor: '#ddd',
    padding: 15,
    marginVertical: 6,
    borderRadius: 10,
  },
  selectedChoice: {
    backgroundColor: '#447592',
  },
  choiceText: {
    fontSize: 16,
    color: '#000',
  },
  progress: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  button: {
    marginTop: 30,
    padding: 12,
    backgroundColor: '#6c5ce7',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});