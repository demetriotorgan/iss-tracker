import axios from "axios";

const backendApi = axios.create({
    baseURL: "http://localhost:5000"
});

export async function saveISSPosition(position) {

    const response = await backendApi.post(
        "/iss/position",
        position
    );

    return response.data;
};

export async function getOrbits() {
    const response = await backendApi.get("/iss/orbits");
    return response.data;
}

export async function getActiveOrbit() {
    const response = await backendApi.get("/iss/orbits/active");
    return response.data;
}
