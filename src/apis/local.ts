import type {Local} from "@/models/local";

export async function getLocal() {
    const response = await fetch(`/api/local`)
    return await response.json()
}

export async function setLocal(local: Local) {
    const response = await fetch(`/api/local`, {
        method: 'POST',
        body: JSON.stringify(local),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return await response.json()
}
