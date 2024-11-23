import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import { TaskCard } from './TaskCard';
import { useState } from 'react';

export default function App() {
  const [taskTitle, setTasktitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [task, setTask] = useState([]);
  const [Alert1, setAlert1] = useState(false);
  const [Alert2, setAlert2] = useState(false);

  const onMessage = () => {
    setAlert1(false);
    setAlert2(false);

    if (taskTitle !== "" && taskDescription.length >= 10) {
      setTask([
        ...task,
        {
          id: task.length + 1,
          title: taskTitle,
          description: taskDescription
        }
      ]);

      setTask("");
      setTaskDescription(""); 
    }else {
      if (!taskTitle.trim()) {
        setAlert1(true)
        setTimeout(() => {
          setAlert1(false)
        }, 4000);
      }
      if (taskDescription.length < 10) {
        setAlert2(true)
        setTimeout(() => {
          setAlert2(false)
        }, 4000);
    }
  }
}
  const deleteTask = (index) =>{
    const updateTasks = [...tasks];
    updateTasks.sPlice(index, 1)
    setTask(updateTasks);
  }

  return (
    <>

      <View style={styles.container}>
        <Text style={styles.label}>App de Tarefas</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome da tarefa:"
        />
         {Alert1 ? <text style={styles.errorText}>Nescessário informar o título</text>
         : <></>}


        <Text>Tarefa Descrição:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder='Descrição da tarefa:'
          multiline
          value={taskDescription}
          onChangeText={setTaskDescription}
        />

        {Alert2 ? <text style={styles.errorText}>Nescessário no mínimo 10 caracteres</text>
         : <></>}

        <View style={styles.buttonContainer}>
          <Button style={styles.buttonElement} color="darkgreen" title='Salvar' onPress={() => onMessage()} />
        </View>

{task.length > 0 ? <view style={styles.separator}/> : <></>}

        <ScrollView>
        {task.map((item, index) => (
          <TaskCard
            title={item.title}
            description={item.description}
            status={"Done"}
            onClick={() => {
              deleteTask(index);
            }}
          />
         ))}
        </ScrollView>
      </View>
 
    </>
  )}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
    backgroundColor: '#f4f4f4',
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#ccc',
    marginVertical: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top'
  },
  buttonContainer: {
    marginTop: 16,
  },
  buttonElement: {
    borderRadius: 12
  },
  separator:{
    marginTop: 16,
    width: "100%",
    height: 1, 
    backgroundColor:"#222"
  },
  errorText:{
    color: "red",
    fontSize: 12,
    fontStyle: "italic"
  }
});