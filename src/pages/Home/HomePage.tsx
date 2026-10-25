import EventCard from "./components/EventCard";
import { EventActions } from "./components/EventActions";

const mockEvents = [
  {
    name: "Tech Innovation Summit",
    description:
      "Explore emerging technologies, AI advancements, and innovative solutions shaping the future of software development.",
    location: "Chennai",
  },
  {
    name: "React Developers Meetup",
    description:
      "Connect with React developers, learn modern frontend patterns, and discuss performance optimization techniques.",
    location: "Coimbatore",
  },
];

const HomePage = () => {
  return (
    <div className="scrollbar-thin overflow-y-auto space-y-4 p-4">
      <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-3  ">
        {mockEvents.map((event) => {
          return (
            <EventCard
              name={event.name}
              description={event.description}
              location={event.location}
            />
          );
        })}
      </div>
      <EventActions />
    </div>
  );
};

export default HomePage;
