import { AddTourTypeModal } from "@/components/modules/Admin/TourType/AddTourModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetTourTypesQuery } from "@/redux/features/Tour/tour.api";
import { Trash2 } from "lucide-react";

export default function AddTourType() {
  const { data } = useGetTourTypesQuery(undefined);
  // console.log(data);

  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex justify-between my-6">
        <h1 className="text-xl font-semibold">Tour Type</h1>
        <AddTourTypeModal />
      </div>
      <div className="border border-muted rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              {/* <TableHead className="w-[100px]">Invoice</TableHead> */}
              <TableHead className="w-28">Name</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((item: { name: string }) => (
              <TableRow>
                {/* <TableCell className="font-medium">INV001</TableCell> */}
                <TableCell className="font-medium w-full">
                  {item.name}
                </TableCell>
                <TableCell>
                  <Button size="sm">
                    <Trash2></Trash2>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
