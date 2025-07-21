import React, { useEffect, useState } from "react";
import axios from "axios";

export default function NearbyFoodLists() {
  const [foodData, setFoodData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [coords, setCoords] = useState(null);
  const [address, setAddress] = useState("");
  const [showAddressInput, setShowAddressInput] = useState(false);

  useEffect(() => {
    if (coords) {
      fetchNearbyFoods(coords.latitude, coords.longitude, page);
    }
  }, [coords, page]);

  const fetchNearbyFoods = async (latitude, longitude, pageNum = 1) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/food/nearby?latitude=${latitude}&longitude=${longitude}&page=${pageNum}`
      );
      setFoodData(res.data.data.foods);
      setTotalPages(res.data.data.pagination.totalPages);
    } catch (err) {
      setError("Failed to fetch nearby food items");
    } finally {
      setLoading(false);
    }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          setShowAddressInput(true);
        }
      );
    } else {
      setShowAddressInput(true);
    }
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    if (!address) return;
    try {
      // Use Google Maps Geocoding API to get lat/lng
      const apiKey = process.env.GOOGLE_MAPS_API_KEY;
      const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${apiKey}`;
      const geoRes = await axios.get(geoUrl);
      if (geoRes.data.status === "OK") {
        const loc = geoRes.data.results[0].geometry.location;
        setCoords({ latitude: loc.lat, longitude: loc.lng });
        setShowAddressInput(false);
      } else {
        setError("Could not geocode address");
      }
    } catch {
      setError("Could not geocode address");
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  useEffect(() => {
    handleGetLocation();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-4xl font-bold text-green-900 mb-6">Nearby Food Donations</h2>
      {showAddressInput && (
        <form onSubmit={handleAddressSubmit} className="mb-4 flex gap-2">
          <input
            type="text"
            className="border rounded px-3 py-2 w-64"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded">
            Submit
          </button>
        </form>
      )}
      {loading ? (
        <p>Loading nearby food items...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foodData.map((food) => (
              <div key={food._id} className="bg-white rounded shadow p-4 flex flex-col gap-2">
                <h3 className="text-xl font-bold">{food.title}</h3>
                <p>{food.description}</p>
                <p className="text-sm text-gray-600">Quantity: {food.quantity}</p>
                <p className="text-sm text-gray-600">Pickup Time: {food.pickupTime}</p>
                <p className="text-sm text-gray-600">Donor: {food.user?.fullname || food.user?.username}</p>
                <p className="text-sm text-gray-600">Distance: {food.distance ? (food.distance / 1000).toFixed(2) : "-"} km</p>
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded mt-2"
                  onClick={() => {
                    const [lng, lat] = food.location.coordinates;
                    window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, "_blank");
                  }}
                >
                  View Location
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
