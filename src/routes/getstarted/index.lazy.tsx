import { createLazyFileRoute } from '@tanstack/react-router'
import Option from "../../ui/Option";
import Refresher from '../../ui/Refresher';

export const Route = createLazyFileRoute('/getstarted/')({
  component: Index,
})

function Index() {
  return (
    <div className="flex flex-col flex-nowrap items-center gap-4">
      <div>
        <p>Some description...</p>
        <p>Some description...</p>
        <p>Some description...</p>
        <p>Some description...</p>
      </div>
      <div>
        <Option text="Get Started" to="/login" />
      </div>
      <Refresher />
    </div>
  );
}
