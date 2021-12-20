import { SaleorProvider } from "@saleor/sdk";
import React, { useEffect } from "react";

import { saleorClient } from "@/lib/graphql";

import useRegions from "../RegionsProvider/useChannels";

const SaleorProviderWithChannels: React.FC = ({ children }) => {
  const { currentChannel } = useRegions();

  const {
    config: { setChannel },
  } = saleorClient;

  useEffect(() => {
    setChannel(currentChannel.slug);
  }, [currentChannel, setChannel]);

  return <SaleorProvider client={saleorClient}>{children}</SaleorProvider>;
};

export default SaleorProviderWithChannels;
