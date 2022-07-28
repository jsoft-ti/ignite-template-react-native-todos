import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    const existedTask = tasks.find(item => item.title == newTaskTitle)
    if(existedTask){
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome',[{
        text: 'OK',
        onPress: () => console.log('Ok pressionado')
      }])
    }else{
      var newTask: Task = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      }
      setTasks([...tasks, newTask])
  }
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    var updatedTasks = tasks.map(task => ({ ...task }))
    const foundItem = updatedTasks.find(item => item.id === id)
    if(!foundItem)
      return;
    

    foundItem.done = !foundItem.done

    //const index = updatedTasks.findIndex((t: Task) => t.id === id);
    //updatedTasks[index].done = !updatedTasks[index].done
    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?',[
      {
        text: 'Não',
        onPress: () => console.log('Pressionei o Não')
      },
      {
        text: 'Sim',
        onPress: () => {
          setTasks(oldTask => oldTask.filter(
            tasks => tasks.id != id
          ))
        }
      }
    ])
  }

  function handleEditTask(taskId: number, taskNewTitle:string){
    var updatedTask = tasks.map(task => ({...task}))
    const taskToEdit = updatedTask.find(item => item.id === taskId)
    if(taskToEdit){
      taskToEdit.title = taskNewTitle
    }
    setTasks(updatedTask)
  }
  

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})