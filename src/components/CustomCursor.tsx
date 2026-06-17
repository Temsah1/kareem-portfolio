"use client";

import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  useEffect(() => {
    const cursor = document.querySelector(".custom-cursor") as HTMLElement;
    if (!cursor) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove);

    const updateCursor = () => {
      const ease = 0.15;
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;

      cursor.style.left = `${currentX}px`;
      cursor.style.top = `${currentY}px`;

      requestAnimationFrame(updateCursor);
    };

    requestAnimationFrame(updateCursor);

    // Magnetic interaction triggers
    const links = document.querySelectorAll("a, button, [role='button'], input, textarea");
    
    const onMouseEnter = () => {
      cursor.style.width = "40px";
      cursor.style.height = "40px";
      cursor.style.backgroundColor = "rgba(110, 231, 249, 0.1)";
      cursor.style.borderColor = "rgba(110, 231, 249, 1)";
    };

    const onMouseLeave = () => {
      cursor.style.width = "20px";
      cursor.style.height = "20px";
      cursor.style.backgroundColor = "transparent";
      cursor.style.borderColor = "rgba(110, 231, 249, 0.8)";
    };

    links.forEach((link) => {
      link.addEventListener("mouseenter", onMouseEnter);
      link.addEventListener("mouseleave", onMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      links.forEach((link) => {
        link.removeEventListener("mouseenter", onMouseEnter);
        link.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, []);

  return <div className="custom-cursor" />;
}
