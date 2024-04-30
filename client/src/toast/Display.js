import { Link } from "react-router-dom";

function Display() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="mt-6 mb-4  font-extrabold leading-none tracking-tight text-gray-900 md: lg:text-3xl dark:text-white text-center">
        Please Signin to view the Content.
      </h1>
      <p className="mb-6 text-sm font-normal text-gray-500 lg:text-base sm:px-8 xl:px-24 dark:text-gray-400 text-center">
        Keka is your people enabler. From automation of people processes to
        creating an engaged and driven culture, Keka is all you need to build a
        good to great company.
      </p>
      <Link
        to="/signup"
        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
      >
        Begin
        <svg
          className="w-3 h-3 ms-1 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </Link>
    </div>
  );
}
export default Display;
