import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const button = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold uppercase tracking-wide transition duration-300 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: "btn-gradient text-ivory shadow-soft hover:brightness-110",
        gold: "bg-gold text-chocolate-deep normal-case tracking-normal hover:brightness-105",
        light: "bg-white text-ink hover:bg-ivory",
        outline: "border border-bronze text-chocolate hover:bg-champagne/40",
        ghost: "text-chocolate hover:bg-champagne/40",
      },
      size: { sm: "h-9 px-5 text-xs", md: "h-12 px-7 text-sm", lg: "h-14 px-9 text-sm" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type Common = VariantProps<typeof button> & { className?: string; children: React.ReactNode };
type AsLink = Common & { href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">;
type AsButton = Common & { href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: AsLink | AsButton) {
  const { variant, size, className, children, ...rest } = props;
  const cls = cn(button({ variant, size }), className);
  if ("href" in rest && rest.href !== undefined) {
    return <Link {...(rest as Omit<AsLink, keyof Common>)} className={cls}>{children}</Link>;
  }
  return <button {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)} className={cls}>{children}</button>;
}
