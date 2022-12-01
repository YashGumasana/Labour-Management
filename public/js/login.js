console.log('login');

const fetchUser = async () => {
    const firstLogin = localStorage.getItem("firstLogin")
    let token = localStorage.getItem('token')

    console.log(firstLogin);
    if (firstLogin == 'true') {
        console.log('-+-+-+');
        try {
            const { data: data } = await axios.post("/api/v1/user/generateAccessToken", { token })


            if (data.user.category == 'labour' && data.user.approveStatus == 1) {
                console.log('++');
                location.assign('../labour.html')
            }
            else if (data.user.category == 'labour' && data.user.images.length != 4) {
                location.assign('../lab.html')
            }
            else if (data.user.category == 'labour') {
                location.assign('../submit.html')

            }
            else if (data.user.category == 'contractor') {
                location.assign('../Lab.html')
            }
            else if (data.user.category == 'officer') {
                location.assign('../officer.html')
            }
            else if (data.user.category == 'builder') {
                location.assign('../Lab.html')
            }


        } catch (error) {
            console.log(error);
        }
    }
}

fetchUser()
// import { GLOBALTYPES } from './globalTypes'
const login = document.querySelector(".button-login");
const formAlertDOM = document.querySelector(".form-alert")


// const fullname1 = document.querySelector(".fullname");
// const username1 = document.querySelector(".username");
const email1 = document.querySelector(".email");
// const phone_number1 = document.querySelector(".phone-number");
const password1 = document.querySelector(".password");
// const confirm_password1 = document.querySelector(".confirm-password");
// const gender1 = document.getElementsByName("gender");
// const category1 = document.getElementById("category")
// function myFunction() {
//     location.replace("../Lab.html")
// }

// lab html page



login.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log('++');
    // select gender
    // for (i = 0; i < gender1.length; i++) {
    //     if (gender1[i].checked) {
    //         gender1.value = gender1[i].value
    //     }
    // }

    // select category
    // let selectedOption = document.forms["Register-form"].category

    // console.log(selectedOption.value);

    // console.log(fullname1.value, username1.value, email1.value, phone_number1.value, selectedOption.value, password1.value, confirm_password1.value, gender1.value);

    // const fullname = fullname1.value
    // const username = username1.value
    const email = email1.value
    // const phoneNumber = phone_number1.value
    // const category = selectedOption.value
    const password = password1.value
    // const confirmPassword = confirm_password1.value
    // const gender = gender1.value


    try {

        // if (password != confirmPassword) {
        //     formAlertDOM.textContent = `you have filled wrong information`
        //     return
        // }
        console.log('---');
        if (email && password) {
            console.log('++');
            const { data } = await axios.post("/api/v1/user/login", { email, password })

            console.log(data);
            console.log(data.token);
            localStorage.setItem('token', data.token)
            localStorage.setItem('firstLogin', true)
            formAlertDOM.textContent = ""

            if (data.user.category == 'labour') {
                location.assign('../submit.html')
            }
            else if (data.user.category == 'contractor') {
                location.assign('../Lab.html')
            }
            else if (data.user.category == 'officer') {
                location.assign('../officer.html')
            }
            else if (data.user.category == 'builder') {
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
