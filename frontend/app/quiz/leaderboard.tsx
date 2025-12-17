import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ImageBackground, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import { router } from 'expo-router'; // Import router

interface ScoreEntry {
  name: string;
  score: number;
}

export default function LeaderboardScreen() {
  const [leaderboard, setLeaderboard] = useState<ScoreEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaderboard = async () => {
    try {
      // NOTE: ngrok URLs change frequently for the free tier.
      // Ensure this URL 'https://a335-161-200-191-144.ngrok-free.app/Ldb' is still valid.
      const res = await fetch(' https://c126-27-131-132-4.ngrok-free.app/Ldb');
      const data = await res.json();
      setLeaderboard(data);
    } catch (err) {
      console.error('Failed to fetch leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/6145549/pexels-photo-6145549.jpeg'}}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => router.replace('/')} // Changed to router.replace('/') to go to the main menu (index page)
        style={{
          position: 'absolute',
          top: 40,
          left: 20,
          zIndex: 10,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.4)',
          borderRadius: 15,
          paddingVertical: 8,
          paddingHorizontal: 12,
        }}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
        <Text style={{ color: 'white', marginLeft: 5, fontSize: 16 }}>Main Menu</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 80 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#fff', marginBottom: 20 }}>
          🧙 Hogwarts Leaderboard
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          Array.from({ length: 10 }).map((_, index) => {
            const entry = leaderboard[index];
            return (
              <View
                key={index}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  padding: 16,
                  marginVertical: 6,
                  borderRadius: 12,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>
                  #{index + 1} {entry?.name || '—'}
                </Text>
                <Text style={{ fontSize: 18, color: '#333' }}>{entry?.score ?? '-'}</Text>
              </View>
            );
          })
        )}
      </ScrollView>
    </ImageBackground>
  );
}