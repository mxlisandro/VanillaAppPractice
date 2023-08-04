function editItem(index, _id) {
    const editInput = document.querySelectorAll('input[name="editInput"]')[index];
    const liElement = editInput.parentNode.parentNode;
    const newText = editInput.value;
    // You can use 'newText' to update the backend or do any other processing
    fetch('/updateTodo', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ _id: _id, text: newText })
    })
    .then((res) => {
        // Handle the response if needed
        console.log("updated successfully")
        document.querySelector('ul').innerHTML = "";
        reloadData()
    })
    .catch((err) => {
        console.log(err);
    });
}

// Function to handle the "Delete" button click
function deleteItem(index, _id) {
    console.log("this is the ID PASSED IN", _id)
    const liElement = document.querySelectorAll('li')[index];
    // Remove the <li> element from the DOM
    liElement.parentNode.removeChild(liElement);
    fetch(`/deleteTodo`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({_id:_id})
    })
    .then((res) => {
        // Handle the response if needed
        console.log("deleted successfully")
        document.querySelector('ul').innerHTML = "";
        reloadData()
    })
    .catch((err) => {
        console.log(err);
    });
    // You can also perform a fetch to the backend here to delete the item from the server
}

function reloadData(){
    fetch('/getToDo', {
        credentials: "include"
    })
        .then((res)=>{
            return res.json();
        })
        .then((data)=>{
            console.log(data)
            data.forEach((element, index) => {
                const el = `<li>
                            ${element.text}
                            <form onsubmit="return false;">
                                <input type="text" name="editInput" placeholder="Edit text">
                                <button onclick="editItem('${index}', '${element._id}')">Edit</button>
                                <button onclick="deleteItem('${index}', '${element._id}')">Delete</button>
                            </form>
                        </li>`;
                    document.querySelector('ul').insertAdjacentHTML('beforeend', el);
            });
        })
        .catch((err)=>{
            console.log(err);
        })
}
function logout() {
    document.cookie = "ssid=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = '/';
}

