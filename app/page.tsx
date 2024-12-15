import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className=" bg-white flex flex-col py-16 justify-center px-4 lg:px-8">
        <section className="text-center lg:text-left bg-white flex sm:flex-row flex-col-reverse justify-between items-center gap-16">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Find Your Dream</span>{" "}
              <span className="block text-blue-600 xl:inline">Career</span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl md:text-xl">
              Discover exciting job opportunities across various industries.
              Your next career move starts here.
            </p>

            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <Link
                href="/jobs"
                className="w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
              >
                Browse Jobs
              </Link>
              <Link
                href="/favorites"
                className="mt-3 sm:mt-0 sm:ml-3 w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
              >
                Saved Jobs
              </Link>
            </div>
          </div>
          <div>
            <Image
              src="/home.jpeg"
              alt="home"
              height={600}
              width={600}
              className="rounded-md"
            />
          </div>
        </section>
      </main>
    </>
  );
}
