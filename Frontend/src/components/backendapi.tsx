import Axios from 'axios'
const host = {
    // Under construction
    heroku: "https://arcgaccess.herokuapp.com",
    localhost: "http://192.168.43.59:5000"
}
export default Axios.create({
    baseURL:host.heroku
})