<script context="module">
  export async function load({ fetch }) {
    const res = await fetch('/todos');
    const jsonResult = await res.json();
    return {
      props: {
        todos: jsonResult.todos,
      },
    };
  }
</script>

<script>
  export let todos;
  let text = '';
  async function addTodo() {
    if (text !== '') {
      try {
        const todo = {
          text,
          completed: false,
        };
        await fetch('/todos', {
          method: 'POST',
          body: JSON.stringify(todo),
        });
        text = '';
        fetchTodos();
      } catch (err) {
        alert('there was an error');
        text = '';
      }
    }
  }

  async function completeTodo(todo) {
    try {
      console.log(todo);
      await fetch('/todos', {
        method: 'PUT',
        body: JSON.stringify(todo),
      });
      fetchTodos();
    } catch (err) {
      alert(err);
    }
  }

  async function fetchTodos() {
    const res = await fetch('/todos');
    const jsonResult = await res.json();
    todos = jsonResult.todos;
  }
</script>


<h1 class="text-center p-4 text-xl">My Todos</h1>

<div class="flex justify-center align-middle">
  <input class="input input-primary rounded-r-none input-bordered" type="text" bind:value={text} />
  <button class="btn btn-primary rounded-l-none" on:click={addTodo}>Add Todo</button>
</div>

<div class="mt-6 p-4 flex justify-center bg-gray-100" >
  <ul>
    {#each todos as todo}
    <li class= "flex align-middle mb-2">
      <input
      class="checkbox checkbox-lg"
      type="checkbox"
      bind:checked={todo.completed}
      on:change={() => completeTodo(todo)}
      />
      <span class="text-lg ml-2">
        {todo.text}
      </span>
    </li>
    {/each}
  </ul>
</div>
