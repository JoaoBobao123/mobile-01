import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import { TaskCard } from './TaskCard';
import { useEffect, useState } from 'react'; 
import { getRequest } from './api/Api';

export default function App() {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescripition, setTaskDescripition] = useState("");
  const [task, setTask] = useState([]);
  const [alert1, setAlert1] = useState(false);
  const [alert2, setAlert2] = useState(false);


  const onMessage = () => {
    setAlert1(false);
    setAlert2(false);

    if (taskTitle !== "" && taskDescripition.length >= 10) {
      setTask([
        ...task,
        {
          id: task.length + 1,
          title: taskTitle(""),
          description: taskDescripition("")
        }
      ]

      )



    } else {

      if (taskDescripition.length < 10) {

        setAlert1(true)
        setAlert2(() => {
          setAlert1(false);
        }, 4000);

      }

    }
  }
  const deleteTask = (index) => {
    const updateTask = [...task];
    updateTask.splice(index, 1)
    setTask(updateTask);
  
  };

  useEffect (() => {
    const fetchData = async () => {
      try {
        const resp = await getRequest();
        setTask(resp)
      } catch (ex) {
        console.error(ex)

      }
    } 

    fetchData()
  })
  
  return (
    <View style={styles.container}>

      <Text style={styles.label}>App de Tarefas</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome da tarefa:"
        value={taskTitle}
        onChangeText={setTaskTitle}
      />



      {alert1
        ?
        <text style={styles.errorText}>
          Necessário informar o título
        </text>
        : <></>}



      <Text>Tarefa Descrição:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder='Descrição da tarefa:'
        multiline
        value={taskDescripition}
        onChangeText={setTaskDescripition}
      />

      {alert2
        ?
        <text style={styles.errorText}
        >Necessário mínimo 10 caracteres
        </text>
        : <></>
      }

      <View style={styles.buttonContainer}>
        <Button style={styles.buttonElement}
          color="darkgreen"
          title='Salvar'
          onPress={() =>
            onMessage()} />
      </View>

      {
        task.length > 0 ? <view style={styles.separetor} />
          : <></>
      }

      <ScrollView>
        {
          task.map((item, index) => (
            <TaskCard
              title={item.title}
              descripition={item.descripition}

              status={"Done"}
              onClick={() => {
                deleteTask(index);
              }}
            />
          ))}
      </ScrollView>
    </View>

  );
}



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
  separetor: {
    marginTop: 16,
    width: "100%",
    height: 1,
    backgroundColor: "#222"
  },
  errorText: {
    color: "red",
    fontSize: 12,
    frontStyle: "italic"
  }

});