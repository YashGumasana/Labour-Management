console.log('pending');


const adhar1 = document.getElementById('adharImage')
const containerDOM = document.querySelector('.container')
const fullnameDOM = document.querySelector('.containerName')
const submitBtn = document.querySelector('#subRes')


// let x = document.createElement('button')
// x.type = "submit"
// x.value = "Resubmit"
// x.className = "xz"
// console.log(x.outerHTML, '+++');
// console.log(x, '+++');

let resubmit, resubmit2, resubmit3, resubmit4;
let labourId

const fetchProducts = async () => {
    let token = localStorage.getItem('token')

    try {
        const { data: data } = await axios.get('/api/v1/user/getDocument', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        // console.log(data);
        let key = 0
        let productDOM = ''
        console.log(data.labours.length);
        // for (const key in data.labours) {



        // }





        if (key < data.labours.length) {
            productDOM += `
       
                    <div class="cont2">
                    <h1 class="h1">
                    <center class="labourId">ID:${data.labours[key]._id}</center>
                    <center class="labourId">name:${data.labours[key].fullname}</center>
                </h1>
                      <nav class="navbar1">
                        <ul>
                            <li>
                        <center>Adhaar Card</center>
                        <p><img src="${data.labours[key].images[0]}"></p>
                    
                            <p>
                            <div class="cntr"">  
                            <button onClick = "this.disabled=true;document.getElementById('approve1').disabled=false; GFG_Fun('${data.labours[key]._id}','${false}','${0}');" class="space1" id="resub1" type="submit" value="Resubmit">Resubmit</button>
                                <button onClick = "this.disabled=true;document.getElementById('resub1').disabled=false; GFG_Fun('${data.labours[key]._id}','${true}','${0}')" class="space" id="approve1" type="submit" value="Approve">Approve</button>
                            </div>
                            </p>
                    
                            </li>
                    
                            <li>
                        <center>Account Details</center>
                        <p><img src="${data.labours[key].images[1]}"></p>
                        <p>
                        <div class="cntr"">  
                        <button onClick = "this.disabled=true;document.getElementById('approve2').disabled=false; GFG_Fun('${data.labours[key]._id}','${false}','${1}')" class="space1" id="resub2" type="submit" value="Resubmit">Resubmit</button>
                            <button onClick = "this.disabled=true;document.getElementById('resub2').disabled=false; GFG_Fun('${data.labours[key]._id}','${true}','${1}')" class="space" id="approve2" type="submit" value="Approve">Approve</button>
                        </div>
                        </p>
                    </li>
                    <li>
                        <center>Address</center>
                        <p><img src="${data.labours[key].images[2]}"></p>
                        <p>
                       
                    <div class="cntr"">  
                    <button onClick = "this.disabled=true;document.getElementById('approve3').disabled=false; GFG_Fun('${data.labours[key]._id}','${false}','${2}')" class="space1" id="resub3" type="submit" value="Resubmit">Resubmit</button>
                        <button onClick = "this.disabled=true;document.getElementById('resub3').disabled=false; GFG_Fun('${data.labours[key]._id}','${true}','${2}')" class="space" id="approve3" type="submit" value="Approve">Approve</button>
                    </div>
                        </p>
                    </li>
                    <li>
                        <center>Current Job Details</center>
                        <p><img src="${data.labours[key].images[3]}"></p>
                        
                        <div class="cntr"">  
                    <button onClick = "this.disabled=true;document.getElementById('approve4').disabled=false; GFG_Fun('${data.labours[key]._id}','${false}','${3}')" class="space1" id="resub4" type="submit" value="Resubmit">Resubmit</button>
                        <button onClick = "this.disabled=true;document.getElementById('resub4').disabled=false; GFG_Fun('${data.labours[key]._id}','${true}','${3}')" class="space" id="approve4" type="submit" value="Approve">Approve</button>
                    </div>
                        </p>
                    </li>
                </ul>
            </nav>
            
            </div>
           
            `
        }
        else {
            productDOM = `<h1 class="h1">
            <center class="labourId">There is no pending request</center>
        </h1>`

            submitBtn.style.visibility = 'hidden'

        }



        containerDOM.innerHTML = productDOM
        labourId = containerDOM.querySelector('.labourId')
        key = key + 1
        submitBtn.disabled = true

        // console.log(containerDOM);
        // console.log('++');
        // console.log('--');
        // submitBtn.disabled = true







        // resubmit = containerDOM.querySelectorAll('#resub1')
        // resubmit2 = containerDOM.querySelectorAll('#resub2')
        // resubmit3 = containerDOM.querySelectorAll('#resub3')
        // resubmit4 = containerDOM.querySelectorAll('#resub4')
        // console.log(resubmit);


        // // p2 = containerDOM.querySelectorAll('#resub2')
        // // console.log(p2);
        // let id1 = containerDOM.querySelectorAll('.h1')
        // console.log(id1);

        // const verifyFunction = async (verify, id, key) => {
        //     console.log(verify, id, key);
        //     try {
        //         await axios.post('/api/v1/user/verify', { verify, id, key }, {
        //             headers: {
        //                 Authorization: `Bearer ${token}`,
        //             }
        //         })

        //     }
        //     catch (error) {
        //         console.log(error.response.data.msg, '---')

        //     }
        // }


        // // adhaar card resubmit
        // for (const key in resubmit) {
        //     console.log(key);
        //     resubmit[key].addEventListener('click', async (e) => {
        //         e.preventDefault()
        //         verifyFunction(false, id1[key].innerText, key)
        //         resubmit[key].disabled = true

        //     })
        // }
        // // account dethai resubmit
        // for (const key in resubmit2) {
        //     console.log(key);
        //     resubmit2[key].addEventListener('click', async (e) => {
        //         e.preventDefault()
        //         verifyFunction(false, id1[key].innerText, key)
        //         resubmit2[key].disabled = true

        //     })
        // }
        // // address resubmit
        // for (const key in resubmit3) {
        //     console.log(key);
        //     resubmit3[key].addEventListener('click', async (e) => {
        //         e.preventDefault()
        //         verifyFunction(false, id1[key].innerText, key)
        //         resubmit3[key].disabled = true

        //     })
        // }
        // // job resubmit
        // for (const key in resubmit4) {
        //     console.log(key);
        //     resubmit4[key].addEventListener('click', async (e) => {
        //         e.preventDefault()
        //         verifyFunction(false, id1[key].innerText, key)
        //         resubmit4[key].disabled = true

        //     })
        // }

        // if()

    }

    catch (error) {
        console.log(error.response.data.msg, '---')
        console.log(error, '---')

    }
}

submitBtn.disabled = true
fetchProducts()
let sum = 0, arr = [];

const GFG_Fun = async (id, verify, num) => {
    console.log(submitBtn);
    console.log(id, verify, num);
    let token = localStorage.getItem('token')


    try {
        await axios.post('/api/v1/user/verify', { verify, id, num }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })


        if (!arr.includes(num)) {
            arr.push(num)
            sum = sum + parseInt(num)
        }
        console.log(sum, arr);
        if (sum == 6) {
            console.log('+++');

            // submitBtn.id
            submitBtn.disabled = false
            sum = 0
            arr = []

        }



    }
    catch (error) {
        console.log(error.response.data.msg, '---')

    }
}


submitBtn.addEventListener("click", async (e) => {
    e.preventDefault()
    let token = localStorage.getItem('token')

    id = labourId.innerHTML.substring(3)
    console.log(id);

    try {
        const { data: data } = await axios.post('/api/v1/user/create_request_response', { id }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        // submitBtn.disabled = true
        fetchProducts()
        // GFG_Fun()

    } catch (error) {

    }
})

// console.log(containerDOM.innerHTML);

// const p = containerDOM.querySelector('.space')

// p.addEventListener('click', async (e) => {
//     e.preventDefault()
//     console.log('+++');
// })

// console.log(x.className);
// const z = document.querySelector('.xz')
// // y = x.className
// z.addEventListener('click', async (e) => {
//     e.preventDefault()
//     console.log('++');
// })


// const approve1 = document.querySelectorAll('.container')
// const resubmit1 = document.querySelectorAll('.space')

// console.log(resubmit1);
// console.log(approve1);

// approve1.addEventListener('click', async (e) => {
// e.preventDefault()
// console.log('+++');

// })

