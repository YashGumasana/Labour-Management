console.log('labour ');


const signout = document.querySelector('.signOut')

signout.addEventListener('click', async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')

    try {
        const { data: data } = await axios.get('/api/v1/user/logout', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        localStorage.setItem('token', null)
        localStorage.setItem('firstLogin', false)

        location.assign('../index.html')

    } catch (error) {
        console.log(error);
    }

})