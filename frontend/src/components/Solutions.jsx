import React from "react";

const Solutions = () => {
  return (
    <section className="bg-[#E6F4EA] py-16 px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-green-900">OUR SOLUTIONS</h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mt-4">
          We offer a range of solutions to empower the world's leading food distributors to avoid good food from going to waste.
        </p>
      </div>

      {/* Solution Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {/** Solution Item **/}
        <div className="bg-green-900 text-white rounded-2xl p-6 text-center flex flex-col items-center">
          <h3 className="text-xl md:text-2xl font-bold">SURPRISE BAGS</h3>
          <img src="src/assets/icons/first.png" alt="Surprise Bags" className="w-16 h-16 md:w-20 md:h-20 my-4" />
          <p className="text-base md:text-lg">Unlock revenue from surplus food.</p>
        </div>

        <div className="bg-green-900 text-white rounded-2xl p-6 text-center flex flex-col items-center">
          <h3 className="text-xl md:text-2xl font-bold">COMMUNITY AWARENESS</h3>
          <img src="src/assets/icons/second.png" alt="Community Awareness" className="w-16 h-16 md:w-20 md:h-20 my-4" />
          <p className="text-base md:text-lg">
            Educate communities on food waste and engage volunteers in food rescue initiatives.
          </p>
        </div>

        <div className="bg-green-900 text-white rounded-2xl p-6 text-center flex flex-col items-center">
          <h3 className="text-xl md:text-2xl font-bold">COLLABORATIONS & SOCIAL IMPACT</h3>
          <img src="src/assets/icons/third.png" alt="Collaborations" className="w-16 h-16 md:w-20 md:h-20 my-4" />
          <p className="text-base md:text-lg">
            Build strategic partnerships with businesses and NGOs to enhance food distribution.
          </p>
        </div>

        <div className="bg-green-900 text-white rounded-2xl p-6 text-center flex flex-col items-center">
          <h3 className="text-xl md:text-2xl font-bold">SMART FOOD LOGISTICS</h3>
          <img src="src/assets/icons/forth.png" alt="Smart Food Logistics" className="w-16 h-16 md:w-20 md:h-20 my-4" />
          <p className="text-base md:text-lg">
            Efficiently collect and deliver surplus food to minimize waste.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
