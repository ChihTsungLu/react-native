import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet } from 'react-native';
import { Stack, useRouter, useGlobalSearchParams } from 'expo-router'
// import styles from '../../styles/search'
import { ScreenHeaderBtn } from '../../components';
import { COLORS, icons, SIZES } from '../../constants'
const Profile = () => {
  const [user, setUser] = useState({
    name: 'Anna Smith',
    email: 'anna.smith@example.com',
    interests: 'coding',
  });
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/get-profile');
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleUpdateProfileRequest = async () => {
    try {
      const payload = {
        name: user.name,
        email: user.email,
        interests: user.interests,
      };

      const response = await fetch('http://localhost:3000/update-profile', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const jsonResponse = await response.json();
      setUser(jsonResponse);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: styles.heading },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension='60%'
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension='60%' />
          ),
          headerTitle: "",
        }}
      />
      <Text style={styles.heading}>User profile</Text>
      <Text>Name: <Text style={styles.profileText}>{user.name}</Text></Text>
      <Text>Email: <Text style={styles.profileText}>{user.email}</Text></Text>
      <Text>Interests: <Text style={styles.profileText}>{user.interests}</Text></Text>
      <Button
        title="Edit Profile"
        onPress={() => setIsEditing(true)}
      />

      {isEditing && (
        <View style={styles.container}>
          <Text style={styles.heading}>User profile</Text>
          <Text>Name:</Text>
          <TextInput
            style={styles.input}
            value={user.name}
            onChangeText={(text) => setUser({ ...user, name: text })}
          />
          <Text>Email:</Text>
          <TextInput
            style={styles.input}
            value={user.email}
            onChangeText={(text) => setUser({ ...user, email: text })}
          />
          <Text>Interests:</Text>
          <TextInput
            style={styles.input}
            value={user.interests}
            onChangeText={(text) => setUser({ ...user, interests: text })}
          />
          <Button
            title="Update Profile"
            onPress={handleUpdateProfileRequest}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 40,
    width: '80%',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: "#ccc"
  },
  profileImage: {
    width: 328,
    height: 287,
    marginBottom: 20,
  },
  profileText: {
    fontSize: 15,
    fontWeight: 'normal',
  },
  input: {
    height: 32,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    padding: 8,
  },

});

export default Profile;
