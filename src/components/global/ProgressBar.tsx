"use client";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "@/styles/nprogress-custom.css";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

NProgress.configure({ showSpinner: false });

export default function ProgressBar() {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();

    // Small delay to simulate real loading and show effect
    const timeout = setTimeout(() => {
      NProgress.done();
    }, 800);

    return () => {
      clearTimeout(timeout);
    };
  }, [pathname]);

  return null;
}