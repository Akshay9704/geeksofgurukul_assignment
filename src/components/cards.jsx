import { cn } from "../utils/cn";
import React, { useEffect, useRef, useState } from "react";
import Data from "../data/teamData";
import CardDetails from "./cardDetails";

const Cards = ({
  items,
  direction = "left",
  speed = "50s",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty("--animation-duration", "40s");
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20  max-w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {Data.map((item) => (
          <li
            key={item.id}
            className="w-72 relative"
            onMouseEnter={() => setHoveredCard(item.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-[350px] max-w-full h-4/5 relative rounded-2xl border-2 border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px]"
            />
            <div
              className="w-[320px] z-20 -mt-20 max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px]"
              style={{
                background: "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
              }}
            >
              <blockquote>
                <div
                  aria-hidden="true"
                  className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                ></div>
                <span className="text-xl leading-[1.6] text-gray-100 font-bold">
                  {item.name}
                </span>
                <div className="mt-1 flex flex-row items-center">
                  <span className="flex flex-col gap-1">
                    <span className="text-lg leading-[1.6] text-green-500 font-bold">
                      {item.role}
                    </span>
                    <span className="text-md mt-5 leading-[1.6] text-gray-400 font-normal">
                      {item.qualification}
                    </span>
                  </span>
                </div>
              </blockquote>
            </div>
            {hoveredCard === item.id && (
              <div className="card-details animate-slide-up rounded-2xl border-2 border-slate-500 bg-black z-30 absolute top-0 left-0 w-full h-full pointer-events-none">
                <CardDetails />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cards;
