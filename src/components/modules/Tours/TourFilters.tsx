import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { useGetTourTypesQuery } from "@/redux/features/Tour/tour.api";
import { useSearchParams } from "react-router";

export default function TourFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedDivision = searchParams.get("division") || "";
  const selectedTourType = searchParams.get("tourType") || "";

  const { data: divisionData, isLoading: divisionIsLoading } =
    useGetDivisionsQuery(undefined);

  const { data: tourTypeData, isLoading: tourTypeIsLoading } =
    useGetTourTypesQuery({ limit: 1000, fields: "_id,name" });

  const divisionOption = divisionData?.map(
    (item: { _id: string; name: string }) => ({
      value: item._id,
      label: item.name,
    })
  );

  const tourTypeOptions = tourTypeData?.data?.map(
    (tourType: { _id: string; name: string }) => ({
      value: tourType._id,
      label: tourType.name,
    })
  );

  const handleDivisionChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("division", value);
    // console.log(params.get("division"));
    setSearchParams(params);
  };

  const handleTourTypeChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tourType", value);
    // console.log(params.get("division"));
    setSearchParams(params);
  };

  const handleClearFilter = () => {
    const param = new URLSearchParams(searchParams);
    param.delete("division");
    param.delete("tourType");
    setSearchParams(param);
  };

  return (
    <div className="col-span-3 w-full h-[500px] border border-muted rounded-md p-4 space-y-4">
      <div className="flex justify-between">
        <h1>Filters</h1>
        <Button size="sm" variant="outline" onClick={handleClearFilter}>
          Clear Filter
        </Button>
      </div>
      <div>
        <Label className="mb-2">Division to visit</Label>
        <Select
          onValueChange={(value) => handleDivisionChange(value)}
          value={selectedDivision ? selectedDivision : ""}
          disabled={divisionIsLoading}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Divisions</SelectLabel>
              {divisionOption?.map((item: { value: string; label: string }) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="mb-2">Tour Type</Label>
        <Select
          onValueChange={handleTourTypeChange}
          value={selectedTourType ? selectedTourType : ""}
          disabled={tourTypeIsLoading}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Divisions</SelectLabel>
              {tourTypeOptions?.map(
                (item: { value: string; label: string }) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                )
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
