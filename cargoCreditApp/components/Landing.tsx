import Image from "next/image"


function Landing() {

  const css = { maxWidth: '100%', height: 'auto' }
  return (
    <div
      className="flex flex-col justify-center align-middle text-white font-light text-center h-full gap-y-11 text-3xl"
    >
      <div
        className="h-40 relative">
        <Image
          src={'/Cargo-Credit-FONT.png'}
          alt='bannerCargo'
          // css={css}
          fill
        />
      </div>
      <p>
        CONNECT YOUR WALLET AND START SAVING THE PLANET
      </p>
    </div>
  )
}

export default Landing