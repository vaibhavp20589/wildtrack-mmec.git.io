const Animal = require('../models/Animal');

exports.receiveLocationData = async (req, res) => {
  const { animalId, name, latitude, longitude } = req.body;

  try {
    let animal = await Animal.findOne({ animalId });

    if (!animal) {
      animal = new Animal({ animalId, name, locationHistory: [], group: null }); // Initialize group to null
    }

    animal.locationHistory.push({ latitude, longitude });
    await animal.save();

    // Call the grouping algorithm (optional, for dynamic frontend updates)
    const group = await groupAnimals(animal.locationHistory); // Pass location history

    // Update the animal's group property if necessary
    if (animal.group !== group) {
      animal.group = group;
      await animal.save();
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ success: false, error: "Internal server error" }); // Send generic error message to frontend
  }
};

exports.getAllLocations = async (req, res) => {
  try {
    const animals = await Animal.find().populate('locationHistory'); // Include location history
    const groups = await Promise.all(animals.map(async (animal) => { // Group animals asynchronously
      return await groupAnimals(animal.locationHistory);
    }));

    animals.forEach((animal, index) => {
      animal.group = groups[index]; // Assign group to each animal
    });

    await Animal.bulkWrite(animals.map((animal) => ({ updateOne: { filter: { _id: animal._id }, update: { $set: { group: animal.group } } }}))); // Update animal groups in bulk

    res.status(200).json({ animals }); // Return animals with group information
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ success: false, error: "Internal server error" }); // Send generic error message to frontend
  }
};

// Group animals based on your chosen criteria
const groupAnimals = async (locationHistory) => {
  // Example 1: Group animals by proximity to a reference point (replace with your desired criteria)
  const referenceLatitude = 37.7749; // Latitude of reference point (e.g., water source, feeding area)
  const referenceLongitude = -122.4194; // Longitude of reference point
  const proximityThreshold = 500; // Radius in meters (adjust based on your animal and environment)

  const groups = {};
  for (const location of locationHistory) {
    const distance = calculateDistance(location.latitude, location.longitude, referenceLatitude, referenceLongitude);
    const groupKey = distance <= proximityThreshold ? "Group A (Near Reference Point)" : "Group B (Far from Reference Point)";

    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }

    groups[groupKey].push(location); // Include location data for visualization
  }

  return groups;
};

// Function to calculate distance using the Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; // Earth's radius in meters

  const φ1 = radians(lat1);
  const φ2 = radians(lat2);
  const Δφ = radians(lat2 - lat1);
  const Δλ = radians(lon2 - lon1);

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

// Convert degrees to radians
const radians = (degrees) => {
  return degrees * Math.PI / 180;
};
exports.getBehavioralData = async (req, res) => {
  try {
    const { animalId, startDate, endDate } = req.query; // Get parameters from request

    if (!animalId || !startDate || !endDate) {
      return res.status(400).json({ success: false, error: "Missing required parameters" });
    }

    const animal = await Animal.findById(animalId).populate('locationHistory'); // Find animal with location history
    if (!animal) {
      return res.status(404).json({ success: false, error: "Animal not found" });
    }

    const filteredLocations = animal.locationHistory.filter(loc => {
      const locationDate = new Date(loc.createdAt);
      return locationDate >= new Date(startDate) && locationDate <= new Date(endDate);
    }); // Filter locations within timeframe

    const totalLocations = filteredLocations.length;
    const totalDistance = calculateTotalDistance(filteredLocations); // Function to calculate total distance (implementation needed)
    const averageSpeed = totalDistance / (endDate - startDate) * 1000 * 60 * 60; // Assuming timestamps in milliseconds, convert to meters per hour

    const behavioralData = {
      animalId: animal._id,
      name: animal.name,
      totalLocations: totalLocations,
      averageSpeed: averageSpeed,
      // ... Add more behavioral data points as needed
    };

    res.status(200).json({ success: true, data: behavioralData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Function to calculate total distance between consecutive locations (implementation required)
const calculateTotalDistance = (locations) => {
  let totalDistance = 0;
  for (let i = 1; i < locations.length; i++) {
    const prevLoc = locations[i - 1];
    const currLoc = locations[i];
    totalDistance += calculateDistance(prevLoc.latitude, prevLoc.longitude, currLoc.latitude, currLoc.longitude);
  }
  return totalDistance;
};
