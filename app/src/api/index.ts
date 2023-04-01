export async function http(url: string): Promise<any> {
    const response = await fetch(url);
    return await response.json();
}
