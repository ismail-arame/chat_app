import { userType } from "@/types/userType";
import Contact from "./Contact";

type Props = {
  searchResults: userType[];
  isTablet: boolean;
};

export default function SearchResults({ searchResults, isTablet }: Props) {
  console.log("search: ", searchResults);
  return (
    <div className="convos scrollbar w-full">
      <div>
        {/* Heading */}
        <div className="flex flex-col px-8 pt-8">
          <h1
            className={`font-light text-green_2 ${
              isTablet ? "text-base" : "text-lg"
            }`}
          >
            Contacts
          </h1>
          <span className="ml-10 mt-4 w-full border-b dark:border-b-dark_border_1"></span>
        </div>
        {/* Results */}
        <ul>
          {searchResults &&
            searchResults.length > 0 &&
            searchResults.map((user: userType) => (
              <Contact contact={user} isTablet={isTablet} key={user._id} />
            ))}
        </ul>
      </div>
    </div>
  );
}
