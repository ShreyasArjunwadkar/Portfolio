import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

export default function ThreeDCardDemo({
  sectionName = "",
  title = "Make things float in air",
  description = "Hover over this card to unleash the power of CSS perspective",
  image = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  primaryLabel = "Sign up",
  primaryAction = null,
  link = "",
  className = "",
}) {
  return (
    <CardContainer className={`inter-var ${className}`}>
      <CardBody
        className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-4 border">
        <CardItem
          translateZ={50}
          className="text-lg font-bold text-neutral-600 dark:text-white">
          {title}
        </CardItem>
        <CardItem
          as="p"
          translateZ={60}
          className="text-neutral-500 text-xs max-w-sm mt-1 dark:text-neutral-300">
          {description}
        </CardItem>
        <CardItem translateZ={100} className="w-full mt-3">
          <img
            src={image}
            height="1000"
            width="1000"
            className="h-32 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-6">
          <CardItem
            translateZ={20}
            as="a"
            href={link || "#"}
            target="__blank"
            className="px-3 py-1 rounded-xl text-xs font-normal dark:text-white">
            Try now →
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            onClick={() => {
              if (typeof primaryAction === "function") primaryAction(sectionName);
            }}
            className="px-3 py-1 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold">
            {primaryLabel}
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
