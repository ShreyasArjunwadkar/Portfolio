import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

export default function ThreeDCardDemo({
  sectionName = "",
  title = "Card Title",
  description = "Card description",
  primaryLabel = "Open",
  primaryAction = null,
}) {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-cyan-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[250px] h-auto rounded-xl p-6 border">
        <CardItem
          translateZ={50}
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {title}
        </CardItem>
        <CardItem
          as="p"
          translateZ={60}
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {description}
        </CardItem>
        
        <div className="flex justify-center items-center mt-8">
          <CardItem
            translateZ={20}
            as="button"
            onClick={() => {
              if (typeof primaryAction === "function") primaryAction(sectionName);
            }}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-sm font-bold transition-colors"
          >
            {primaryLabel}
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}