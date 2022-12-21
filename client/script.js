todoForm.title.addEventListener("keyup", (e) => validateField(e.target));
todoForm.title.addEventListener("blur", (e) => validateField(e.target));
todoForm.description.addEventListener("input", (e) => validateField(e.target));
todoForm.description.addEventListener("blur", (e) => validateField(e.target));
todoForm.dueDate.addEventListener("input", (e) => validateField(e.target));
todoForm.dueDate.addEventListener("blur", (e) => validateField(e.target));
todoForm.addEventListener("submit", onSubmit);
const todoListElement = document.getElementById("todoList");
let titleValid = true;
let descriptionValid = true;
let dueDateValid = true;
const api = new Api("http://localhost:5678/tasks");

function validateField(field) {
  const { name, value } = field;
  let = validationMessage = "";
  switch (name) {
    case "title": {
      if (value.length < 2) {
        titleValid = false;
        validationMessage = "The field 'Titel' need atleast 2 characters.";
      } else if (value.length > 100) {
        titleValid = false;
        validationMessage =
          "The field 'Titel' can only contain of maximum 100 characters.";
      } else {
        titleValid = true;
      }
      break;
    }
    case "description": {
      if (value.length > 500) {
        descriptionValid = false;
        validationMessage =
          "The field 'Description' can only contain a maximum of 500 characters.";
      } else {
        descriptionValid = true;
      }
      break;
    }
    case "dueDate": {
      if (value.length === 0) {
        dueDateValid = false;
        validationMessage = "The field 'Due date' needs a valid due date.";
      } else {
        dueDateValid = true;
      }
      break;
    }
  }
  field.previousElementSibling.innerText = validationMessage;
  field.previousElementSibling.classList.remove("hidden");
}

function onSubmit(e) {
  e.preventDefault();
  if (titleValid && descriptionValid && dueDateValid) {
    console.log("Submit");
    saveTask();
  }
}

function saveTask() {
  const task = {
    title: todoForm.title.value,
    description: todoForm.description.value,
    dueDate: todoForm.dueDate.value,
    completed: false,
  };
  api.create(task).then((task) => {
    if (task) {
      renderList();
    }
  });
}

renderList = async () => {
  console.log("rendering");
  try {
    const tasks = await api.getAll();
    todoListElement.innerHTML = "";
    if (tasks && tasks.length > 0) {
      tasks.sort((a, b) => {
        if (a.completed && !b.completed) {
          return 1;
        }
        if (!a.completed && b.completed) {
          return -1;
        }
        if (a.dueDate < b.dueDate) {
          return -1;
        }
        if (a.dueDate > b.dueDate) {
          return 1;
        }
        return 0;
      });
      tasks.forEach((task) => {
        todoListElement.insertAdjacentHTML("beforeend", renderTask(task));
      });
    }
  } catch (err) {
    return err;
  }
};

function renderTask({ id, title, description, dueDate, completed }) {
  let html = `
    <li class="select-none mt-2 p-3 ${
      completed ? "bg-green-500" : "bg-red-500"
    } border-[0.25rem] border-black hover:bg-blue-500">
      <div class="flex items-center">
        <div id="inputContainer${id}">
          <input type="checkbox" ${
            completed ? "checked" : ""
          } onclick="updateTask(${id}) "id="checkBox${id}" class="appearance-none border-[0.25rem] border-black bg-red-500 checked:bg-green-500 hover:bg-yellow-500"/>
          <style>
            input[type="checkbox"]:checked:before{
              content: "✔";
              font-size: 12px;
            }
            input[type="checkbox"]:before{
              content: "✖";
              font-size: 12px;
            }
          </style>
        </div> 
        <h3 class="pl-4 mb-3 flex-1 text-xl font-bold text-black">${title}</h3>
        <div>
          <span><b>Deadline: ${dueDate}</b></span>
          <button onclick="deleteTask(${id})" class="inline-block bg-gray-300 text-md text-slate-900 border-[0.25rem] border-black px-3 py-1 ml-2 hover:bg-white">Ta bort</button>
        </div>
      </div>`;
  description &&
    (html += `
      <p class="ml-8 mt-2 text-md italic">${description}</p>
  `);
  html += `
    </li>`;
  return html;
}

deleteTask = async (id) => {
  try {
    await api.remove(id);
    renderList();
  } catch (err) {
    return err;
  }
};

updateTask = async (id) => {
  const checkBox = document.getElementById(`checkBox${id}`);
  let data;
  if (checkBox.checked) {
    data = {
      completed: true,
    };
  } else {
    data = {
      completed: false,
    };
  }
  try {
    await api.update(id, data);
    renderList();
  } catch (err) {
    return err;
  }
};

renderList();
