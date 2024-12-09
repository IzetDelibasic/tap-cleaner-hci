// -React-
import { Link } from "react-router-dom";
// -Components-
import { CustomButton } from "../../components";
// -Constants-
import {
  landingImage,
  heroImage,
  trashIcon,
} from "../../constants/imageConstant";
import { featuresConstant } from "../../constants/featuresConstant";

const Landing = () => {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <img src={trashIcon} alt="Trash Icon" className="w-6 h-6 mr-2" />
        <span className="text-xl font-bold font-subtitle cursor-default">
          Tap Cleaner
        </span>
        <nav className="ml-auto gap-4 sm:gap-6 hidden sm:flex">
          <Link
            to="/login"
            className="font-cabin hover:text-emerald-600 duration-300 ease-in-out"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="font-cabin hover:text-emerald-600 duration-300 ease-in-out"
          >
            Register
          </Link>
        </nav>
      </header>
      <main className="">
        <section className="py-6 md:py-12 lg:py-18">
          <div className="flex flex-col lg:flex-row items-center justify-center px-4 md:px-6 sm:w-[90%] mx-auto">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-3xl sm:text-5xl font-title text-center">
                Tap Cleaner - Održavanje javne čistoće
              </h1>
              <p className="md:text-[1.2rem] lg:w-[80%] text-center font-montserrat py-4">
                Aplikacija Tap Cleaner pomaže u održavanju javne čistoće i
                stanja kontejnera u gradu. Prijavite probleme, pratite status i
                doprinosite boljoj kvaliteti života.
              </p>
            </div>
            <img
              src={heroImage}
              alt="Tap Cleaner"
              className="mx-auto overflow-hidden rounded-xl lg:w-[50%] sm:w-[60%]"
            />
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100"
        >
          <div className="px-4 font-montserrat text-center">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold sm:text-5xl">
                  Glavne karakteristike
                </h2>
                <p className="">
                  Tap Cleaner aplikacija nudi niz korisnih opcija za
                  prijavljivanje problema, praćenje statusa i unapređenje javne
                  čistoće.
                </p>
              </div>
            </div>
            <div className="mx-auto flex flex-col md:flex-row-reverse mt-10">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="flex flex-col md:w-[70%] mx-auto">
                  {featuresConstant.map((feature, index) => (
                    <li key={index}>
                      <div className="flex flex-col">
                        <h3 className="text-xl font-bold">{feature.title}</h3>
                        <p className="pb-2">{feature.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <img
                src={landingImage}
                alt="Tap Cleaner"
                className="mx-auto rounded-xl lg:w-[35%] sm:w-[45%] my-auto"
              />
            </div>
          </div>
        </section>
        <section id="register" className="bg-emerald-600 text-white py-16">
          <div className="container flex flex-col items-center mx-auto px-6 md:px-12 lg:px-24 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-montserrat">
              Spremni ste za transformaciju javne čistoće?
            </h2>
            <p className="text-lg md:text-xl mb-12 font-montserrat">
              Pridružite se gradovima koji već koriste inovativna rješenja
              TapCleanera.
            </p>
            <div>
              <Link to="/register">
                <CustomButton
                  className="relative bg-emerald-300 text-white font-medium py-[1rem] lg:px-[2.5rem] px-[2.5rem] md:px-[1.5rem] mr-0 mb-[20px] sm:mb-0 rounded-[3rem] group overflow-hidden z-[1] text-nowrap"
                  iconClassName="group-hover:text-white ml-[10px]"
                  title="Clean on Tap"
                  titleClassName="group-hover:text-white font-subtitle"
                >
                  <div className="absolute inset-0 bg-black w-full transform origin-right transition-transform duration-300 group-hover:scale-x-0 z-[-1]"></div>
                </CustomButton>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-6 w-full items-center px-4 md:px-6 border-t">
        <p className="text-xs font-montserrat">
          &copy; 2024 Tap Cleaner. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Landing;
