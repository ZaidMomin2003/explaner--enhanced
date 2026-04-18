"use client";

import { LandingPageInput } from "@/components/LandingPageInput";
import { PageLayout } from "@/components/PageLayout";
import type { ModelId } from "@/types/generation";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PlanPage: NextPage = () => {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleNavigate = (
    prompt: string,
    model: ModelId,
    attachedImages?: string[],
  ) => {
    setIsNavigating(true);
    if (attachedImages && attachedImages.length > 0) {
      sessionStorage.setItem(
        "initialAttachedImages",
        JSON.stringify(attachedImages),
      );
    } else {
      sessionStorage.removeItem("initialAttachedImages");
    }
    const params = new URLSearchParams({ prompt, model });
    router.push(`/generate?${params.toString()}`);
  };

  return (
    <PageLayout showLogoAsLink>
      <LandingPageInput
        onNavigate={handleNavigate}
        isNavigating={isNavigating}
        showCodeExamplesLink
      />
      <div className="flex justify-center mt-6 mb-8">
        <Link
          href="/explainer"
          className="text-primary hover:text-primary-hover text-sm font-medium transition-colors flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/20 hover:border-primary/40"
        >
          🎬 Create SaaS Explainer Video
        </Link>
      </div>
    </PageLayout>
  );
};

export default PlanPage;
