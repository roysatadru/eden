export function Logo() {
  return (
    <a
      href="/"
      className="flex items-center justify-between w-44 h-12 mx-auto hover:opacity-80 active:opacity-95 transition duration-300 focus:ring-2 focus:ring-primary focus:ring-offset-4 rounded-sm mouse-focus:ring-transparent mouse-focus:ring-0"
    >
      <svg
        className="block w-12 h-full flex-shrink-0 fill-primary"
        viewBox="7.712 9.43 27.784 27.42"
      >
        <path d="M7.711572 17.63005c0 13.2 4.3 19.1 13.9 19.2 2.7.1 5.2-.2 5.6-.5.3-.4-.6-1.9-2-3.5-2.6-2.8-2.8-3.5-4-10.9-1.1-6.5-4.6-10.4-10.7-11.9l-2.8-.6v8.2zm19 1.8c-1.1 1.1-2 2.9-2 4 0 3 2.7 7.8 5 9 1.6.8 2.2.6 3.4-1.2.8-1.3 1.8-3.9 2.1-6 .6-2.9.3-4-1.4-5.7-2.6-2.6-4.5-2.7-7.1-.1z" />
      </svg>
      <span className="font-bold align-middle text-[2.9rem] tracking-tighter">
        Eden
      </span>
    </a>
  );
}
