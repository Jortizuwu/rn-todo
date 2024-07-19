import { ActivityIndicator, StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/shared/components/ParallaxScrollView';
import { ThemedText } from '@/shared/components/ThemedText';
import TodoCard from '@/shared/components/todo/todo-card';
import AddBtn from '@/shared/components/todo/add-btn';
import { ThemedView } from '@/shared/components/ThemedView';
import { useListTodos } from '@/shared/hooks/react-query/useListTodos';

export default function HomeScreen() {
  const { todos, isLoading } = useListTodos();

  if (isLoading)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color='#0000ff' />
      </View>
    );

  return (
    <ThemedView
      style={{
        flex: 1,
        position: 'relative',
      }}>
      {todos.length === 0 ? (
        <ThemedView
          style={{
            flex: 1,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ThemedText type='defaultSemiBold' style={styles.remainingTask}>
            No Task
          </ThemedText>
        </ThemedView>
      ) : (
        <ParallaxScrollView
          headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>
          {todos?.filter((todo) => todo.done)[0] && (
            <TodoCard {...todos?.filter((todo) => todo.done)[0]} />
          )}

          <ThemedText type='defaultSemiBold' style={styles.remainingTask}>
            Reaming Task
            <ThemedText style={styles.remainingTaskCount}>
              ({todos?.filter((todo) => !todo.done).length})
            </ThemedText>
          </ThemedText>

          {todos
            ?.filter((todo) => !todo.done)
            .map((todo, index) => (
              <TodoCard {...todo} key={todo.id} />
            ))}
        </ParallaxScrollView>
      )}
      <AddBtn />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  remainingTask: {
    fontSize: 24,
    fontWeight: '300',
    marginTop: 20,
  },
  remainingTaskCount: {
    fontWeight: 'bold',
    paddingLeft: 4,
    fontSize: 24,
  },
});
