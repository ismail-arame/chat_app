import Contact from "./Contact";

type Props = {
  searchResults: any;
};

export default function SearchResults({ searchResults }: Props) {
  return (
    <div className="convos scrollbar w-full">
      <div>
        {/* Heading */}
        <div className="flex flex-col px-8 pt-8">
          <h1 className="text-lg font-light text-green_2">Contacts</h1>
          <span className="ml-10 mt-4 w-full border-b dark:border-b-dark_border_1"></span>
        </div>
        {/* Results */}
        <ul>
          {searchResults &&
            searchResults.length > 0 &&
            searchResults.map((user: any) => (
              <Contact contact={user} key={user._id} />
            ))}
        </ul>
      </div>
    </div>
  );
}
