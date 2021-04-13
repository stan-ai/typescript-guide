const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;
import axios from "axios";

const G_MAP_API = "YOUR_API_KEY";

type GoogleGeoCodingResponse = {
    results: { geometry: { location: { lat: number; lng: number } } }[];
    status: "OK" | "ZERO_RESULTS";
};

// declare var google: any;

function searchAddressHandler(event: Event) {
    event.preventDefault();
    const enteredAddress = addressInput.value;

    axios
        .get<GoogleGeoCodingResponse>(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
                enteredAddress
            )}&key=${G_MAP_API}`
        )
        .then((response) => {
            if (response.data.status !== "OK") {
                throw new Error("Could not fetch location");
            }
            const coordinates = response.data.results[0].geometry.location;
            const map = new google.maps.Map(document.getElementById("map")!, {
                center: coordinates,
                zoom: 16,
            });

            const marker = new google.maps.Marker({
                position: coordinates,
                map: map,
            });
        })
        .catch((err) => {
            alert(err);
            console.log(err);
        });
}

form.addEventListener("submit", searchAddressHandler);
