import { useContext } from "react";

import { RegionsConsumerProps, RegionsContext } from "./RegionsProvider";

const useRegions = (): RegionsConsumerProps => {
  return useContext(RegionsContext);
};

export default useRegions;
