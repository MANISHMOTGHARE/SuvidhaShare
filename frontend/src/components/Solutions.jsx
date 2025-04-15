import React from "react";

const Solutions = () => {
  return (
    <section className="bg-[#E6F4EA] py-20 px-6">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-green-900">
          OUR SOLUTIONS
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mt-4">
          We offer a range of solutions to empower the world's leading food
          distributors to avoid good food from going to waste.
        </p>
      </div>

      {/* Responsive Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {/* Surprise Bags */}
        <div className="bg-green-900 text-white rounded-2xl p-6 md:p-8 text-center">
          <h3 className="text-2xl font-bold">SURPRISE BAGS</h3>
          <img
            src="src/assets/icons/first.png"
            alt="Surprise Bags"
            className="mx-auto w-16 md:w-20 h-16 md:h-20 mb-4"
          />
          <p className="text-base md:text-lg mt-2">
            Give surplus food a second chance — one Surprise Bag at a time.
          </p>
        </div>

        {/* Community Awareness */}
        <div className="bg-green-900 text-white rounded-2xl p-6 md:p-8 text-center">
          <h3 className="text-2xl font-bold">COMMUNITY AWARENESS</h3>
          <img
            src="src/assets/icons/second.png"
            alt="Community Awareness"
            className="mx-auto w-16 md:w-20 h-16 md:h-20 mb-4"
          />
          <p className="text-base md:text-lg mt-2">
            Educate communities on food waste and engage volunteers in food
            rescue initiatives.
          </p>
        </div>

        {/* Collaborations & Social Impact */}
        <div className="bg-green-900 text-white rounded-2xl p-6 md:p-8 text-center">
          <h3 className="text-2xl font-bold">COLLABORATIONS & SOCIAL IMPACT</h3>
          <img
            src="src/assets/icons/third.png"
            alt="Collaborations"
            className="mx-auto w-16 md:w-20 h-16 md:h-20 mb-4"
          />
          <p className="text-base md:text-lg mt-2">
            Build strategic partnerships with businesses and NGOs to enhance
            food distribution.
          </p>
        </div>

        {/* Smart Food Logistics */}
        <div className="bg-green-900 text-white rounded-2xl p-6 md:p-8 text-center">
          <h3 className="text-2xl font-bold">SMART FOOD LOGISTICS</h3>
          <img
            src="src/assets/icons/forth.png"
            alt="Smart Food Logistics"
            className="mx-auto w-16 md:w-20 h-16 md:h-20 mb-4"
          />
          <p className="text-base md:text-lg mt-2">
            Efficiently collect and deliver surplus food to minimize waste.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
