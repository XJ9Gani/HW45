const output = document.querySelector(".output");
const getPostBtn = document.getElementById("getPost");
const deletePostBtn = document.getElementById("deletePost");
const loader = document.querySelector(".loader");
const url = "https://jsonplaceholder.typicode.com/posts";
function stylingRender(title, description, id) {
  let block = document.createElement("div");
  let block__title = document.createElement("h2");
  let block__description = document.createElement("h2");
  let block__id = document.createElement("h2");
  let removeBtn = document.createElement("button");
  let updateBtn = document.createElement("button");

  let upside = document.createElement("div");

  upside.classList.add("block__upside");
  block__title.classList.add("block__upside--title");
  block__id.classList.add("block__upside--id");
  removeBtn.classList.add("block__upside--remove");
  updateBtn.classList.add("block__upside--update");

  block__description.classList.add("block--description");
  //   removeBtn.textContent = "X";
  //   updateBtn.textContent = "E";
  block__title.textContent = title;
  block__id.textContent = id;
  block__description.textContent = description;

  upside.append(block__id, block__title, updateBtn, removeBtn);
  block.classList.add("block");
  block.append(upside, block__description);
  output.append(block);
}

function showRes(data) {
  data.forEach((element) => {
    stylingRender(element.title, element.body, element.id, element.userId);
  });
}

async function getPosts() {
  try {
    loader.hidden = false;
    let response = await fetch(url);
    let data = await response.json();
    showRes(data);
  } catch (e) {
    console.log(e);
    alert("Some Error");
  } finally {
    loader.hidden = true;
  }
}

function errorHandler() {
  try {
    loader.hidden = false;
    output.innerHTML = " ";
    return getPosts();
  } catch (e) {
    alert(e);
  }
}

class ValueIsNotDefined extends Error {
  constructor(message) {
    super(message);
    this.name = "Id не найдено";
  }
}

getPostBtn.addEventListener("click", errorHandler);

deletePostBtn.addEventListener("click", deletePost);

async function deletePost() {
  try {
    loader.hidden = false;
    output.innerHTML = "";
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1",
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      output.textContent = "Пост успешно удален";
    } else {
      output.textContent = "Не удалось удалить пост";
    }
  } catch (error) {
    output.textContent = "Ошибка: " + error.message;
  } finally {
    loader.hidden = true;
  }
}
