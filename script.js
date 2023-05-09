const apiURL = `https://645684eb2e41ccf1691f5270.mockapi.io/api/v1/user`;

const form = document.querySelector('.reg-form');
const cardsSection = document.querySelector('.cards-section');
const getName = document.querySelector('.name');
const getEmail = document.querySelector('.email');
const getAvatar = document.querySelector('.avatar');
const submitBtn = document.querySelector('.submit');

const alertBox = document.querySelector('.alertbox');
const errorMsg = document.querySelector('.error');


const editBtn = document.querySelector('.edit');
const updateBtn = document.querySelector('.update');

// const updateForm = document.querySelector('.update-form');

// const updateUserName = document.querySelector('.uname');
// const updateUserEmail = document.querySelector('.uemail');
// const updateUserAvatar = document.querySelector('.uavatar');


const createNode = (node) => {
  return document.createElement(node);
};

const appendChildToParent = (parent, childEl) => {
  return parent.appendChild(childEl);
};

const getData = async () => {
  let users;
  try {
    const getResponse = await fetch(apiURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    users = await getResponse.json();
    // console.log(data);
    return users;

  } catch (err) {
    alertBox.classList.replace("hiding", "show");
    errorMsg.innerHTML = `Something went worng with this link`;
    console.error(err.message);
  }

};

// getData();

const displayData = async () => {
  const users = await getData();
  // console.log(users);

  // Initial stage of this section
  cardsSection.innerHTML = "";

  try {
    users.forEach((user, index) => {
      // console.log(user);
      const { id, name, email, avatar } = user;

      cardsSection.innerHTML += `
    <div class="card bg-success bg-gradient bg-opacity-50 shadow" style="width: 15rem">
      <div class="d-flex justify-content-center p-3">
        <img
          src=${avatar}
          class="card-img-top w-100 border border-2 border-success rounded-circle shadow"
          alt=${name} />
      </div>
      <p class="position-static top-0 text-light text-bg-success w-25 text-center rounded-pill shadow">${index + 1}</p>
      <div class="card-body text-dark bg-light d-flex flex-column justify-content-between">
        <h5 class="card-title text-center">${name}</h5>
        <p class="card-text text-center">${email}</p>
        <div class="d-flex justify-content-around">
          <button
          type="button"
          class="btn btn-outline-info bg-gradient text-dark"
          data-bs-toggle="modal"
          data-bs-target="#updateuser"
          onClick=editUser(${id})>
          Edit
          <i class="bi bi-pencil-square"></i>
          </button>
          <button
            type="button"
            class="btn btn-outline-danger bg-gradient text-dark"
            onClick=deleteUser(${id})>
            Delete
            <i class="bi bi-exclamation-triangle"></i>
          </button>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="updateuser"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="updateuserLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="updateuserLabel">Update User</h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form
                action="/"
                method="post"
                class="update-form form-group row col col-lg-12 col-md-5 col-sm-3 g-1">
                <label for="uname">Name</label>
                <input
                  type="text"
                  name="uname"
                  id="uname"
                  class="form-control uname" />
                <label for="uemail">Email</label>
                <input
                  type="email"
                  name="uemail"
                  id="uemail"
                  class="form-control uemail" />
                <label for="uavatar">Avatar</label>
                <input
                  type="url"
                  name="uavatar"
                  id="uavatar"
                  class="form-control uavatar" />
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="submit"
                class="btn btn-outline-warning update"
                data-bs-dismiss="modal"
                onClick=updateUser(${id})>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>


    `;
    });
  } catch (err) {
    alertBox.classList.replace("hiding", "show");
    errorMsg.innerHTML = `Bad Request on Get User!`;
  }


};

displayData();

// Create User
const createUser = async (e) => {
  // blocking default form behaviour
  e.preventDefault();

  const formData = {
    name: getName.value.trim(),
    email: getEmail.value,
    avatar: getAvatar.value
  };

  try {
    const setResponse = await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    // If you show the created data
    // const data = await setResponse.json();
    // console.log(data);

    // calling this function to reload the data
    displayData();
    getName.value = "";
    getEmail.value = "";
    getAvatar.value = "";

    alertBox.classList.replace("fade", "show");
    errorMsg.innerHTML = `Success`;

  } catch (err) {
    alertBox.classList.replace("hiding", "show");
    errorMsg.innerHTML = `Bad Request`;
    console.error(err.message);
  }

};
form.addEventListener('submit', createUser);


// Edit User
const editUser = async (id) => {
  // console.log(id);
  // console.log("edited");
  const updatedName = document.querySelector('.uname');
  const updatedEmail = document.querySelector('.uemail');
  const updatedAvatar = document.querySelector('.uavatar');

  try {
    const response = await fetch(`${apiURL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      }
    });

    // console.log(response);
    const user = await response.json();
    // console.log(user);

    const { name, email, avatar } = user;

    // fill again ther user field
    // getName.value = name;
    // getEmail.value = email;
    // getAvatar.value = avatar;
    updatedName.value = name;
    updatedEmail.value = email;
    updatedAvatar.value = avatar;

  } catch (error) {
    alertBox.classList.replace("fade", "show");
    errorMsg.innerHTML = "Bad Request";
    console.error(error);
  }

};

// Delete User
const deleteUser = async (id) => {
  // console.log(id);
  try {
    const user = await fetch(`${apiURL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });

    // If you see deleted user
    // const deleteUser = await user.json();
    // console.log(deleteUser);
    displayData();
    alertBox.classList.replace("hiding", "show");
    errorMsg.innerHTML = `Successfully deleted!`;

  } catch (error) {
    alertBox.classList.replace("hiding", "show");
    errorMsg.innerHTML = `Bad Request on delete!`;
    console.log(error.message);
  }
  // console.log("deleted");
};



const updateUser = async (id) => {
  console.log(id);
  console.log("updated");
  const updatedName = document.querySelector('.uname');
  const updatedEmail = document.querySelector('.uemail');
  const updatedAvatar = document.querySelector('.uavatar');

  const updateFormData = {
    name: updatedName.value.trim(),
    email: updatedEmail.value,
    avatar: updatedAvatar.value
  };

  console.log(updateFormData);
  try {
    const response = await fetch(`${apiURL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(updateFormData),
      headers: {
        "Content-Type": "application/json",
      }
    });

    console.log(response);
    const user = await response.json();
    console.log(user);
    displayData();

    alertBox.classList.replace("fade", "show");
    errorMsg.innerHTML = "Successfully updated";

  } catch (error) {
    alertBox.classList.replace("fade", "show");
    errorMsg.innerHTML = "Bad Request";
    console.error(error);
  }

};


// updateForm.addEventListener('submit', updateUser);

