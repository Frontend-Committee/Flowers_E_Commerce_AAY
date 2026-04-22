import { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  HeartIcon,
  ShoppingCartIcon,
  BellIcon,
  UserIcon,
  MapPinIcon,
  HomeIcon,
  GiftIcon,
  Squares2X2Icon,
  SparklesIcon,
  PhoneIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import Logo from "../../assets/logos/Logo.png";
import { PersonStandingIcon } from "lucide-react";

export default function Navbar() {
  const [city, setCity] = useState("Detecting...");
  const [user, setUser] = useState(null); // mock auth

  useEffect(() => {
    if (!navigator.geolocation) {
      setCity("Location unavailable");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();

          const detectedCity =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            "Unknown";

          setCity(detectedCity);
        } catch (err) {
          setCity("Unknown");
        }
      },
      () => setCity("Permission denied")
    );
  }, []);

  return (
    <div className="w-full shadow-sm">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-white">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={Logo} alt="Rose Logo" className="h-20 object-contain" />
          <div className="flex items-center gap-2 px-6 py-2 bg-white text-sm">

          <MapPinIcon className="w-5 h-5 text-rose-900" />
          <div className="flex flex-col">
          <span className="font-medium">Deliver to:</span>
          <span className="text-rose-900">{city}</span>
        </div>
      </div>
        </div>

        {/* Search */}
        <div className="flex items-center w-300 border rounded-md px-4 py-2 bg-gray-50">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="What awesome gift are you looking for?"
            className="w-full ml-2 bg-transparent outline-none"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <span className="flex items-center gap-1 text-sm">
              <UserIcon className="w-6 h-6 cursor-pointer" />
              Hello, {user.name}
            </span>
          ) : (
            <button className="flex items-center gap-1 text-sm">
              <UserIcon className="w-5 h-5" />
              Login
            </button>
          )}

          <HeartIcon className="w-6 h-6 cursor-pointer" />
          <ShoppingCartIcon className="w-6 h-6 cursor-pointer" />
          <BellIcon className="w-6 h-6 cursor-pointer" />
        </div>
      </div>


      {/* Navigation Menu */}
      <div className="bg-rose-900 text-white px-6 py-3 flex justify-center gap-6 text-sm font-medium">
        <a href="#" className="flex items-center gap-2 hover:underline">
            <HomeIcon className="w-5 h-5"/>
            Home
        </a>

        <a href="#" className="flex items-center gap-2 hover:underline">
            <GiftIcon className="w-5 h-5"/>
            Products
        </a>        
        
        <a href="#" className="flex items-center gap-2 hover:underline">
            <Squares2X2Icon className="w-5 h-5"/>
            Catigories
        </a>    

        <a href="#" className="flex items-center gap-2 hover:underline">
            <SparklesIcon className="w-5 h-5"/>
            Occasions
        </a>

        <a href="#" className="flex items-center gap-2 hover:underline">
            <PhoneIcon className="w-5 h-5"/>
            Contact
        </a>

        <a href="#" className="flex items-center gap-2 hover:underline">
            <InformationCircleIcon className="w-5 h-5"/>
            About
        </a>
      </div>
    </div>
  );
}