export async function getApps() {
    const response = await fetch(`/api/apps`)
    return await response.json()
}
