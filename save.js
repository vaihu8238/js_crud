// save Data 

// let lastid=0;

const form = document.getElementById("form");
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.name.value;
    const age = form.age.value;
    const address = form.address.value;
    const phone = form.phone.value;

    let lastid = localStorage.getItem("lastid");
    let dataId = document.getElementById("id").value;

    if (!dataId) {
        // console.log(name,age,address,phone);
        ++lastid;
        const submitData = {
            id: lastid,
            name: name,
            age: age,
            address: address,
            phone: phone,
        };

        // console.log(submitData);

        const data = JSON.stringify(submitData);
        // console.log(data);
        localStorage.setItem("lastid", lastid);
        localStorage.setItem("user" + lastid, data);
    }
    else {

        const submitData = {
            id: dataId,
            name: name,
            age: age,
            address: address,
            phone: phone,
        }

        const data = JSON.stringify(submitData);
        localStorage.setItem("user" + dataId, data);

    }
    location.reload();
});



// fetch data in table 

let lastData = localStorage.getItem("lastid");

let j = 0;
for (i = 1; i <= lastData; i++) {

    let userData = JSON.parse(localStorage.getItem("user" + i));

    if (userData === null) {
        continue;
    } else {

        document.getElementById("table").innerHTML += `<tr>
        <td>${j + 1}</td>
        <td>${userData.name}</td>
        <td>${userData.age}</td>
        <td>${userData.address}</td>
        <td>${userData.phone}</td>

        <td><button class="btn btn-primary edit-btn user${userData.id}"><i class="fa fa-edit"></i></button></td>
        <td><button class="btn btn-danger delete-btn user${userData.id}"><i class="fa fa-trash"></i></button></td>
</tr>`
    }
    j++;

}



// delete data from table 
const deleteData = document.querySelectorAll(".delete-btn");
deleteData.forEach(button => {
    button.addEventListener("click", function () {

        let dataKey = (button.classList.length) - 1;

        let deletDataKey = (button.classList[dataKey]);
        console.log(button.classList[dataKey]);
        // console.log(dataKey);
        // console.log(deleteData);

        localStorage.removeItem(deletDataKey);
        location.reload();
    });
});


// fetch edit data from table 

let editButton = document.querySelectorAll(".edit-btn");

editButton.forEach(button => {
    button.addEventListener("click", function () {
        let Datakey = (button.classList.length) - 1;

        let editDataKey = button.classList[Datakey];

        let upd = localStorage.getItem(editDataKey);
        // console.log(upd);

        let userData = JSON.parse(localStorage.getItem(editDataKey));

        document.getElementById("id").value = userData.id;
        document.getElementById("name").value = userData.name;
        document.getElementById("age").value = userData.age;
        document.getElementById("address").value = userData.address;
        document.getElementById("phone").value = userData.phone;

    })
})