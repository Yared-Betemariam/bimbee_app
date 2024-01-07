const Spinner = () => (
  <svg
    className="animate-spin -ml-1 mr-3 h-6 w-6 text-black"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.002 8.002 0 0112 4.472V0C6.477 0 2 4.477 2 10h4zm2 7.238A8.003 8.003 0 014.472 12H0c0 5.523 4.477 10 10 10v-4zm7.238 2A8.003 8.003 0 0112 19.528V24c5.523 0 10-4.477 10-10h-4z"
    ></path>
  </svg>
);

export default Spinner;
