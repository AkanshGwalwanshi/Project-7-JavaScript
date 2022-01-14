const add = document.getElementById("add");

const updateLocalStorageData = () => {
    const textAreaData = document.querySelectorAll("textarea");
    const notes = [];
    console.log(textAreaData);
    textAreaData.forEach((currVal) => {
        return notes.push(currVal.value);
    });
    console.log(notes);

    localStorage.setItem('notes', JSON.stringify(notes));
};

const addNewNote = (text = "") => {
    const note = document.createElement("div");
    note.classList.add("note");

    const htmlData = `<div class="operation">
            <button class="edit"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>
            </button>
            <button class="delete"><i class="fa fa-trash-o" aria-hidden="true"></i>
            </button>
        </div>

        <div class="main ${text ? "" : "hidden"}" ></div>
        <textarea class="${text ? "hidden" : ""}" rows="8" cols="40"></textarea>
        `;

    note.insertAdjacentHTML('afterbegin', htmlData);

    // getting references
    const editBtn = note.querySelector(".edit");
    const delBtn = note.querySelector(".delete");
    const mainDiv = note.querySelector(".main");
    const textArea = note.querySelector("textarea");

    // deleting the note
    delBtn.addEventListener('click', () => {
        note.remove();
        updateLocalStorageData();
    });

    // toggle using edit button

    textArea.value = text;
    mainDiv.innerHTML = text;

    editBtn.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    });

    textArea.addEventListener('change', (event) => {
        const userData = event.target.value;
        mainDiv.innerHTML = userData;

        updateLocalStorageData();
    });

    document.body.appendChild(note);


};

// getting data from localStorage

const notes = JSON.parse(localStorage.getItem('notes'));

if (notes) {
    notes.forEach((currVal) => addNewNote(currVal));
}

add.addEventListener('click', () => addNewNote());


// localStorage and sessionStorage properties allow you to save key:value pair
// in a web browser. The localStorage object stores data with no expiration date.
// The data will not be deleted when you close the browser, and will be available
// for ever