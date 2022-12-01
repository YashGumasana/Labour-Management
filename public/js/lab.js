console.log('lab');

const adhar1 = document.getElementById('adhar')
const account1 = document.getElementById('account')
const address1 = document.getElementById('address')
const job1 = document.getElementById('job')

const btn = document.getElementById('btn');


let images = []
let paraller_array = []

account1.disabled = true
address1.disabled = true
job1.disabled = true
// add adhar image
paraller_array = [
    adhar1.addEventListener('change', async (e) => {
        const imageFile = e.target.files[0];

        const formData = new FormData();

        formData.append('image', imageFile)
        let token = localStorage.getItem('token')

        btn.disabled = true;
        btn.innerHTML = 'wait...';




        try {
            const { data: { image: { src } } } = await axios.post('/api/v1/user/uploadDocument', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                }
            })

            images.push(src)
            btn.disabled = false;
            btn.innerHTML = 'submit';
            account1.disabled = false


        } catch (error) {
            console.log(error);
        }
    }),

    // add account image
    account1.addEventListener('change', async (e) => {
        const imageFile = e.target.files[0];

        const formData = new FormData();

        formData.append('image', imageFile)

        let token = localStorage.getItem('token')
        btn.disabled = true;
        btn.innerHTML = 'wait...';


        try {
            const { data: { image: { src } } } = await axios.post('/api/v1/user/uploadDocument', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,

                }
            })

            images.push(src)
            btn.disabled = false;
            btn.innerHTML = 'submit';
            address1.disabled = false



        } catch (error) {
            console.log(error);
        }
    }),


    // add address image
    address1.addEventListener('change', async (e) => {
        const imageFile = e.target.files[0];

        const formData = new FormData();

        formData.append('image', imageFile)

        let token = localStorage.getItem('token')
        btn.disabled = true;
        btn.innerHTML = 'wait...';


        try {
            const { data: { image: { src } } } = await axios.post('/api/v1/user/uploadDocument', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,

                }
            })

            images.push(src)
            btn.disabled = false;
            btn.innerHTML = 'submit';
            job1.disabled = false



        } catch (error) {
            console.log(error);
        }
    }),


    // add job image
    job1.addEventListener('change', async (e) => {
        const imageFile = e.target.files[0];

        const formData = new FormData();

        formData.append('image', imageFile)

        let token = localStorage.getItem('token')
        btn.disabled = true;
        btn.innerHTML = 'wait...';


        try {
            if (token) {
                const { data: { image: { src } } } = await axios.post('/api/v1/user/uploadDocument', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,

                    }
                })

                images.push(src)
                btn.disabled = false;
                btn.innerHTML = 'submit';

            }
            else {
                console.log('no access');
            }

        } catch (error) {
            console.log(error);
        }
    })
]


btn.addEventListener('click', async (e) => {
    e.preventDefault()
    await Promise.all(paraller_array)
    console.log(images);
    let token = localStorage.getItem('token')
    console.log(images.length);

    if (images.length == 4) {
        console.log('++');
        if (token) {
            e.preventDefault();
            try {
                await axios.post("/api/v1/user/createDocument", { images: images }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                images = []
                location.assign('../submit.html')

            }
            catch (error) {
                console.log(error);
            }
        }
        else {
            console.log('no access');
        }
    } else {
        console.log('plz upload image');
    }
})