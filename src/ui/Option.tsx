import { Link } from "@tanstack/react-router";

type Parameters = {
  text: string;
  to: string;
}

export default function Option(params: Parameters) {
  return (
    <div className={`border border-gray-500`}>
      <Link
        className={`inline-block w-full p-2 hover:bg-gray-500 active:bg-gray-700`}
        to={params.to}
      >{params.text}</Link>
    </div>
  );
}
