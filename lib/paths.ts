import useRegions from "@/components/RegionsProvider/useChannels";
import { pagesPath } from "@/lib/$path";

export const usePaths = () => {
  const { currentChannel, currentLocale: locale } = useRegions();
  return { paths: pagesPath._channel(currentChannel.slug)._locale(locale) };
};
