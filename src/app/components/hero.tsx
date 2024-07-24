export default function Hero() {
  return (
    <div className="bg-transparent">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Accelerative Media
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-400">
              Creating top class websites tailored around you and your needs.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-gray-300 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get in Touch
              </a>
              <a
                href="#"
                className="text-sm font-semibold leading-6 text-gray-400 border border-gray-500 rounded-md px-4 py-2 hover:bg-white hover:text-black transition"
              >
                See Portfolio <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
