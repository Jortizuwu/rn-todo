import { Entypo } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function AddBtn() {
  const onPress = () => {
    router.navigate('(create)');
  };

  return (
    <TouchableOpacity
      style={styles.btnAdd}
      onPress={onPress}
      activeOpacity={0.5}>
      <Entypo name='plus' size={24} color='#fff' />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnAdd: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#4285F4',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 999,
    bottom: 20,
    right: 20,
  },
});
