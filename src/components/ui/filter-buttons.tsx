"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Button } from "./button";

interface FilterButtonsProps {
    items: string[];
    onChange: (value: string) => void;
    defaultValue?: string;
}

export function FilterButtons({ items, onChange, defaultValue }: FilterButtonsProps) {
    const [activeIndex, setActiveIndex] = useState(defaultValue ? items.indexOf(defaultValue) : 0);
    const [buttonDimensions, setButtonDimensions] = useState({ width: 0, height: 0, left: 0 });
    const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => {
        if (buttonsRef.current[activeIndex]) {
            const button = buttonsRef.current[activeIndex];
            const rect = button.getBoundingClientRect();
            const containerRect = button.parentElement?.getBoundingClientRect();

            if (containerRect) {
                setButtonDimensions({
                    width: rect.width,
                    height: rect.height,
                    left: rect.left - containerRect.left - 4, // Account for container padding
                });
            }
        }
    }, [activeIndex]);

    const handleClick = (item: string, index: number) => {
        setActiveIndex(index);
        onChange(item);
    };

    return (
        <div className="p-1 bg-background-container flex items-center gap-4 relative rounded-full">
            <motion.div
                className="absolute bg-white rounded-full"
                key={activeIndex}
                initial={{
                    width: buttonDimensions.width,
                    height: buttonDimensions.height,
                    x: buttonDimensions.left,
                    scaleX: 1.2,
                    scaleY: 0.8,
                }}
                animate={{
                    width: buttonDimensions.width,
                    height: buttonDimensions.height,
                    x: buttonDimensions.left,
                    scaleX: 1,
                    scaleY: 1,
                }}
                transition={{
                    width: {
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                    },
                    height: {
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                    },
                    x: {
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                    },
                    scaleX: {
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                    },
                    scaleY: {
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                    },
                }}
                style={{
                    zIndex: 1,
                    transformOrigin: "center",
                }}
            />

            {items.map((item, index) => (
                <Button
                    key={item}
                    ref={(el) => {
                        buttonsRef.current[index] = el;
                    }}
                    variant="ghost"
                    size="md"
                    onClick={() => handleClick(item, index)}
                    data-active={index === activeIndex}
                    className={`relative z-10 hover:bg-transparent ${index === activeIndex ? "text-black" : "text-[#6A81B0]"}`}
                >
                    {item}
                </Button>
            ))}
        </div>
    );
}
