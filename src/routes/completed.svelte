<script context="module">
  export async function load({ fetch }) {
    const res = await fetch('/todos?completed=true');
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
  console.log(todos);
</script>

<h1 class="text-center p-4 text-xl">Completed Todos</h1>

<div class="mt-6 p-4 flex justify-center bg-gray-100" >
    <ul>
      {#each todos as todo}
      <li class= "flex align-middle mb-2">
        <input
        class="checkbox checkbox-lg"
        type="checkbox"
        bind:checked={todo.completed}
        disabled
        />
        <span class="text-lg ml-2">
          {todo.text}
        </span>
      </li>
      {/each}
    </ul>
  </div>
