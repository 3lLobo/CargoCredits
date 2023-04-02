# CargoCredits

Incentive token for green-transport and carbon-offset.

## Roadmap

The project can be divided in two tracqs.
One implements the CargoCredit as ERC20 token on OP, this includes designing the logo 🎨

The second part focuses on the frontend. Optimally we deliver a demo workflow for a user logging in, the GoogleMaps API fetching the travel history and sending it a express bacqend, where our payMaster wallet distributed the tokens. If we have time we can implement a smart contract to do this instead of an bacqend server.

## Tech-Stacq

- Blockchain ([Optimism(https://www.optimism.io/)]) [ERC20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) Cargo Credit token deployment.
  - Carbon neutral blockchain.
- Storing data on IPFS
  - indexes files via CID (hash) therefore avoids duplicates, saves storage and the planet 🌳
- [Alchemy](https://dashboard.alchemy.com/) API to query users token balance and history.
- GoogleMaps API to access users travel history (transportation mode + distance / month).
- [Chooose](https://www.chooose.today/) API to calculate the carbon offset (saved carbon emission).
- MongoDB to store anonymized user-chashout data, no personal data, only a hash to avoid users getting rewarded twice.
- Mongo Realm for oAuth with Google.
- NextJs for the WebApp, ReactNative for Android/iOS-App and NestJs for the backend.

- AMADEUS will implement a CargoCredit API which predicts which parts of your journey you can travel by green transport and how many Cargo Credits you will get rewarded for it 🎉

TEAM smartGirlzGreanEarth LFG🚀🚀🚀

![ccBannerHq](https://user-images.githubusercontent.com/25290565/195901960-80604c1c-61fd-420b-818a-c8502fde8325.jpg)
