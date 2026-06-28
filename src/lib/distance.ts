export type LatLng = {
  lat: number;
  lon: number;
};

export async function geocodeAddress(address: string): Promise<LatLng | null> {
  if (!address) return null;

  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(address)}`;
    const response = await fetch(url, {
      headers: {
        "Accept-Language": "pt-BR",
      },
    });

    if (!response.ok) return null;

    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) return null;

    const item = data[0];
    const lat = Number(item.lat);
    const lon = Number(item.lon);

    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
    return { lat, lon };
  } catch {
    return null;
  }
}

export function haversineDistanceKm(a: LatLng, b: LatLng): number {
  const toRadians = (value: number) => (value * Math.PI) / 180;
  const R = 6371;
  const dLat = toRadians(b.lat - a.lat);
  const dLon = toRadians(b.lon - a.lon);
  const lat1 = toRadians(a.lat);
  const lat2 = toRadians(b.lat);

  const sinLat = Math.sin(dLat / 2);
  const sinLon = Math.sin(dLon / 2);
  const haversine = sinLat * sinLat + sinLon * sinLon * Math.cos(lat1) * Math.cos(lat2);
  const distance = 2 * R * Math.asin(Math.min(1, Math.sqrt(haversine)));

  return distance;
}

export async function estimateDistanceKm(storeAddress: string, destinationAddress: string) {
  const origin = await geocodeAddress(storeAddress);
  const destination = await geocodeAddress(destinationAddress);
  if (!origin || !destination) return null;
  return haversineDistanceKm(origin, destination);
}
