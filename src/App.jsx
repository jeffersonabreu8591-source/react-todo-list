// Importa dois hooks do React:
// useState → para criar e gerenciar estados dentro do componente
// useEffect → para executar efeitos colaterais (como salvar no localStorage)
import { useEffect, useState } from "react"

// Importa o componente NewTodoForm (responsável por criar novas tarefas)
import { NewTodoForm } from "./NewTodoForm"

// Importa o arquivo CSS com os estilos do aplicativo
import "./styles.css"

// Importa o componente TodoList (responsável por exibir a lista de tarefas)
import { TodoList } from "./TodoList"

// Componente principal da aplicação React
export default function App() {
  // useState cria o estado "todos" que guarda todas as tarefas
  // Ele começa lendo os dados salvos no localStorage (se existirem)
  const [todos, setTodos] = useState(() => {
    // Pega o valor salvo no navegador sob a chave "ITEMS"
    const localValue = localStorage.getItem("ITEMS")

    // Se não existir nada salvo, começa com uma lista vazia
    if (localValue == null) return []

    // Se existir, converte o texto JSON de volta para array de objetos
    return JSON.parse(localValue)
  })

  // useEffect é executado toda vez que o estado "todos" muda
  // Ele serve para salvar a lista atualizada no localStorage
  useEffect(() => {
    // Converte a lista (array) em texto JSON e salva no navegador
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])
  // [todos] significa: execute este efeito sempre que "todos" for alterado

  // Função para adicionar uma nova tarefa
  function addTodo(title) {
    // Atualiza o estado anterior (currentTodos)
    setTodos(currentTodos => {
      // Retorna um novo array contendo as tarefas antigas + a nova tarefa
      return [
        ...currentTodos,
        {
          id: crypto.randomUUID(), // cria um ID único automaticamente
          title, // o texto da tarefa
          completed: false, // nova tarefa começa como "não concluída"
        },
      ]
    })
  }

  // Função para alternar o estado "completed" de uma tarefa
  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      // Mapeia todas as tarefas e altera apenas aquela com o ID correspondente
      return currentTodos.map(todo => {
        if (todo.id === id) {
          // Retorna um novo objeto com o campo "completed" atualizado
          return { ...todo, completed }
        }

        // Se o ID não bate, retorna o mesmo objeto sem alterações
        return todo
      })
    })
  }

  // Função para deletar uma tarefa da lista
  function deleteTodo(id) {
    setTodos(currentTodos => {
      // Filtra todas as tarefas e remove a que tem o ID igual ao informado
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  // Parte visual (JSX) — o que aparece na tela
  return (
    <>
      {/* Renderiza o formulário de nova tarefa e envia a função addTodo como propriedade */}
      <NewTodoForm onSubmit={addTodo} />

      {/* Título da página */}
      <h1 className="header">Todo List</h1>

      {/* Renderiza a lista de tarefas e passa as funções que ela precisa */}
      <TodoList
        todos={todos} // envia a lista atual de tarefas
        toggleTodo={toggleTodo} // envia a função para marcar/desmarcar
        deleteTodo={deleteTodo} // envia a função para deletar
      />
    </>
  )
}
