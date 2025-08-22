import { Button } from "@/components/ui/button";
import { useGetAllToursQuery } from "@/redux/features/Tour/tour.api";
import { format } from "date-fns"; // ✅ needed for date formatting
import { Link, useParams } from "react-router";
import LoadingPage from "./LoadingPage";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";

export default function TourDetails() {
  const { id } = useParams();
  const { data, isLoading } = useGetAllToursQuery({ _id: id });

  const { data: divisionData } = useGetDivisionsQuery(
    {
      _id: data?.[0]?.division,
      fields: "name",
    },
    {
      skip: !data,
    }
  );
  console.log(divisionData);

  // console.log("Inside tour details", data);

  const tourData = data?.[0];

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{tourData?.title}</h1>
          <div className="flex gap-4 text-gray-600 mb-4">
            <span>📍 {tourData?.location}</span>
            <span>💰 From ${tourData?.costFrom}</span>
            <span>👥 Max {tourData?.maxGuest} guests</span>
          </div>
        </div>
        <div>
          <Button asChild>
            <Link to={`/booking/${tourData?._id}`}>Book Now</Link>
          </Button>
        </div>
      </div>

      {/* Images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {tourData?.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${tourData?.title} ${index + 1}`}
            className="w-full h-48 object-cover rounded-lg"
          />
        ))}
      </div>

      {/* Tour Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Tour Details</h2>
          <div className="space-y-2">
            <p>
              <strong>Dates:</strong>{" "}
              {format(new Date(tourData?.startDate ?? ""), "PP")} -{" "}
              {format(new Date(tourData?.endDate ?? ""), "PP")}
            </p>
            <p>
              <strong>Departure:</strong> {tourData?.departureLocation}
            </p>
            <p>
              <strong>Arrival:</strong> {tourData?.arrivalLocation}
            </p>
            <p>
              <strong>Division:</strong> {divisionData?.[0]?.name}
            </p>
            <p>
              <strong>Tour Type:</strong> {tourData?.tourType}
            </p>
            <p>
              <strong>Min Age:</strong> {tourData?.minAge} years
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <p className="text-muted-foreground">{tourData?.description}</p>
        </div>
      </div>

      {/* Amenities & Inclusions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-semibold mb-3">Amenities</h3>
          <ul className="space-y-1">
            {tourData?.amenities.map((amenity, index) => (
              <li key={index} className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                {amenity}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Included</h3>
          <ul className="space-y-1">
            {tourData?.included.map((item, index) => (
              <li key={index} className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Excluded</h3>
          <ul className="space-y-1">
            {tourData?.excluded.map((item, index) => (
              <li key={index} className="flex items-center">
                <span className="text-red-500 mr-2">✗</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tour Plan */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3">Tour Plan</h3>
        <ol className="space-y-2">
          {tourData?.tourPlan.map((plan, index) => (
            <li key={index} className="flex">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                {index + 1}
              </span>
              {plan}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

// ✅ dummy data only
// const tourData = {
//   _id: "1",
//   title: "Magical Santorini Island Adventure",
//   description:
//     "Experience the breathtaking beauty of Santorini with its iconic white-washed buildings, stunning sunsets, and crystal-clear waters. This 5-day adventure includes visits to traditional villages, wine tasting, and relaxation on unique volcanic beaches.",
//   location: "Santorini, Greece",
//   images: [
//     "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&h=300&fit=crop",
//     "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=500&h=300&fit=crop",
//     "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
//   ],
//   costFrom: 1299,
//   maxGuest: 12,
//   startDate: "2024-06-15",
//   endDate: "2024-06-20",
//   departureLocation: "Athens International Airport",
//   arrivalLocation: "Santorini Airport",
//   division: "Cyclades",
//   tourType: "Cultural & Leisure",
//   minAge: 18,
//   amenities: [
//     "Free WiFi",
//     "Air Conditioning",
//     "Swimming Pool Access",
//     "24/7 Concierge",
//     "Spa Services",
//   ],
//   included: [
//     "Round-trip flights",
//     "4-star hotel accommodation",
//     "Daily breakfast",
//     "Guided tours",
//     "Wine tasting experience",
//     "Sunset cruise",
//   ],
//   excluded: [
//     "Travel insurance",
//     "Lunch and dinner",
//     "Personal expenses",
//     "Optional activities",
//     "Tips and gratuities",
//   ],
//   tourPlan: [
//     "Arrival in Santorini and check-in to hotel",
//     "Explore Fira town and enjoy welcome dinner",
//     "Visit Oia village and watch famous sunset",
//     "Wine tasting tour in traditional vineyards",
//     "Relax at Red Beach and visit Akrotiri ruins",
//     "Sunset sailing cruise and departure",
//   ],
//   slug: "magical-santorini-island-adventure",
//   createdAt: "2024-01-15T10:30:00.000Z",
//   updatedAt: "2024-02-10T14:45:00.000Z",
// };
