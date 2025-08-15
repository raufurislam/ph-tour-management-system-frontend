import SingleImageUploader from "@/components/SingleImageUploader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAddDivisionMutation } from "@/redux/features/division/division.api";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function AddDivisionModal() {
  const [image, setImage] = useState<File | null>();
  const [addDivision] = useAddDivisionMutation();
  const [open, setOpen] = useState(false);

  console.log("inside add division modal", image);

  //   const form = useForm<ITourType>();
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data) => {
    const formData = new FormData();
    const toastId = toast.loading("Uploading Files. Please wait");

    formData.append("data", JSON.stringify(data));
    formData.append("file", image as File);

    // console.log(formData.get("data"));
    // console.log(formData.get("file"));

    try {
      const res = await addDivision(formData).unwrap();
      console.log(res);
      toast.success("Division Added Successfully", { id: toastId });
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Division</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Division</DialogTitle>
          <DialogDescription className="sr-only">
            Fill in the form below to create a new division.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-5"
            id="add-division"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Division Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Tour Type Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Division Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SingleImageUploader onChange={setImage} />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="add-division">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
