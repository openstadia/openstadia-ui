import type {Hub} from "@/models/hub";

export async function getHub(): Promise<Hub> {
    const response = await fetch(`/api/hub`)
    return await response.json()
}

export async function setHub(hub: Hub) {
    const response = await fetch(`/api/hub`, {
        method: 'POST',
        body: JSON.stringify(hub),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return await response.json()
}
