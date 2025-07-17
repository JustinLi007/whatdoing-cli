import { createLazyFileRoute } from '@tanstack/react-router'
import Option from '../../ui/Option';
import { useState, type MouseEvent } from 'react';

export const Route = createLazyFileRoute('/data/')({
  component: Data,
})

function Data() {
  const [content_kind, setContentKind] = useState<ContentKinds>("anime");

  function handleAnimeOnClick(_: MouseEvent) {
    setContentKind("anime");
  }

  function handleMangaOnClick(_: MouseEvent) {
    setContentKind("manga");
  }

  function getOptions(content_kind: ContentKinds) {
    switch (content_kind) {
      case "anime":
        return (
          <>
            <Option text="New Anime Entry" to="/edit/new/anime" />
            <Option text="Edit Existing Anime" to="/data/anime" />
          </>
        );
      case "manga":
        return (
          <>
            <Option text="Manga (not supported yet)" to="/data" />
          </>
        );
    }
  }

  return (
    <div className={`flex flex-col flex-nowrap gap-4 p-4`}>
      <div className={`text-center font-bold text-lg`}>Data</div>

      <div className={`flex flex-col flex-nowrap gap-1.5`}>
        <div className={`text-center font-bold`}>Content Type</div>
        <div>
          <button
            className={`border-1 border-gray-500 p-3 w-full active:bg-gray-500`}
            onClick={handleAnimeOnClick}
          >Anime</button>
        </div>
        <div>
          <button
            className={`border-1 border-gray-500 p-3 w-full active:bg-gray-500`}
            onClick={handleMangaOnClick}
          >Manga</button>
        </div>
      </div>

      <div className={`flex flex-col flex-nowrap gap-1.5`}>
        <div className={`text-center font-bold`}>Options</div>
        {getOptions(content_kind)}
      </div>
    </div>
  );
}
