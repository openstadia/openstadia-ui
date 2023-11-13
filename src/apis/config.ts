export async function getConfig() {
    const response = await fetch(`/api/config`)
    return await response.json()
}
