"use client";

import { buildWaLinkHero, buildTelLink } from "@/lib/conversion";
import MobileStickyBar from "@/components/sections/MobileStickyBar";

export default function MobileStickyBarGlobal() {
  return <MobileStickyBar waLink={buildWaLinkHero()} telLink={buildTelLink()} />;
}
