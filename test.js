const axios = require("axios");
const qs = require("qs");


axios.defaults.baseURL = "http://localhost:3000";

test('/info – test', async() => {
    const response = await axios.get("/info");
    expect(response.status).toEqual(200);
    expect(response.data).toEqual({author : 23103});
});

test('/hello – test', async() => {
    const response = await axios.get("/hello" + "/world");
    expect(response.status).toEqual(200);
    expect(response.data).toEqual("Hello world!");
});

test('/hello - test blank space after argument', async() => {
    const response = await axios.get("/hello"+"/world ");
    expect(response.status).toEqual(200);
    expect(response.data).toEqual("Hello world!");
});
  
test('/hello – test invalid characters - digits', async() => {
    try{
        const response = await axios.get("/hello"+"/world622");
    }
    catch(error){
        expect(error.response.status).toEqual(400);
        expect(error.response.data).toEqual("Name is not valid");
    }
});

test('/hello – test invalid characters ', async() => {
    try{
        const response = await axios.get("/hello"+"/world-----");
    }
    catch(error){
        expect(error.response.status).toEqual(400);
        expect(error.response.data).toEqual("Name is not valid");
    }
});