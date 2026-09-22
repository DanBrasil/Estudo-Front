import { jsTsFundamentalsTopics } from "./topics/jsTsFundamentals";
import { programmingLogicTopics } from "./topics/programmingLogic";
import { programmingParadigmsTopics } from "./topics/programmingParadigms";
import { reactCoreTopics } from "./topics/reactCore";
import { reactEcosystemTopics } from "./topics/reactEcosystem";
import type { Topic } from "@/types/catalog";

export { categories } from "./categories";

export const topics: Topic[] = [
  ...programmingLogicTopics,
  ...programmingParadigmsTopics,
  ...jsTsFundamentalsTopics,
  ...reactCoreTopics,
  ...reactEcosystemTopics,
];
