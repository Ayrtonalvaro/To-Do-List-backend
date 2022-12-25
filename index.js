
const express = require('express')
const cors = require('cors')
const app = express()
const logger = require('./loggerMiddlewar.js')

app.use(cors())
app.use(express.json())

app.use(logger)
let tasks = [
  {
    id: 1,
    nameTask: 'Ir al supermercado',
    descriptionTask: 'Compras comida para la noche'
  },
  {
    id: 2,
    nameTask: 'Ensayo sabado',
    descriptionTask: 'Armar listas de canciones para el show'
  },
  {
    id: 3,
    nameTask: 'Repasar nodejs',
    descriptionTask: 'Armar api de tareas'
  }
]

// const app = http.createServer((req, res) => {
//  res.writeHead(200, { 'Content-Type': 'application/json' });
//  res.end(JSON.stringify(tasks));
// });

app.get('/', (req, res) => {
  res.send('<h1>Bienvenidos a la api de tareas</h1>')
})

app.get('/api/tasks', (req, res) => {
  res.json(tasks)
})

app.get('/api/task/:id', (req, res) => {
  const id = Number(req.params.id)
  const task = tasks.find(task => task.id === id)

  if (task) {
    res.json(task)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id)
  tasks = tasks.filter(task => task.id !== id)
})

app.post('/api/tasks', (req, res) => {
  const task = req.body

  if (!task || !task.nameTask) {
    return res.status(400)
  }

  const ids = tasks.map(task => task.id)
  const maxId = Math.max(...ids)

  const newTask = {
    id: maxId + 1,
    nameTask: task.nameTask,
    descriptionTask: task.descriptionTask
  }

  tasks = [...tasks, newTask]
  res.json(newTask)
})

app.use((req, res) => {
  res.status(404).json(
    { error: 'not found' }
  )
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})
