"use client";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoDiamond } from "react-icons/io5";
import { useDiamond } from "./DiamondContext";
import Link from "next/link";
import { getSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

// Type definition for user details
type UserDetails = {
  user: {
    image: string;
    name: string;
  };
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const { diamondCount } = useDiamond();

  // Fetch user details when the component mounts
  useEffect(() => {
    getLoggedUserDetails();
  }, []);

  const getLoggedUserDetails = async () => {
    const details = await getSession();  // Fetch user session details
    setUserDetails(details as UserDetails | null); // Update state with user details
  };

  const loginWithGoogle = () => {
    signIn("google"); // Trigger Google login via NextAuth
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/" }); // Logout and redirect to home
  };

  return (
    <nav className="sticky bg-gray-900 top-0 px-6 py-4 text-white shadow-md z-10">
      <div className="flex items-center justify-between">
        {/* Left: Brand */}
        <div className="text-2xl font-bold">RAWG Games</div>

        {/* Hamburger Menu for Mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-2xl"
        >
          <FaBars />
        </button>

        {/* Right: Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:text-yellow-400 transition">
                Games
              </Link>
            </li>
            <li>
              <Link href="/stores" className="hover:text-yellow-400 transition">
                Stores
              </Link>
            </li>
            <li>
              <Link href="/creators" className="hover:text-yellow-400 transition">
                Creators
              </Link>
            </li>
          </ul>

          <div className="relative">
            <IoDiamond className="text-2xl cursor-pointer hover:text-yellow-400 transition" />
            {diamondCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {diamondCount}
              </span>
            )}
          </div>

          {/* User Details or Login Button */}
          {userDetails ? (
            <div className="flex items-center space-x-4">
            <Image
              src={userDetails.user.image}
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
              width={32} // Specify width in pixels
              height={32} // Specify height in pixels
            />
            <span className="text-sm">{userDetails.user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
            >
              Logout
            </button>
          </div>
          ) : (
            <button
              onClick={loginWithGoogle}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="mt-4 md:hidden">
          <Link href="/" className="hover:text-yellow-400 transition">
            Games
          </Link>
          <Link href="/stores" className="hover:text-yellow-400 transition">
            Stores
          </Link>
          <Link href="/creators" className="hover:text-yellow-400 transition">
            Creators
          </Link>
          <div className="flex justify-center mt-4">
            {userDetails ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={loginWithGoogle}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
