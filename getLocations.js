import fs from "fs";
import path from "path";
import https from "https";
import dotenv from "dotenv";
dotenv.config();

// You'll need to add your Google Maps API key here
const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

// Read the shelters data
const sheltersPath = path.join(process.cwd(), "public/shelters.json");
const sheltersData = JSON.parse(fs.readFileSync(sheltersPath, "utf8"));

// Function to get coordinates from Google Maps API
async function getCoordinates(address, municipio) {
  return new Promise((resolve) => {
    // Format the address for the API request
    const fullAddress = `${address}, ${municipio}, Quintana Roo, Mexico`;
    const formattedAddress = encodeURIComponent(fullAddress);

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}&key=${API_KEY}`;

    https
      .get(url, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          try {
            const response = JSON.parse(data);

            if (
              response.status === "OK" &&
              response.results &&
              response.results.length > 0
            ) {
              const location = response.results[0].geometry.location;
              resolve({
                lat: location.lat,
                lng: location.lng,
              });
            } else {
              console.log(`Could not find coordinates for: ${fullAddress}`);
              resolve(null);
            }
          } catch (error) {
            console.error("Error parsing response:", error);
            resolve(null);
          }
        });
      })
      .on("error", (err) => {
        console.error("Error making request:", err);
        resolve(null);
      });
  });
}

// Process all shelters and update their coordinates
async function updateSheltersWithCoordinates() {
  const updatedShelters = [];

  // Use a counter for API request limiting (to avoid hitting rate limits)
  let counter = 0;

  for (const shelter of sheltersData) {
    // Add a delay to avoid hitting API rate limits
    if (counter > 0 && counter % 10 === 0) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    // Create a copy of the shelter object
    const updatedShelter = { ...shelter };

    // Only request coordinates if we don't already have them
    if (!updatedShelter.coordinates) {
      if (shelter.DOMICILIO && shelter.MUNICIPIO) {
        console.log(
          `Getting coordinates for: ${shelter.EDIFICIO} in ${shelter.MUNICIPIO}`
        );
        const coordinates = await getCoordinates(
          shelter.DOMICILIO,
          shelter.MUNICIPIO
        );

        if (coordinates) {
          updatedShelter.coordinates = coordinates;
        } else {
          updatedShelter.coordinates = null;
        }
      } else {
        console.log(`Missing address or municipality for: ${shelter.EDIFICIO}`);
        updatedShelter.coordinates = null;
      }
    }

    updatedShelters.push(updatedShelter);
    counter++;
  }

  // Write the updated data back to the file
  fs.writeFileSync(sheltersPath, JSON.stringify(updatedShelters, null, 2));

  console.log(
    `Updated ${updatedShelters.length} shelters with coordinates where possible.`
  );
}

// Run the update function
updateSheltersWithCoordinates().catch(console.error);
