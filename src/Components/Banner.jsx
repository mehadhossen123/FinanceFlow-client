import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

const Banner = () => {
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 2500 }}
        loop={true}
        spaceBetween={30}
        slidesPerView={1}
      >
        {/* slider -1 */}
        <SwiperSlide>
          <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh]">
            <img
              src="https://i.pinimg.com/736x/12/f2/9c/12f29c9f9bec350e1014851f63d83abf.jpg"
              alt="Finance Banner 1"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start px-6 sm:px-10 md:px-24">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white drop-shadow-lg leading-snug sm:leading-tight">
                Track Every Expense,
                <br /> Build Smart Habits 💡
              </h2>
              <p className="text-gray-200 mt-4 text-base sm:text-lg md:text-xl max-w-full sm:max-w-lg md:max-w-xl">
                Stay on top of your spending and make better financial
                decisions.
              </p>
              <button className="mt-6 bg-amber-400 text-blue-800 font-semibold px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-amber-500 transition text-sm sm:text-base md:text-lg">
                Start Tracking
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* slider -2 */}
        <SwiperSlide>
          <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh]">
            <img
              src="https://i.pinimg.com/1200x/93/6d/8a/936d8a1a3674e7c5fa7e3d1c9cba035b.jpg"
              alt="Financial Banner"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start px-6 sm:px-10 md:px-24">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white leading-snug sm:leading-tight drop-shadow-lg">
                Manage Your Money,
                <br /> Secure Your Future 💰
              </h2>
              <p className="text-gray-200 mt-4 text-base sm:text-lg md:text-xl max-w-full sm:max-w-lg md:max-w-xl">
                Take control of your finances and build a smarter, brighter
                tomorrow.
              </p>
              <button className="mt-6 bg-amber-400 text-blue-800 font-semibold px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-amber-500 transition text-sm sm:text-base md:text-lg">
                Get Started
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* slider -3 */}
        <SwiperSlide>
          <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh]">
            <img
              src="https://i.pinimg.com/736x/e3/40/71/e34071c64be9ad7f68d979d32d918cde.jpg"
              alt="Financial Banner 3"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start px-6 sm:px-10 md:px-24">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white drop-shadow-lg leading-snug sm:leading-tight">
                Plan Today, Prosper Tomorrow 🌟
              </h2>
              <p className="text-gray-200 mt-4 text-base sm:text-lg md:text-xl max-w-full sm:max-w-lg md:max-w-xl">
                Set goals, budget wisely, and achieve long-term financial
                success.
              </p>
              <button className="mt-6 bg-amber-400 text-blue-800 font-semibold px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-amber-500 transition text-sm sm:text-base md:text-lg">
                Plan Now
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
