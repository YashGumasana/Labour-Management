console.log('submit response');

const resubmit1 = document.querySelector('.button-resubmit')
const profile1 = document.querySelector('.button-profile')
const responseDOM = document.querySelector('.container')

resubmit1.disabled = true
profile1.disabled = true

resubmit1.addEventListener('click', async (e) => {
    e.preventDefault()
    console.log('++');
})
profile1.addEventListener('click', async (e) => {
    e.preventDefault()
    console.log('--');
})



const fetchResponse = async () => {
    let token = localStorage.getItem('token')

    try {

        const { data: data } = await axios.get('/api/v1/user/get_request_response', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        console.log(data.labour);

        if (data.labour.approveStatus == 0) {
            responseDOM.innerHTML = `<div>
            <h1 class="h1">
                <center class="response">Your work is in pending</center>
            </h1>
        </div>`
        }

        else if (data.labour.approveStatus == 1) {
            responseDOM.innerHTML = `<div>
            <h1 class="h1">
                <center class="response">Your Document is approved</center>
            </h1>
        </div>`
            profile1.disabled = false
            profile1.addEventListener('click', async (e) => {
                location.assign('../labour.html')

            })

        }

        else {
            let response
            for (const key in data.labour.docVerify) {
                // key = key + 1
                console.log(key);
                if (!data.labour.docVerify[key]) {
                    let j = parseInt(key) + 1
                    response += `<div>
            <h1 class="h1">
                <center class="response">Your ${j} document is not approved</center>
            </h1>
        </div>`
                }
            }
            responseDOM.innerHTML = response
            resubmit1.disabled = false
            resubmit1.addEventListener('click', async (e) => {
                location.assign('../lab.html')

            })
        }

    } catch (error) {

    }
}

fetchResponse()