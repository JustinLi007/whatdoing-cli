import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query';
import SearchDropdown from '../../ui/SearchDropdown';
import { newDocClickHandler, toSuggestionItem } from '../../utils/ui';
import { useEffect, useState, type ChangeEvent } from 'react';
import { FetchAllAnime } from '../../api/anime';

export const Route = createLazyFileRoute('/data/')({
  component: Data,
})

function Data() {
  const navigate = useNavigate({
    from: "/data",
  });

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["content_list"],
    queryFn: async () => {
      const data = await FetchAllAnime();
      return data;
    },
  });

  const [searchDropdownHidden, setSearchDropdownHidden] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [selectedItemKey, setSelectedItemKey] = useState("");

  const handleDocClickSearch = newDocClickHandler("new-content-search-dropdown", setSearchDropdownHidden);

  useEffect(() => {
    document.addEventListener("click", handleDocClickSearch);
    return () => {
      document.removeEventListener("click", handleDocClickSearch);
    }
  }, [])

  function handleSearchClick() {
    setSearchDropdownHidden(false);
  }

  function handleSearchOnChange(event: ChangeEvent) {
    const t = event.target;
    if (!(t instanceof HTMLInputElement)) {
      return;
    }
    const val = t.value;

    setSearchValue(val);

    if (val.trim().length === 0) {
      setSearchDropdownHidden(true);
    } else {
      setSearchDropdownHidden(false);
    }
  }

  function handleSearchDropdownOnSelect(value: SuggestionItem) {
    const val = value.title;
    setSearchValue(val);
    setSearchDropdownHidden(true);
    setSelectedItemKey(value.key);
  }

  function handleBtnClick() {
    if (searchValue.trim() === "") {
      return;
    }

    if (data && selectedItemKey.trim() !== "") {
      let found = -1;
      for (let i = 0; i < data.anime_list.length; i++) {
        const cur = data.anime_list[i];
        if (cur.id === selectedItemKey) {
          found = i;
          break;
        }
      }
      const item = data.anime_list[found];
      navigate({
        to: `/edit/${item.id}`,
      })
    } else {
      navigate({
        to: `/edit/new`,
      })
    }
  }

  if (isPending) {
    return (
      <div>Loading...</div>
    );
  }
  if (isError) {
    return (
      <div>Something went wrong...{error.message}</div>
    );
  }
  return (
    <div className={`relative h-full flex flex-col flex-nowrap items-center place-content-center`}>
      <div>
        <p>Enter the name of the content you wish to update or add.</p>
      </div>
      <div>
        <SearchDropdown
          id={`new-content-search-dropdown`}
          searchValue={searchValue}
          dropdownHidden={searchDropdownHidden}
          dropdownItems={
            data.anime_list.map((value) => {
              return toSuggestionItem(value);
            }).filter((value) => {
              return value !== null;
            })
          }
          onChange={handleSearchOnChange}
          onClick={handleSearchClick}
          onSelect={handleSearchDropdownOnSelect}
        />
      </div>
      <div>
        <button
          className={`border-1 border-gray-500 mt-4 p-3 w-full active:bg-gray-500`}
          onClick={handleBtnClick}>Proceed</button>
      </div>
    </div >
  );
}
