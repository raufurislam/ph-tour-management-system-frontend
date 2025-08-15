import { useGetTourTypesQuery } from "@/redux/features/Tour/tour.api";

export default function AddTourType() {
  const { data } = useGetTourTypesQuery(undefined);
  console.log(data);

  return (
    <div>
      <h1>This is AddTourType component</h1>
    </div>
  );
}
