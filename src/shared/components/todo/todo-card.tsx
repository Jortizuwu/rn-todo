import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { ThemedView } from '../ThemedView';
import { Entypo } from '@expo/vector-icons';
import { ThemedText } from '../ThemedText';
import { formatDistanceToNow } from 'date-fns';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoService } from '@/shared/services/todo';
import { Link } from 'expo-router';

interface ItodoCardProps {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  done: boolean;
}

export default function TodoCard({ ...props }: ItodoCardProps) {
  const colorScheme = useColorScheme();
  const queryClient = useQueryClient();

  const { title, description, done, createdAt, id } = props;

  const { mutate } = useMutation({
    mutationFn: () => todoService.toDone(id, !done),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  return (
    <Link
      href={{ pathname: '/(create)/[id]', params: { id } }}
      style={{
        width: '100%',
      }}>
      <ThemedView
        style={{
          ...styles.todoCard,
          backgroundColor:
            colorScheme === 'dark'
              ? 'rgba(52, 52, 52, 0.8)'
              : 'rgba(250, 250, 250, 1)',
        }}>
        <View
          style={{
            width: '10%',
          }}>
          <TouchableOpacity
            onPress={() => mutate()}
            style={{
              ...styles.btnCheck,
              backgroundColor: done ? 'green' : 'gray',
            }}>
            <Entypo name='check' size={16} color={done ? 'green' : '#fff'} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '70%',
          }}>
          <ThemedText
            type='subtitle'
            style={{
              marginBottom: 4,
            }}>
            {title}
          </ThemedText>
          <ThemedText>{description}</ThemedText>
        </View>
        <View style={styles.dateBox}>
          <ThemedText type='default' style={{ fontSize: 13, width: '100%' }}>
            {formatDistanceToNow(createdAt, {
              addSuffix: true,
            })}
          </ThemedText>
        </View>
      </ThemedView>
    </Link>
  );
}

const styles = StyleSheet.create({
  todoCard: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    padding: 20,
    color: '#000',
    width: '100%',
  },
  btnCheck: {
    borderRadius: 100,
    padding: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
    width: 24,
  },
  dateBox: {
    width: '12%',
    flex: 1,
    alignItems: 'flex-end',
  },
});
