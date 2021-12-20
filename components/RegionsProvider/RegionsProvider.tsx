import { useRouter } from "next/router";
import React, { createContext, useState } from "react";

import apolloClient from "@/lib/graphql";
import {
  Channel,
  CHANNELS,
  DEFAULT_CHANNEL,
  DEFAULT_LOCALE,
  localeToEnum,
} from "@/lib/regions";
import { LanguageCodeEnum } from "@/saleor/api";

export interface RegionsConsumerProps {
  channels: Channel[];
  defaultChannel: Channel;
  currentChannel: Channel;
  currentLocale: string;
  query: {
    channel: string;
    locale: LanguageCodeEnum;
  };
  setCurrentChannel: (slug: string) => void;
}

export const RegionsContext = createContext<RegionsConsumerProps>({
  channels: CHANNELS,
  defaultChannel: DEFAULT_CHANNEL,
  currentChannel: DEFAULT_CHANNEL,
  currentLocale: DEFAULT_LOCALE,
  query: {
    channel: DEFAULT_CHANNEL.slug,
    locale: localeToEnum(DEFAULT_LOCALE),
  },
  setCurrentChannel: () => {},
});

const RegionsProvider: React.FC = ({ children }) => {
  const router = useRouter();

  const [currentChannelSlug, setCurrentChannelSlug] = useState(
    router.query.channel
  );

  const setCurrentChannel = (channel: string) => {
    // todo: changing the channel should also clear the cart
    setCurrentChannelSlug(channel);
    apolloClient.clearStore();
  };

  const locale = router.query.locale?.toString() || DEFAULT_LOCALE;

  const currentChannel =
    CHANNELS.find(({ slug }) => slug === currentChannelSlug) || DEFAULT_CHANNEL;

  const providerValues: RegionsConsumerProps = {
    channels: CHANNELS,
    defaultChannel: DEFAULT_CHANNEL,
    currentChannel,
    setCurrentChannel: setCurrentChannel,
    currentLocale: locale,
    query: {
      channel: currentChannel.slug,
      locale: localeToEnum(locale),
    },
  };

  return (
    <RegionsContext.Provider value={providerValues}>
      {children}
    </RegionsContext.Provider>
  );
};

export default RegionsProvider;
