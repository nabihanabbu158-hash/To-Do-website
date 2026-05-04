const input = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("todoList");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    if (todo.completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = todo.text;
    span.onclick = () => toggleComplete(index);

    const delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.className = "delete-btn";
    delBtn.onclick = () => deleteTodo(index);

    li.appendChild(span);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

function addTodo() {
  const text = input.value.trim();
  if (text === "") return;

  todos.push({ text, completed: false });
  input.value = "";
  saveTodos();
  renderTodos();
}

function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

addBtn.addEventListener("click", addTodo);

input.addEventListener("keypress", function(e) {
  if (e.key === "Enter") addTodo();
});

renderTodos();