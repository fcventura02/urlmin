require("dotenv/config");
export const config = {
    API_URL: "http://localhost:5000",
    MONGO_CONNECTION: `mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASS}@cluster0.6kps4.mongodb.net/url-shortener-dio?retryWrites=true&w=majority`,
};
