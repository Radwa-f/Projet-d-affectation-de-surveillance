"use client";
import React from "react";
import dynamic from "next/dynamic";

const AnimatedNumbers = dynamic(
  () => import("react-animated-numbers"),
  { ssr: false }
);

interface Achievement {
  prefix: string | number;
  value: string;
  postfix: string;
  metric: string;
}

interface NumberAnimationProps {
  achievementsList: Achievement[];
}

const NumberAnimation: React.FC<NumberAnimationProps> = ({ achievementsList }) => {
  return (
    <div className="py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
      <div>
        {achievementsList.map((achievement, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center mx-4 my-4 sm:my-0"
          >
            <h2 className="text-black  dark:text-white text-4xl font-bold flex flex-row">
              {achievement.prefix}
              <AnimatedNumbers
                includeComma
                animateToNumber={parseInt(achievement.value)}
                locale="en-US"
                className="text-blue-700 text-4xl font-bold"
                // Adjust transitions as needed based on component props
                transitions={(index) => ({
                  type: "spring",
                  duration: index + 0.3,
                })}
              />
              {achievement.postfix}
            </h2>
            <p className="text-black dark:text-white text-base">{achievement.metric}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NumberAnimation;
