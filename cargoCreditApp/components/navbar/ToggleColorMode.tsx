import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';
// import { useTheme } from 'next-themes';

const ToggleColorMode = () => {
  // const { theme, setTheme } = useTheme()
  const theme = "dark"

  // Handle Hydration mismatch
  const [loaded, setLoaded] = useState(false)
  useEffect(() => setLoaded(true), [])

  if (!loaded) return null

  return (
    <div className="flex flex-0 color-snow hover:scale-110 transition ease-in-out duration-500">
      <button
        className="
        aspect-1
            dark:bg-gray-800 bg-white
            dark:hover:bg-gray-700 hover:bg-gray-100
            dark:border-gray-600 border-gray-300  
            rounded-full focus:outline-0 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 border p-2"
        // onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        {theme !== 'light' ? (
          <MoonIcon className=" text-gray-500 fill-ccDarkText" />
        ) : (
          <SunIcon className=" text-snow fill-ccDarkText" />
        )}
      </button>
    </div>
  )
}

export default ToggleColorMode
