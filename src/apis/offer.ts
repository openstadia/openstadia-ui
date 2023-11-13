import type {Offer} from "@/models/offer";

export async function sendOffer(offer: Offer): Promise<Offer> {
    const response = await fetch(`/api/offer`, {
        method: 'POST',
        body: JSON.stringify(offer),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return await response.json()
}
