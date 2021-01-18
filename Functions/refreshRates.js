import axios from "axios";

export default async function refreshRates() {
    const { data } = await axios
        .get(`https://api.kingsofbinary.com/live_rates`)
        .catch((err) => console.log(err));
    return data;
}
