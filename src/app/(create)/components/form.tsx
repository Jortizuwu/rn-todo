import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import useDefaultValues, { FormValues, schema } from './utils/form-utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { ThemedText } from '@/shared/components/ThemedText';
import { ThemedView } from '@/shared/components/ThemedView';
import { useEffect } from 'react';
import { useNavigation } from 'expo-router';

const ErrorInputComponent = ({ message }: { message: string | undefined }) => {
  return (
    <ThemedText
      type='default'
      style={{
        color: '#F00',
        fontSize: 12,
        marginHorizontal: 12,
      }}>
      {message ?? ''}
    </ThemedText>
  );
};

export default function Form() {
  const colorScheme = useColorScheme();
  const { defualtValues, onSubmit, isLoading, title } = useDefaultValues();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { ...defualtValues },
    mode: 'all',
  });

  const colors = {
    backgroundColor:
      colorScheme === 'dark'
        ? 'rgba(52, 52, 52, 0.8)'
        : 'rgba(250, 250, 250, 1)',
    color:
      colorScheme === 'dark'
        ? 'rgba(250, 250, 250, 1)'
        : 'rgba(52, 52, 52, 0.8)',
    borderColor:
      colorScheme === 'dark'
        ? 'rgba(250, 250, 250, 0.1)'
        : 'rgba(52, 52, 52, 0.1)',
  };

  useEffect(() => {
    navigation.setOptions({ title });
  }, [navigation]);

  useEffect(() => {
    reset(defualtValues);
  }, [reset, defualtValues]);

  if (isLoading)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color='#0000ff' />
      </View>
    );

  return (
    <ThemedView>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{
              ...styles.input,
              ...colors,
            }}
            placeholder='Title'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name='title'
      />

      {errors.title && <ErrorInputComponent message={errors.title.message} />}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{ ...styles.input, ...colors }}
            placeholder='Description'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name='description'
      />

      {errors.description && (
        <ErrorInputComponent message={errors.description.message} />
      )}

      <TouchableOpacity
        activeOpacity={0.5}
        style={{
          backgroundColor: '#4285F4',
          borderRadius: 10,
          padding: 10,
          margin: 12,
          alignItems: 'center',
        }}
        onPress={handleSubmit(onSubmit)}>
        <ThemedText
          type='default'
          style={{
            color: '#fff',
          }}>
          Submit
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});
