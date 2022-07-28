import React, { useEffect, useRef, useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Task } from './TasksList';
import trashIcon from '../assets/icons/trash/trash.png'
import Icon from 'react-native-vector-icons/FontAwesome';

interface TaskItemProps {
  task: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, editedValue:string) => void;
}
export function TaskItem({task, index, toggleTaskDone, removeTask, editTask}:TaskItemProps){
  const [isEditing, setIsEditing] = useState(false)
  const [editedValue, setEditedValue] = useState(task.title)
  const textInputRef = useRef<TextInput>(null)

  function handleStartEditing(){
    setIsEditing(true)
  }

  function handleCancelEditing(){
    setEditedValue(task.title)
    setIsEditing(false)
  }

  function handleSubmitEditing(){
    editTask(task.id, editedValue)
    setIsEditing(false)
  }



  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();

      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing])
  Icon.loadFont();
  return(
    <View style={{flexDirection:'row', alignItems:'center'}}>
    <View style={{flex:2}}>
              <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={() => toggleTaskDone(task.id)}
                //TODO - use onPress (toggle task) prop
              >
                <View 
                  testID={`marker-${index}`}
                  style={task.done ? styles.taskMarkerDone : styles.taskMarker}
                >
                  { task.done && (
                    <Icon 
                      name="check"
                      size={12}
                      color="#FFF"
                    />
                  )}
                </View>

                <TextInput 
                  ref={textInputRef}
                  style={ task.done ? styles.taskTextDone : styles.taskText}
                  value={editedValue}
                  editable={isEditing}
                  onChangeText={setEditedValue}
                  onSubmitEditing={handleSubmitEditing}/>
              </TouchableOpacity>
            </View>
                    
            <View style={{flexDirection:'row', flex:1, justifyContent:'flex-end', alignItems:'center'}}> 
              { isEditing && (
                <TouchableOpacity
                  onPress={handleCancelEditing}
                >

                      <Icon 
                        name="close"
                        size={24}
                        color="#FFF"
                      />
                  </TouchableOpacity>
              )}

              { !isEditing && (
                
                <TouchableOpacity
                  onPress={handleStartEditing}
                >
                      <Icon 
                        name="edit"
                        size={24}
                        color="#AAA"
                      />
                  </TouchableOpacity>
             
              )}
              
              <View style={{width:1, height:24, backgroundColor:'rgba(255, 0, 0, 0.24)', paddingHorizontal: 1, marginLeft: 5}}><View/>
              </View>
              <View>
                <TouchableOpacity
                  testID={`trash-${index}`}
                  style={{ paddingHorizontal: 2 }}
                  onPress={() => removeTask(task.id)}
                  disabled={!isEditing}
                  //TODO - use onPress (remove task) prop
                >
                  <Image source={trashIcon} />
                </TouchableOpacity>
              <View/>
              
            </View>  
        </View> 
    </View>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  }
})
