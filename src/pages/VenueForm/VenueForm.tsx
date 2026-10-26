import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, LoaderCircle, RotateCcw, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import TextInput from "@/components/shared/TextInput";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  venueSchema,
  type VenueFormValues,
} from "../VenueForm/helpers/zod/venue";
import { useCreateVenue } from "../../hooks/useCreateVenue";

const VenueForm = () => {
  const navigate = useNavigate();
  const mutation = useCreateVenue();

  const form = useForm<VenueFormValues>({
    resolver: zodResolver(venueSchema),
    defaultValues: {
      name: "",
      description: "",
      rows: 1,
      columns: 1,
      capacity: 1,
      contact_email: "",
      contact_mobile: "",
      status: "active",
    },
  });

  const onSubmit = (data: VenueFormValues) => {
    mutation.mutate(data, {
      onSuccess: () => navigate("/my-venues"),
    });
  };

  const handleClear = () => {
    form.reset();
    mutation.reset();
  };

  return (
    <div className="space-y-6 px-4 py-2  overflow-y-auto scrollbar-thin">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Create venue</h1>
          <p className="text-sm text-muted-foreground">
            Enter the venue details below.
          </p>
        </div>

        <Button type="button" variant="outline" onClick={() => navigate("/")}>
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Button>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="space-y-6"
      >
        <section className="space-y-4">
          <h2 className="text-lg font-medium">Basic information</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <TextInput
              control={form.control}
              name="name"
              label="Venue name"
              placeholder="Enter venue name"
            />

            <TextInput
              control={form.control}
              name="contact_email"
              label="Contact email"
              type="email"
              placeholder="venue@example.com"
            />

            <TextInput
              control={form.control}
              name="contact_mobile"
              label="Contact mobile"
              type="tel"
              placeholder="Enter mobile number"
            />

            <Field data-invalid={!!form.formState.errors.status}>
              <FieldLabel htmlFor="venue-status">Status</FieldLabel>

              <Select
                value={form.watch("status")}
                readOnly
                onValueChange={(value) =>
                  form.setValue("status", value as VenueFormValues["status"], {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
              >
                <SelectTrigger
                  id="venue-status"
                  aria-invalid={!!form.formState.errors.status}
                >
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              {form.formState.errors.status && (
                <FieldError errors={[form.formState.errors.status]} />
              )}
            </Field>
          </div>

          <TextInput
            control={form.control}
            name="description"
            label="Description (optional)"
            placeholder="Describe the venue"
          />
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-medium">Seating configuration</h2>

          <div className="grid gap-4 sm:grid-cols-3">
            <TextInput
              control={form.control}
              name="rows"
              label="Rows"
              type="number"
            />

            <TextInput
              control={form.control}
              name="columns"
              label="Columns"
              type="number"
            />

            <TextInput
              control={form.control}
              name="capacity"
              label="Capacity"
              type="number"
            />
          </div>
        </section>

        <div className="h-px bg-border" />

        <div className="flex flex-wrap justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleClear}
            disabled={mutation.isPending}
          >
            <RotateCcw size={16} className="mr-2" />
            Clear all
          </Button>

          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? (
              <>
                <LoaderCircle size={16} className="mr-2 animate-spin" />
                Creating venue...
              </>
            ) : (
              <>
                <Save size={16} className="mr-2" />
                Create venue
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default VenueForm;
