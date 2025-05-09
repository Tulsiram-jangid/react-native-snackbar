# @tulsiramjangid/react-native-snackbar

A lightweight, animated snackbar component for React Native using the Context API and React Native's Animated API.

## 🎥 Demo

<p align="center">
  <img src="https://github.com/Tulsiram-jangid/react-native-snackbar/blob/main/docs/snackbar.gif" height="400" width="200" alt="Snackbar Demo" />
</p>

## ✨ Features

- Global access to snackbar using `useSnackbar()` hook
- Smooth slide-up animation
- Auto-dismiss with timeout
- Minimal setup using context provider



## 📦 Installation

Using **npm**:

```bash
npm install @tulsiramjangid/react-native-snackbar

Using **yarn**:

```bash
yarn add @tulsiramjangid/react-native-snackbar


## How to use this

import React from 'react';
import { View, Text, Button } from 'react-native';
import { SnackbarProvider, useSnackbar } from '@tulsiramjangid/react-native-snackbar';

const App = () => {
  return (
    <SnackbarProvider>
      <MainScreen />
    </SnackbarProvider>
  );
};

const MainScreen = () => {
  const { showSnackbar } = useSnackbar();

  return (
    <View>
      <Text>Welcome to the Snackbar Demo!</Text>
      <Button title="Show Snackbar" onPress={() => showSnackbar('This is a snackbar message!')} />
    </View>
  );
};

export default App;



