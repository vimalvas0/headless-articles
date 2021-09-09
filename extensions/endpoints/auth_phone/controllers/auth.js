const fetch = require('node-fetch');


exports.register = async (req, res, next)=>{
    const {email, password, phone} = req.body;

    const access_token = await getAccessToken();
    const newUser = await makeUser(email, password, access_token);
    const user_details = newUser.data;
    const user_id = user_details.id;
    const newUserWithPhone = await makeUserWithPhone(user_id, email, phone, access_token);
    
    user_details.phone = newUserWithPhone.data.phone;

    return res.json({
        status : 'User successfully created, now you can login',
        registered_user : user_details
    });
}

// login
// body requires {phone, password}
exports.login = async (req, res, next)=>{
    const {phone, password} = req.body;
    let userWithPhone;
    let userWithId 

    const access_token = await getAccessToken();
    try{
        userWithPhone = await fetch('http://localhost:8055/items/users_phone?filter[phone][_eq]='+phone, 
        {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + access_token
            }
        });
    }catch(e){
        return next(new Error('There is no user with this number.'));
    }

    try{
        
    }catch(e){
        return next(new Error('There is no user with this number.'));
    }
}

// Helper Functions ################################################################
async function getAccessToken(){
    const loginAdmin = await fetch('http://localhost:8055/auth/login', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            email : 'vimal@gmail.com',
            password : 'v123'
        })
    })
    .then(res => res.json());

    return loginAdmin.data.access_token;
}


async function makeUser(email, password, access_token){
    const newUser = await fetch('http://localhost:8055/users', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + access_token
        },
        body : JSON.stringify({
            email : email,
            password : password
        })
    })
    .then(res => res.json());

    return newUser;
}

async function getUserWithId(id, access_token){
    const user = await fetch('http://localhost:8055/users/'+id, {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + access_token
        },
    })
    .then(res => res.json());

    return user;
}



async function makeUserWithPhone(user_id, email, phone, access_token){
    const newUserWithPhone = await fetch('http://localhost:8055/items/users_phone', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + access_token
        },
        body : JSON.stringify({
            user_id : user_id,
            phone : phone,
            email : email,
        })
    })
    .then(res => res.json());

    return newUserWithPhone;
}