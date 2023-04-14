export async function http(url: string): Promise<any> {
    const response = await fetch(url);
    return await response.json();
}

const HOST_API = process.env.VUE_APP_HOST_API || "http://localhost";
const PORT_API = process.env.VUE_APP_PORT_API || 8080;
export const API_ADDRESS = `${HOST_API}:${PORT_API}/v1`;
