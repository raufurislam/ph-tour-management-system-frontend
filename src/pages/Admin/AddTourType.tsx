import { DeleteConfirmation } from "@/components/DeleteConfirmation";
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  useGetTourTypesQuery,
  useRemoveTourTypeMutation,
} from "@/redux/features/Tour/tour.api";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function AddTourType() {
  const [currentPage, setCurrentPage] = useState(1);
  // const [limit, setLimit] = useState(20);
  console.log(currentPage);
  // const { data } = useGetTourTypesQuery({ page: currentPage, limit });
  const { data } = useGetTourTypesQuery({ page: currentPage });
  const [removeTourType] = useRemoveTourTypeMutation();

  const handleRemoveTourType = async (tourId: string) => {
    const toastId = toast.loading("Removing...");
    try {
      const res = await removeTourType(tourId).unwrap();

      if (res.success) {
        toast.success("Removed", { id: toastId });
      }
    } catch (err) {
      console.log(err);
    }
  };

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
            {data?.data?.map(
              (item: { _id: string; name: string }, index: number) => (
                <TableRow key={index}>
                  {/* <TableCell className="font-medium">INV001</TableCell> */}
                  <TableCell className="font-medium w-full">
                    {item.name}
                  </TableCell>
                  <TableCell>
                    <DeleteConfirmation
                      onConfirm={() => handleRemoveTourType(item._id)}
                    >
                      <Button size="sm">
                        <Trash2></Trash2>
                      </Button>
                    </DeleteConfirmation>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => prev - 1)}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage((prev) => prev + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
