import axios from "axios";

const api = axios.create({
    baseURL: "https://api.wheretheiss.at/v1"
});

export async function getISSPosition(){
    try {
        const response = await api.get('/satellites/25544');
        return response.data
    } catch (error) {
        console.error(error);
        throw new Error(
            "Não foi possível obter a posição da ISS"
        );
    }
};

export async function getISSPastPositions(){
    try {
        const now = Math.floor(Date.now() / 1000);

        const timestamps = [];

        for (let i = 9; i >= 0; i--) {
            timestamps.push(
                now - (i * 30)
            );
        }

        const response = await api.get(
            `/satellites/25544/positions`,
            {
                params: {
                    timestamps: timestamps.join(",")
                }
            }
        );

        return response.data;

    } catch (error) {
        console.error(error);

        throw new Error(
            "Não foi possível obter o histórico da ISS"
        );
    }
}

export default api;