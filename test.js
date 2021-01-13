const axios = require("axios");
const qs = require("qs");


axios.defaults.baseURL = "http://localhost:3000";

test('/info – test', async() => {
    const response = await axios.get("/info");
    expect(response.status).toEqual(200);
    expect(response.data).toEqual({author : 23103});
});

