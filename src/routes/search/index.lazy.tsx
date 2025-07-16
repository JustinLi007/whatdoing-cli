import { createLazyFileRoute } from '@tanstack/react-router'
import Option from '../../ui/Option'

export const Route = createLazyFileRoute('/search/')({
  component: SearchPage,
})

function SearchPage() {
  return (
    <div className={`flex flex-col flex-nowrap gap-1 p-4`}>
      <Option text={`Anime`} to={`/search/anime`} />
      <Option text={`Manga (not implemented)`} to={`/search/anime`} />
    </div>
  );
}
