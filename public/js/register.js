console.log('register');

// import { GLOBALTYPES } from './globalTypes'
const register = document.querySelector(".button-register");
const formAlertDOM = document.querySelector(".form-alert")


const fullname1 = document.querySelector(".fullname");
const username1 = document.querySelector(".username");
const email1 = document.querySelector(".email");
const phone_number1 = document.querySelector(".phone-number");
const password1 = document.querySelector(".password");
const confirm_password1 = document.querySelector(".confirm-password");
const gender1 = document.getElementsByName("gender");
// const category1 = document.getElementById("category")
// function myFunction() {
//     location.replace("../Lab.html")
// }

// lab html page



register.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log('++');
    // select gender
    for (i = 0; i < gender1.length; i++) {
        if (gender1[i].checked) {
            gender1.value = gender1[i].value
        }
    }

    // select category
    let selectedOption = document.forms["Register-form"].category

    console.log(selectedOption.value);

    // console.log(fullname1.value, username1.value, email1.value, phone_number1.value, selectedOption.value, password1.value, confirm_password1.value, gender1.value);

    const fullname = fullname1.value
    const username = username1.value
    const email = email1.value
    const phoneNumber = phone_number1.value
    const category = selectedOption.value
    const password = password1.value
    const confirmPassword = confirm_password1.value
    const gender = gender1.value


    try {

        // if (password != confirmPassword) {
        //     formAlertDOM.textContent = `you have filled wrong information`
        //     return
        // }

        if (fullname && username && email && phoneNumber && category && password && confirmPassword && gender) {
            const { data } = await axios.post("/api/v1/user/register", { fullname, username, email, phoneNumber, category, password, confirmPassword, gender })

            console.log(data);
            console.log(data.token);
            localStorage.setItem('token', data.token)
            localStorage.setItem('firstLogin', true)

            formAlertDOM.textContent = ""

            if (data.newUser.category == 'labour') {
                location.assign('../Lab.html')
            }
            else if (data.newUser.category == 'contractor') {
                location.assign('../Lab.html')
            }
            else if (data.newUser.category == 'officer') {
                location.assign('../officer.html')
            }
            else if (data.newUser.category == 'builder') {
                location.assign('../Lab.html')
            }
            // myFunction()
            // fullname1.value = "",
            //     username1.value = "",
            //     email1.value = "",
            //     phone_number1.value = "",
            //     // selectedOption.value = 
            //     password1.value = "",
            //     confirm_password1.value = "",
            //     gender1.value = ""
        }
        else {
            formAlertDOM.textContent = `plz enter all detail`;

        }
    } catch (error) {


        console.log(error.response.data.msg, '---')
        // console.log(err);
        formAlertDOM.style.display = "block";
        formAlertDOM.textContent = error.response.data.msg;
    }
    // setTimeout(() => {
    //     formAlertDOM.style.display = "none";
    //     formAlertDOM.classList.remove("text-success");
    //   }, 1000);
})
