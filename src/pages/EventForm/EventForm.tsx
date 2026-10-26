import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, LoaderCircle, RotateCcw, Save } from "lucide-react";

import TextInput from "@/components/shared/TextInput";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import SelectDropDown from "@/components/shared/SelectDropDown";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

import {
  eventSchema,
  type EventFormValues,
} from "../EventForm/helpers/zod/event";

import { useCreateEvent } from "../../hooks/useCreateEvent";
import { useFetchVenues } from "../../hooks/useFetchVenues";

const defaultValues: EventFormValues = {
  name: "",
  description: null,
  base_price: 0,
  from_date: "",
  to_date: "",
  from_time: "",
  to_time: "",
  location: "",
  venue: undefined,
  status: { label: "Active", value: "active" },
  contact_email: "",
  contact_mobile: "",
  category: undefined,
};

const EventForm = () => {
  const navigate = useNavigate();
  const mutation = useCreateEvent();

  const [venueSearch, setVenueSearch] = useState("");

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues,
  });

  const { venues, isVenuesLoading } = useFetchVenues({
    page: 1,
    perPage: 5,
    search: venueSearch,
  });

  const onSubmit = (data: EventFormValues) => {
    const { venue, category, status, ...eventData } = data;

    const payload = {
      ...eventData,
      venue_id: venue!.id,
      category: category!.value,
      status: status!.value,
    };

    mutation.mutate(payload, {
      onSuccess: () => navigate("/my-events"),
    });
  };

  const handleClear = () => {
    form.reset(defaultValues);
    setVenueSearch("");
  };

  return (
    <div className="scrollbar-thin overflow-y-auto space-y-6 px-4 py-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Create event</h1>
          <p className="text-sm text-muted-foreground">
            Enter the event details below.
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
          <h2 className="text-lg font-medium">Event information</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <TextInput
              control={form.control}
              name="name"
              label="Event name"
              placeholder="Enter event name"
            />
            <SelectDropDown
              control={form.control}
              name="venue"
              label="Venue"
              searchable
              options={venues}
              getLabel={(venue) => venue.name}
              getValue={(venue) => String(venue.id)}
              onSearch={setVenueSearch}
              searchPlaceholder="Search venues..."
              placeholder="Select a venue"
              isLoading={isVenuesLoading}
            />
            <TextInput
              control={form.control}
              name="location"
              label="Location"
              placeholder="Enter event location"
            />

            <TextInput
              control={form.control}
              name="base_price"
              label="Base price"
              type="number"
            />

            <SelectDropDown
              control={form.control}
              name="status"
              disabled
              label="Status"
              options={[
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
              ]}
              getLabel={(option) => option.label}
              getValue={(option) => option.value}
            />
            <TextInput
              control={form.control}
              name="contact_email"
              label="Contact email"
              type="email"
              placeholder="event@example.com"
            />

            <TextInput
              control={form.control}
              name="contact_mobile"
              label="Contact mobile"
              type="tel"
              placeholder="Enter mobile number"
            />

            <SelectDropDown
              control={form.control}
              name="category"
              label="Category"
              options={[
                { label: "Entertainment", value: "entertainment" },
                { label: "Education", value: "education" },
                { label: "Comedy Show", value: "comedy-show" },
                { label: "Music Concert", value: "music-concert" },
              ]}
              getLabel={(option) => option.label}
              getValue={(option) => option.value}
            />
          </div>

          <Field data-invalid={!!form.formState.errors.description}>
            <FieldLabel htmlFor="event-description">
              Description (optional)
            </FieldLabel>

            <Textarea
              id="event-description"
              placeholder="Describe the event"
              aria-invalid={!!form.formState.errors.description}
              {...form.register("description")}
            />

            {form.formState.errors.description && (
              <FieldError errors={[form.formState.errors.description]} />
            )}
          </Field>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-medium">Schedule</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <TextInput
              control={form.control}
              name="from_date"
              label="Start date"
              type="date"
            />

            <TextInput
              control={form.control}
              name="to_date"
              label="End date"
              type="date"
            />

            <TextInput
              control={form.control}
              name="from_time"
              label="Start time"
              type="time"
            />

            <TextInput
              control={form.control}
              name="to_time"
              label="End time"
              type="time"
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
                Creating event...
              </>
            ) : (
              <>
                <Save size={16} className="mr-2" />
                Create event
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
