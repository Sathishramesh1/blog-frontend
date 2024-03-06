import axios from 'axios';


const BASE_URL = "https://blog-backend-fz02.onrender.com";


export const RegisterUser = async (payload) => {
    const response = await axios.post(`${BASE_URL}/api/auth/register`, payload);
    return response;
};

export const LoginUser = async (payload) => {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, payload);
    return response;
};
export const ActivateUser = async (activationToken) => {
    const response = await axios.get(`${BASE_URL}/api/auth/activate/${activationToken}`);
    return response;
};
export const RandomStringApi = async (randomString) => {
    const response = await axios.get(`${BASE_URL}/api/auth/verifyRandomString/${randomString}`);
    return response;
};



export const ForgetPasswordApi = async (payload) => {
    const response = await axios.post(`${BASE_URL}/api/auth/forgetpassword`, payload);
    return response;
};

export const ResetPasswordApi = async (payload,resetToken) => {
    const response = await axios.post(`${BASE_URL}/api/auth/resetpassword/${resetToken}`, payload);
    return response;
};

export const CreateStoryApi = async (payload,authToken) => {
    const headers = {
        'x-auth-token':`Bearer ${authToken}`,
        'Content-Type':'application/json', 
    };

    const response = await axios.post(`${BASE_URL}/api/story/addstory`, payload,{headers});
    return response;
};

export const GetAllStoryApi=async()=>{
    const response = await axios.get(`${BASE_URL}/api/story/getAllStories`);
    return response;
}

export const FetchStoryApi=async(storyId,authToken)=>{
    const headers = {
        'x-auth-token':`Bearer ${authToken}`,
        'Content-Type':'application/json', 
    };

    const response = await axios.get(`${BASE_URL}/api/story/${storyId}`,{headers});
    return response;
}


export const EditStoryApi=async(storyId,storyData,authToken)=>{
    const headers = {
        'x-auth-token':`Bearer ${authToken}`,
        'Content-Type':'application/json', 
    };

    const response = await axios.put(`${BASE_URL}/api/story/${storyId}`,storyData,{headers});
    return response;
}

export const DeleteStoryApi=async(storyId,authToken)=>{
    const headers = {
        'x-auth-token':`Bearer ${authToken}`,
        'Content-Type':'application/json', 
    };

    const response = await axios.delete(`${BASE_URL}/api/story/${storyId}`,{headers});
    return response;
}
