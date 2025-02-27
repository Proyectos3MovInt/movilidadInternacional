import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import React from "react";

export default function Boton({ text }) {
    return (
        <Button className="bg-[#0065ef] hover:bg-[#0065ef]/90 text-white rounded-[23px] w-[13.875rem] h-[2.688rem] font-h4 text-[length:var(--h4-font-size)] tracking-[var(--h4-letter-spacing)] leading-[var(--h4-line-height)] [font-style:var(--h4-font-style)]">
                <Label className="font-h4 font-[number:var(--h4-font-weight)] text-white text-[length:var(--h4-font-size)] tracking-[var(--h4-letter-spacing)] leading-[var(--h4-line-height)] whitespace-nowrap [font-style:var(--h4-font-style)]">
                    {text}
                </Label>
        </Button>
    );
}
