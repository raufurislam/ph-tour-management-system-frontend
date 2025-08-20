import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import LoadingPage from "../LoadingPage";
import { useParams } from "react-router";
import { useGetAllToursQuery } from "@/redux/features/Tour/tour.api";
import { useCreateBookingMutation } from "@/redux/features/booking/booking.api";

export default function Booking() {
  const [guestCount, setGuestCount] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);

  const { id } = useParams();
  const { data, isLoading, isError } = useGetAllToursQuery({ _id: id });
  const [createBooking] = useCreateBookingMutation();

  // console.log("Inside tour details", data);

  const tourData = data?.[0];

  useEffect(() => {
    if (!isLoading && !isError) {
      setTotalAmount(guestCount * tourData!.costFrom);
    }
  }, [guestCount, totalAmount, isLoading, isError]);

  if (isLoading) {
    return <LoadingPage />;
  }

  const incrementGuest = () => {
    // if (guestCount < (tourData?.maxGuest ?? 1)) setGuestCount(guestCount + 1);
    setGuestCount((prev) => prev + 1);
  };

  const decrementGuest = () => {
    // if (guestCount > 1) setGuestCount(guestCount - 1);
    setGuestCount((prev) => prev - 1);
  };

  const handleBooking = async () => {
    let bookingData;
    if (data) {
      bookingData = {
        tour: id,
        guestCount: guestCount,
      };
    }

    try {
      const res = await createBooking(bookingData).unwrap();
      if (res.success) {
        window.open(res.data.paymentUrl);
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 container mx-auto">
      {!isLoading && isError && (
        <div>
          <p>Something Went Wrong!!</p>{" "}
        </div>
      )}

      {!isLoading && data?.length === 0 && (
        <div>
          <p>No Data Found</p>{" "}
        </div>
      )}

      {!isLoading && !isError && data!.length > 0 && (
        <>
          {/* Left Section - Tour Summary */}
          <div className="flex-1 space-y-6">
            <div>
              <img
                src={tourData?.images[0]}
                alt={tourData?.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold mb-2">{tourData?.title}</h1>
              <p className="text-gray-600 mb-4">{tourData?.description}</p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Location:</strong> {tourData?.location}
                </div>
                <div>
                  <strong>Duration:</strong> {tourData?.startDate} to{" "}
                  {tourData?.endDate}
                </div>
                <div>
                  <strong>Tour Type:</strong> {tourData?.tourType}
                </div>
                <div>
                  <strong>Max Guests:</strong> {tourData?.maxGuest}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">What's Included</h3>
              <ul className="list-disc list-inside text-sm space-y-1">
                {tourData?.included.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Tour Plan</h3>
              <ol className="list-decimal list-inside text-sm space-y-1">
                {tourData?.tourPlan.map((plan, index) => (
                  <li key={index}>{plan}</li>
                ))}
              </ol>
            </div>
          </div>

          {/* Right Section - Booking Details */}
          <div className="w-full md:w-96">
            <div className="border border-muted p-6 rounded-lg shadow-md sticky top-6">
              <h2 className="text-2xl font-bold mb-6">Booking Details</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Number of Guests
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={decrementGuest}
                      disabled={guestCount <= 1}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50"
                    >
                      -
                    </button>
                    <span className="text-lg font-medium w-8 text-center">
                      {guestCount}
                    </span>
                    <button
                      onClick={incrementGuest}
                      disabled={guestCount >= tourData!.maxGuest}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Price per person:</span>
                    <span>${tourData?.costFrom}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Guests:</span>
                    <span>{guestCount}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount:</span>
                    <span>${totalAmount}</span>
                  </div>
                </div>

                <Button onClick={handleBooking} className="w-full" size="lg">
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// const tourData = {
//     _id: "1",
//     title: "Magical Santorini Island Adventure",
//     description:
//       "Experience the breathtaking beauty of Santorini with its iconic white-washed buildings, stunning sunsets, and crystal-clear waters. This 5-day adventure includes visits to traditional villages, wine tasting, and relaxation on unique volcanic beaches.",
//     location: "Santorini, Greece",
//     images: [
//       "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&h=300&fit=crop",
//       "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=500&h=300&fit=crop",
//       "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
//     ],
//     costFrom: 1299,
//     maxGuest: 12,
//     startDate: "2024-06-15",
//     endDate: "2024-06-20",
//     tourType: "Cultural & Leisure",
//     included: [
//       "Round-trip flights",
//       "4-star hotel accommodation",
//       "Daily breakfast",
//       "Guided tours",
//       "Wine tasting experience",
//       "Sunset cruise",
//     ],
//     tourPlan: [
//       "Arrival in Santorini and check-in to hotel",
//       "Explore Fira town and enjoy welcome dinner",
//       "Visit Oia village and watch famous sunset",
//       "Wine tasting tour in traditional vineyards",
//       "Relax at Red Beach and visit Akrotiri ruins",
//       "Sunset sailing cruise and departure",
//     ],
//   };
