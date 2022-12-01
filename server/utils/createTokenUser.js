const createTokenUser = (user) => {
    return {
        id: user._id,
    };
}

export default createTokenUser;