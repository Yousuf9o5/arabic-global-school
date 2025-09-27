"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Button } from "./button";

interface FilterButtonsProps {
    items: Array<{ label: string; value: string }>;
    onChange: (value: string) => void;
    defaultValue?: string;
}

export function FilterButtons({ items, onChange, defaultValue }: FilterButtonsProps) {
    const initialIndex = (() => {
        if (!defaultValue) return 0;
        const i = items.findIndex((item) => item.value === defaultValue);
        return i >= 0 ? i : 0;
    })();
    const [activeIndex, setActiveIndex] = useState(initialIndex);
    const [buttonDimensions, setButtonDimensions] = useState({ width: 0, height: 0, left: 0, top: 0 });
    const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement | null>(null);

    // Measure the active button using offset values for accurate positioning within the container
    const measureActive = () => {
        const btn = buttonsRef.current[activeIndex];
        const container = containerRef.current;
        if (!btn || !container) return;

        // offsetLeft is relative to the offsetParent's padding edge. Since our container is relative,
        // and the background is absolutely positioned inside it, offsetLeft matches the needed left.
        const left = btn.offsetLeft;
        const top = btn.offsetTop;
        const width = btn.offsetWidth;
        const height = btn.offsetHeight;

        setButtonDimensions({ width, height, left, top });
    };

    useEffect(() => {
        measureActive();
        // Recalculate on resize for responsive correctness
        const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => measureActive()) : null;
        if (ro && containerRef.current) ro.observe(containerRef.current);

        const onResize = () => measureActive();
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
            if (ro && containerRef.current) ro.unobserve(containerRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeIndex, items.join("|")]);

    const handleClick = (item: { label: string; value: string }, index: number) => {
        setActiveIndex(index);
        onChange(item.value);
    };

    return (
        <div ref={containerRef} className="p-1 bg-background-container flex items-center gap-4 relative rounded-full">
            <motion.div
                className="absolute left-0 top-0 bg-white rounded-full pointer-events-none"
                key={activeIndex}
                initial={{
                    width: buttonDimensions.width,
                    height: buttonDimensions.height,
                    x: buttonDimensions.left,
                    y: buttonDimensions.top,
                    scaleX: 1.2,
                    scaleY: 0.8,
                }}
                animate={{
                    width: buttonDimensions.width,
                    height: buttonDimensions.height,
                    x: buttonDimensions.left,
                    y: buttonDimensions.top,
                    scaleX: 1,
                    scaleY: 1,
                }}
                transition={{
                    width: { type: "spring", stiffness: 360, damping: 30 },
                    height: { type: "spring", stiffness: 360, damping: 30 },
                    x: { type: "spring", stiffness: 260, damping: 30 },
                    scaleX: {
                        type: "spring",
                        stiffness: 240,
                        damping: 24,
                    },
                    scaleY: {
                        type: "spring",
                        stiffness: 240,
                        damping: 24,
                    },
                }}
                style={{
                    zIndex: 1,
                    transformOrigin: "center",
                    willChange: "transform, width, height",
                }}
            />

            {items.map((item, index) => (
                <Button
                    key={item.value}
                    ref={(el) => {
                        buttonsRef.current[index] = el;
                    }}
                    variant="ghost"
                    size="md"
                    onClick={() => handleClick(item, index)}
                    data-active={index === activeIndex}
                    className={`relative z-10 hover:bg-transparent ${index === activeIndex ? "text-black" : "text-[#6A81B0]"}`}
                >
                    {item.label}
                </Button>
            ))}
        </div>
    );
}
